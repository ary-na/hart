import Link from "next/link";
import { connectToDatabase } from "@hart/server/db/mongodb";
import { Drawing } from "@hart/server/models";
import { getPresignedUrl } from "@hart/server/upload";
import { type ShowcaseDrawing } from "@hart/components/site/ArtworkFrame";
import HomeGalleryWall from "@hart/components/site/HomeGalleryWall";
import HomeHero from "@hart/components/site/HomeHero";

export const dynamic = "force-dynamic";

const INSTAGRAM_HREF =
  "https://www.instagram.com/hart_hilda_art?igsh=ZWt6ajFkaHVtaW45&utm_source=qr";
const TIKTOK_HREF =
  "https://www.tiktok.com/@hildaokara_art?_r=1&_t=ZS-929hPONm9g7";

const commissionSteps = [
  {
    n: "01",
    title: "Share the animal",
    body: "Tell me who they are, and the mood you want in the piece.",
  },
  {
    n: "02",
    title: "Shape it together",
    body: "You’ll get a rough direction and colours to check before I paint.",
  },
  {
    n: "03",
    title: "Made for your wall",
    body: "I finish it carefully, then get it ready to come home to you.",
  },
];

const getHomeShowcase = async (): Promise<{
  drawings: ShowcaseDrawing[];
}> => {
  try {
    await connectToDatabase();

    const latestDrawings = await Drawing.find({})
      .sort({ createdAt: -1, _id: -1 })
      .limit(48)
      .lean();

    const drawings = await Promise.all(
      latestDrawings.map(async (drawing) => ({
        _id: drawing._id.toString(),
        title: drawing.title,
        createdAt: drawing.createdAt
          ? new Date(drawing.createdAt).toISOString()
          : undefined,
        thumbnailUrl: await getPresignedUrl(drawing.thumbnailName),
        fileUrl: await getPresignedUrl(drawing.fileName),
      }))
    );

    return { drawings };
  } catch {
    return { drawings: [] };
  }
};

const Home = async () => {
  const { drawings } = await getHomeShowcase();
  const heroDrawing = drawings[0] ?? null;
  const wallDrawings = drawings.slice(1);

  return (
    <>
      <HomeHero drawing={heroDrawing} />

      <HomeGalleryWall drawings={wallDrawings} />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <article className="h-reveal max-w-xl">
            <h2 className="h-heading-rose text-2xl md:text-3xl">About me</h2>
            <p className="mt-6 text-base leading-8 opacity-80 md:text-lg">
              I’m Hilda. I’m from Bandung, Indonesia, and my studio is in
              Melbourne, Australia. I’ve been painting since I was little,
              starting with tiny animals in the margins of my notebooks.
              Painting was my safe place when things felt hard. A way to say
              what I couldn’t put into words.
            </p>
            <p className="mt-6 text-base leading-8 opacity-80 md:text-lg">
              I only paint animals. I love their honesty, and the quiet way they
              sit with you in a room. I work slowly, layer by layer, until a
              piece feels calm enough to hang somewhere you actually spend time.
            </p>
          </article>
          <aside
            className="h-studio-card flex h-full min-h-[18rem] flex-col justify-center h-reveal"
            style={{ ["--reveal-delay" as never]: "90ms" }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#e8a4a8]">
              Studio
            </p>
            <ul className="mt-8 list-none space-y-5 pl-0 text-base leading-relaxed md:text-lg">
              <li>From Bandung, Indonesia</li>
              <li>Studio in Melbourne, Australia</li>
              <li>Animals only</li>
              <li>Painted slow, layer by layer</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-[#fbf6ef]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
          <div className="h-reveal max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#e8a4a8]">
              Commissions
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl">
              I’d love to paint your animal.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {commissionSteps.map((step, index) => (
              <article
                key={step.n}
                className="h-step-plaque h-reveal"
                style={{ ["--reveal-delay" as never]: `${index * 70}ms` }}
              >
                <p className="text-sm tracking-[0.2em] text-[#e8a4a8]">{step.n}</p>
                <h3 className="mt-3 text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-75 md:text-base">
                  {step.body}
                </p>
              </article>
            ))}
          </div>

          <div className="h-reveal mt-10">
            <p className="text-xs uppercase tracking-[0.35em] opacity-50">
              What you’ll send
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="h-send-pill">Clear photo</span>
              <span className="h-send-pill">Name</span>
              <span className="h-send-pill">Mood</span>
            </div>
            <Link href="/contact" className="btn btn-primary mt-8 rounded-full px-6">
              Start a commission
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#faf8f5]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
          <div className="h-reveal max-w-2xl">
            <h2 className="text-2xl md:text-3xl">Stay close to the work.</h2>
            <p className="mt-5 text-base leading-8 opacity-80 md:text-lg">
              I share works in progress, new pieces, and quiet studio moments on
              Instagram and TikTok.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <a
              href={INSTAGRAM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="h-social-card h-reveal"
            >
              <p className="text-xs uppercase tracking-[0.35em] opacity-45">
                Follow the studio
              </p>
              <p className="text-2xl">Instagram</p>
            </a>
            <a
              href={TIKTOK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="h-social-card h-reveal"
              style={{ ["--reveal-delay" as never]: "80ms" }}
            >
              <p className="text-xs uppercase tracking-[0.35em] opacity-45">
                Follow the studio
              </p>
              <p className="text-2xl">TikTok</p>
            </a>
          </div>
        </div>
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
