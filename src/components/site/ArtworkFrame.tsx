import Image from "next/image";
import Link from "next/link";
import { cn } from "@hart/lib/utils";

export type ShowcaseDrawing = {
  _id: string;
  title: string;
  thumbnailUrl: string;
  fileUrl: string;
};

type ArtworkFrameProps = {
  drawing?: ShowcaseDrawing | null;
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  showTitle?: boolean;
};

const ArtworkFrame = ({
  drawing,
  href,
  className,
  imageClassName = "aspect-[4/5]",
  priority = false,
  showTitle = true,
}: ArtworkFrameProps) => {
  const destination =
    href ?? (drawing ? `/gallery?drawing=${drawing._id}` : "/gallery");
  const src = drawing?.fileUrl || drawing?.thumbnailUrl;

  return (
    <div className={className}>
      <Link
        href={destination}
        className="h-frame h-frame-hover group block p-3 md:p-4"
        aria-label={
          drawing ? `View ${drawing.title} in the gallery` : "Explore the gallery"
        }
      >
        <div className={cn("relative overflow-hidden bg-hart-peach/40", imageClassName)}>
          {src ? (
            <Image
              src={src}
              alt={drawing?.title ?? "Artwork"}
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
              priority={priority}
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-6 text-center">
              <p className="text-sm leading-relaxed opacity-60">
                A piece will hang here soon.
              </p>
            </div>
          )}
        </div>
      </Link>
      {showTitle && (
        <p className="mt-3 text-center text-sm opacity-70">
          {drawing?.title ?? "From the studio"}
        </p>
      )}
    </div>
  );
};

export default ArtworkFrame;
