"use client";

import { useMemo, useState } from "react";
import ArtworkFrame, {
  type ShowcaseDrawing,
} from "@hart/components/site/ArtworkFrame";
import { cn } from "@hart/lib/utils";

const wallAspect = (index: number) => {
  if (index === 0) return "aspect-[4/5]";
  if (index === 5 || index === 6) return "aspect-[5/6]";
  if (index === 8) return "aspect-[4/5]";
  return "aspect-[3/4]";
};

type HomeGalleryWallProps = {
  drawings: ShowcaseDrawing[];
  tags: string[];
};

const HomeGalleryWall = ({ drawings, tags }: HomeGalleryWallProps) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const visible = useMemo(() => {
    const filtered = activeTag
      ? drawings.filter((drawing) => drawing.tags?.includes(activeTag))
      : drawings;
    return filtered.slice(0, 9);
  }, [activeTag, drawings]);

  if (drawings.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 md:pb-28 md:pt-16">
      {tags.length > 0 && (
        <div className="h-reveal mb-10 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center">
          <button
            type="button"
            className={cn("h-series-pill", !activeTag && "is-active")}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              type="button"
              key={tag}
              className={cn("h-series-pill", activeTag === tag && "is-active")}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="py-16 text-center text-sm opacity-60">
          No animal portraits in this series yet.
        </p>
      ) : (
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
                imageClassName={wallAspect(index)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HomeGalleryWall;
