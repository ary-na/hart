import Image from "next/image";
import Link from "next/link";
import type { ShowcaseDrawing } from "@hart/components/site/ArtworkFrame";
import { paintingAlt } from "@hart/lib/utils";

type HomeHeroProps = {
  drawing?: ShowcaseDrawing | null;
};

const HomeHero = ({ drawing }: HomeHeroProps) => {
  const src = drawing?.fileUrl || drawing?.thumbnailUrl;

  return (
    <section className="h-hero">
      {src ? (
        <Image
          src={src}
          alt={paintingAlt(drawing?.title)}
          width={2400}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover"
          priority
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-[#faf8f5]" />
      )}

      <div className="h-hero-veil" aria-hidden />

      <div className="h-hero-copy">
        <h1 className="max-w-xl text-3xl leading-snug text-[#3d342c] md:text-5xl">
          Gentle animal portraits, made to live with.
        </h1>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/gallery" className="btn btn-primary rounded-full px-6">
            Explore the gallery
          </Link>
          <Link
            href="/contact"
            className="btn btn-ghost rounded-full px-6 text-[#3d342c]"
          >
            Start a commission
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
