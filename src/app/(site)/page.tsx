import Link from "next/link";
import { connectToDatabase } from "@hart/server/db/mongodb";
import { Drawing } from "@hart/server/models";
import { getPresignedUrl } from "@hart/server/upload";
import ArtworkFrame, {
  type ShowcaseDrawing,
} from "@hart/components/site/ArtworkFrame";

export const dynamic = "force-dynamic";

const getShowcaseDrawings = async (): Promise<ShowcaseDrawing[]> => {
  try {
    await connectToDatabase();

    const latestDrawings = await Drawing.find({})
      .sort({ createdAt: -1 })
      .limit(7)
      .lean();

    return Promise.all(
      latestDrawings.map(async (drawing) => ({
        _id: drawing._id.toString(),
        title: drawing.title,
        thumbnailUrl: await getPresignedUrl(drawing.thumbnailName),
        fileUrl: await getPresignedUrl(drawing.fileName),
      }))
    );
  } catch {
    return [];
  }
};

const Home = async () => {
  const showcaseDrawings = await getShowcaseDrawings();
  const heroDrawing = showcaseDrawings[0] ?? null;
  const featuredDrawings = showcaseDrawings.slice(1, 7);

  return (
    <>
      <section className="h-container py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="h-reveal max-w-md lg:max-w-none">
            <ArtworkFrame drawing={heroDrawing} priority />
          </div>

          <div className="flex flex-col items-start gap-7 h-reveal lg:ps-4">
            <h1 className="text-3xl leading-snug md:text-4xl">
              Paintings that feel like a warm hello.
            </h1>
            <Link href="/gallery" className="btn btn-primary">
              Explore the gallery
            </Link>
          </div>
        </div>
      </section>

      {featuredDrawings.length > 0 && (
        <section className="h-container pb-20 pt-4 md:pb-28">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDrawings.map((drawing, index) => (
              <div
                key={drawing._id}
                className="h-reveal"
                style={{ ["--reveal-delay" as never]: `${index * 70}ms` }}
              >
                <ArtworkFrame drawing={drawing} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="h-container py-16 md:py-24">
        <div className="h-reveal mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl">About Hilda</h2>
          <p className="mt-6 text-base leading-8 opacity-80 md:text-lg">
            Hilda paints animals the way she sees them — honest, soft, and full
            of feeling. She started as a kid doodling in the margins of
            notebooks, and painting became the place she could say what words
            couldn&apos;t. These days she works slowly, layer by layer, so each
            piece feels calm enough to hang somewhere you actually spend time.
          </p>
        </div>
      </section>

      <section className="h-container py-16 md:py-24">
        <div className="h-reveal mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl">Commissions</h2>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-base leading-relaxed opacity-80 md:text-lg">
            <li>
              Tell her who or what the piece is for, and the mood you want.
            </li>
            <li>
              You&apos;ll get a rough direction and colours to check before she
              paints.
            </li>
            <li>
              She finishes it carefully, then gets it ready to come home to you.
            </li>
          </ol>
          <Link href="/contact" className="btn btn-primary mt-8">
            Start a commission
          </Link>
        </div>
      </section>

      <section className="mt-8 border-y border-base-300 bg-hart-peach/50">
        <div className="h-container py-14 text-center md:py-16">
          <p className="h-reveal mx-auto max-w-xl text-base leading-relaxed md:text-lg">
            Take a quiet look through the gallery — something might already feel
            like yours.
          </p>
          <Link
            href="/gallery"
            className="h-reveal mt-5 inline-block text-sm underline decoration-hart-rose/80 underline-offset-8 hover:opacity-80"
            style={{ ["--reveal-delay" as never]: "80ms" }}
          >
            Explore the gallery
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
