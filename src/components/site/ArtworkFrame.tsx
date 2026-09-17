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
  hero?: boolean;
};

const ArtworkFrame = ({
  drawing,
  href,
  className,
  imageClassName = "aspect-[4/5]",
  priority = false,
  showTitle = true,
  hero = false,
}: ArtworkFrameProps) => {
  const destination =
    href ?? (drawing ? `/gallery?drawing=${drawing._id}` : "/gallery");
  const src = drawing?.fileUrl || drawing?.thumbnailUrl;

  return (
    <div className={className}>
      <Link
        href={destination}
        className={cn("h-frame h-frame-hover group block", hero && "h-frame-hero")}
        aria-label={
          drawing
            ? `View ${drawing.title} in the gallery`
            : "Explore animal portraits in the gallery"
        }
      >
        <div
          className={cn(
            "h-frame-face relative overflow-hidden",
            imageClassName
          )}
        >
          {src ? (
            <Image
              src={src}
              alt={drawing?.title ?? "Animal portrait"}
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
              priority={priority}
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-6 text-center">
              <p className="text-sm leading-relaxed opacity-60">
                An animal portrait will hang here soon.
              </p>
            </div>
          )}
        </div>
      </Link>
      {showTitle && (
        <p className="mt-4 text-center text-sm opacity-70">
          {drawing?.title ?? "Animal portrait"}
        </p>
      )}
    </div>
  );
};

export default ArtworkFrame;
