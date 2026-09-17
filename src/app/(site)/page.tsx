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
      <section className="h-container pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center lg:max-w-3xl">
          <div className="h-reveal w-full max-w-md md:max-w-xl lg:max-w-2xl">
            <ArtworkFrame drawing={heroDrawing} priority hero showTitle={false} />
          </div>

          <h1 className="h-reveal mt-10 max-w-xl text-3xl leading-snug md:mt-12 md:text-4xl">
            Gentle animal portraits, made to live with.
          </h1>
          <Link
            href="/gallery"
            className="btn btn-primary h-reveal mt-7"
            style={{ ["--reveal-delay" as never]: "80ms" }}
          >
            Explore the gallery
          </Link>
        </div>
      </section>

      {featuredDrawings.length > 0 && (
        <section className="h-container pb-16 pt-2 md:pb-24">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
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

      <section className="h-container pb-24 pt-4 md:pb-32">
        <div className="mx-auto flex max-w-2xl flex-col gap-8 md:gap-10">
          <article className="h-invite h-reveal">
            <h2 className="text-2xl md:text-3xl">About Hilda</h2>
            <p className="mt-6 text-base leading-8 opacity-80 md:text-lg">
              Hilda is from Bandung, Indonesia. She’s been painting since she was
              little, starting with doodles in the margins of her notebooks. She
              paints animals because she loves them, their honesty, and the quiet
              way they show up in a room. These days she works slowly, layer by
              layer, so each piece feels calm enough to hang somewhere you
              actually spend time.
            </p>
          </article>

          <article className="h-invite h-reveal">
            <h2 className="text-2xl md:text-3xl">Commissions</h2>
            <ol className="mt-6 list-decimal space-y-4 pl-5 text-base leading-relaxed opacity-80 md:text-lg">
              <li>
                Tell her who or what the piece is for, and the mood you want.
              </li>
              <li>
                You’ll get a rough direction and colours to check before she
                paints.
              </li>
              <li>
                She finishes it carefully, then gets it ready to come home to you.
              </li>
            </ol>
            <Link href="/contact" className="btn btn-primary mt-8">
              Start a commission
            </Link>
          </article>

          <article className="h-invite h-reveal px-8 py-12 text-center md:px-12 md:py-14">
            <p className="mx-auto max-w-xl text-base leading-relaxed md:text-lg">
              Take a quiet look through the gallery. Something might already feel
              like yours.
            </p>
            <Link
              href="/gallery"
              className="mt-6 inline-block text-sm underline decoration-hart-rose/80 underline-offset-8 hover:opacity-80"
            >
              Explore the gallery
            </Link>
          </article>
        </div>
      </section>
    </>
  );
};

export default Home;
