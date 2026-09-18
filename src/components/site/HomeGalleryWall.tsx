"use client";

import ArtworkFrame, {
  type ShowcaseDrawing,
} from "@hart/components/site/ArtworkFrame";
import { sortNewestFirst } from "@hart/lib/utils";

type HomeGalleryWallProps = {
  drawings: ShowcaseDrawing[];
};

const HomeGalleryWall = ({ drawings }: HomeGalleryWallProps) => {
  const visible = sortNewestFirst(drawings);

  if (visible.length === 0) return null;

  return (
    <section
      className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 md:pb-28 md:pt-16"
      aria-labelledby="home-gallery-heading"
    >
      <h2 id="home-gallery-heading" className="sr-only">
        Gallery
      </h2>
      <div className="h-wall">
        {visible.map((drawing, index) => (
          <div
            key={drawing._id}
            className="h-wall-item h-reveal"
            style={{ ["--reveal-delay" as never]: `${index * 60}ms` }}
          >
            <ArtworkFrame
              drawing={drawing}
              whisper
              imageClassName="size-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeGalleryWall;
