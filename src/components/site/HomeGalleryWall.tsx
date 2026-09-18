"use client";

import ArtworkFrame, {
  type ShowcaseDrawing,
} from "@hart/components/site/ArtworkFrame";

const wallAspect = (index: number) => {
  if (index === 0) return "aspect-[4/5]";
  if (index === 5 || index === 6) return "aspect-[5/6]";
  if (index === 8) return "aspect-[4/5]";
  return "aspect-[3/4]";
};

type HomeGalleryWallProps = {
  drawings: ShowcaseDrawing[];
};

const HomeGalleryWall = ({ drawings }: HomeGalleryWallProps) => {
  const visible = drawings.slice(0, 9);

  if (visible.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 md:pb-28 md:pt-16">
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
    </section>
  );
};

export default HomeGalleryWall;
