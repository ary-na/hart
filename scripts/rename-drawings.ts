/**
 * One-time (idempotent) artwork title + description updates.
 *
 * Usage:
 *   npx tsx scripts/rename-drawings.ts
 *   npm run rename-drawings
 *
 * Loads MONGODB_URI from .env.local or .env.
 * Matches by current title first, then the new title so reruns are safe.
 */
import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";
import mongoose, { Schema } from "mongoose";

loadEnv({ path: resolve(process.cwd(), ".env.local") });
loadEnv({ path: resolve(process.cwd(), ".env") });

type RenameSpec = {
  oldTitles: string[];
  newTitle: string;
  description: string;
  creditLine?: string;
};

const RENAMES: RenameSpec[] = [
  {
    oldTitles: ["Garden Guardian"],
    newTitle: "Among the Blooms",
    description:
      "A German Shepherd in a summer garden, yellow flowers all around. I wanted him to feel calm and proud, like he’s watching over the place.",
  },
  {
    oldTitles: ["Pure Joy"],
    newTitle: "That Happy Face",
    description:
      "A fluffy white dog with a big open smile on a deep blue ground. Soft fur, bright eyes, the kind of face that makes a room feel lighter.",
  },
  {
    oldTitles: ["Summer Sip"],
    newTitle: "Duckling and Strawberries",
    description:
      "A little yellow duckling peeking at a glass of strawberry water in the garden. Warm day energy, curious and sweet.",
  },
  {
    oldTitles: ["Golden Ambition"],
    newTitle: "Cub in the Grass",
    description:
      "A young lion resting in soft green and earth. Quiet eyes, soft fur. Made to feel gentle, not fierce.",
  },
  {
    oldTitles: [
      "The Abysswalker and the Great Grey Wolf",
      "The Abysswalker",
    ],
    newTitle: "Knight and Grey Wolf",
    creditLine: "Inspired by Nikolay Zharov’s photography",
    description:
      "A knight in worn armour beside his great grey wolf. Moody and close, about loyalty more than battle.",
  },
  {
    oldTitles: ["The Watcher"],
    newTitle: "Quiet Cheetah",
    description:
      "A cheetah in profile on a soft linen ground. Focused, graceful, and still. I painted the markings slow so they feel real up close.",
  },
  {
    oldTitles: ["The Hoarder"],
    newTitle: "This One’s Mine",
    description:
      "A black cat with bright green eyes, guarding a roll of toilet paper like treasure. A little cheeky, very cat.",
  },
];

const DrawingSchema = new Schema(
  {
    title: String,
    description: String,
    creditLine: String,
  },
  { timestamps: true, strict: false }
);

const getDrawingModel = () =>
  mongoose.models.Drawing || mongoose.model("Drawing", DrawingSchema);

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const findDrawing = async (spec: RenameSpec) => {
  const Drawing = getDrawingModel();
  const titles = [...spec.oldTitles, spec.newTitle];

  for (const title of titles) {
    const exact = await Drawing.findOne({
      title: new RegExp(`^${escapeRegex(title)}$`, "i"),
    });
    if (exact) return exact;
  }

  const drawings = await Drawing.find({}).select("title").lean();
  const wanted = titles.map(normalize);

  const close = drawings.find((drawing) => {
    const current = normalize(String(drawing.title ?? ""));
    return wanted.some(
      (title) =>
        current === title ||
        current.includes(title) ||
        title.includes(current)
    );
  });

  if (!close) return null;
  return Drawing.findById(close._id);
};

const run = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(
      "MONGODB_URI is missing. Add it to .env.local then run: npm run rename-drawings"
    );
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected. Updating drawings…");

  for (const spec of RENAMES) {
    const drawing = await findDrawing(spec);
    if (!drawing) {
      console.warn(`No match for "${spec.oldTitles[0]}" → "${spec.newTitle}"`);
      continue;
    }

    drawing.title = spec.newTitle;
    drawing.description = spec.description;
    if (spec.creditLine) {
      drawing.creditLine = spec.creditLine;
    } else {
      drawing.creditLine = undefined;
    }
    await drawing.save();
    console.log(`Updated "${drawing.title}"`);
  }

  await mongoose.disconnect();
  console.log("Done.");
};

run().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
