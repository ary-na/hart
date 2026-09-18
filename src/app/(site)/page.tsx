import Link from "next/link";
import { connectToDatabase } from "@hart/server/db/mongodb";
import { Drawing } from "@hart/server/models";
import { getPresignedUrl } from "@hart/server/upload";
import ArtworkFrame, {
  type ShowcaseDrawing,
} from "@hart/components/site/ArtworkFrame";
import HomeGalleryWall from "@hart/components/site/HomeGalleryWall";
import HomeHero from "@hart/components/site/HomeHero";

export const dynamic = "force-dynamic";

const getHomeShowcase = async (): Promise<{
  drawings: ShowcaseDrawing[];
  tags: string[];
}> => {
  try {
    await connectToDatabase();

    const [latestDrawings, distinctTags] = await Promise.all([
      Drawing.find({}).sort({ createdAt: -1 }).limit(10).lean(),
      Drawing.distinct("tags"),
    ]);

    const drawings = await Promise.all(
      latestDrawings.map(async (drawing) => ({
        _id: drawing._id.toString(),
        title: drawing.title,
        thumbnailUrl: await getPresignedUrl(drawing.thumbnailName),
        fileUrl: await getPresignedUrl(drawing.fileName),
        tags: drawing.tags || [],
      }))
    );

    return {
      drawings,
      tags: (distinctTags as string[]).filter(Boolean).sort(),
    };
  } catch {
    return { drawings: [], tags: [] };
  }
};

const Home = async () => {
  const { drawings, tags } = await getHomeShowcase();
  const heroDrawing = drawings[0] ?? null;
  const wallDrawings = drawings.slice(1, 10);
  const studioDrawing = heroDrawing;

  return (
    <>
      <HomeHero drawing={heroDrawing} />

      <HomeGalleryWall drawings={wallDrawings} tags={tags} />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <article className="h-reveal max-w-xl">
            <h2 className="text-2xl md:text-3xl">About me</h2>
            <p className="mt-6 text-base leading-8 opacity-80 md:text-lg">
              I’m Hilda, from Bandung, Indonesia. I’ve been painting since I was
              little, starting with tiny animals in the margins of my notebooks. I
              only paint animals, because I love them, their honesty, and the
              quiet way they show up in a room. These days I work slowly, layer by
              layer, so each piece feels calm enough to hang somewhere you
              actually spend time.
            </p>
          </article>
          {studioDrawing && (
            <div
              className="h-reveal mx-auto w-full max-w-md lg:max-w-none"
              style={{ ["--reveal-delay" as never]: "90ms" }}
            >
              <ArtworkFrame
                drawing={studioDrawing}
                imageClassName="aspect-[4/5]"
              />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-16 md:pb-24">
        <article className="h-invite h-reveal px-8 py-12 md:px-14 md:py-16">
          <h2 className="text-2xl md:text-3xl">Commissions</h2>
          <ol className="mt-8 list-decimal space-y-5 pl-5 text-base leading-relaxed opacity-80 md:text-lg">
            <li>
              Tell me which animal the piece is for, and the mood you want.
            </li>
            <li>
              You’ll get a rough direction and colours to check before I paint.
            </li>
            <li>
              I finish it carefully, then get it ready to come home to you.
            </li>
          </ol>
          <Link href="/contact" className="btn btn-primary mt-10">
            Start a commission
          </Link>
        </article>
      </section>

      <section className="px-4 py-16 text-center md:py-20">
        <p className="h-reveal mx-auto max-w-xl text-base leading-relaxed md:text-lg">
          Take a quiet look through the gallery. Something might already feel
          like yours.
        </p>
        <Link
          href="/gallery"
          className="h-reveal mt-6 inline-block text-sm underline decoration-hart-rose/80 underline-offset-8 hover:opacity-80"
          style={{ ["--reveal-delay" as never]: "80ms" }}
        >
          Explore the gallery
        </Link>
      </section>
    </>
  );
};

export default Home;
