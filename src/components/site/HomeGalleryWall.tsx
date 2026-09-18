"use client";

import ArtworkFrame, {
  type ShowcaseDrawing,
} from "@hart/components/site/ArtworkFrame";
import { cn, sortNewestFirst } from "@hart/lib/utils";

type HomeGalleryWallProps = {
  drawings: ShowcaseDrawing[];
};

const HomeGalleryWall = ({ drawings }: HomeGalleryWallProps) => {
  const visible = sortNewestFirst(drawings);

  if (visible.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="h-wall">
        {visible.map((drawing, index) => (
          <div
            key={drawing._id}
            className={cn(
              "h-wall-item h-reveal",
              index === 0 && visible.length >= 3 && "h-wall-feature"
            )}
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
