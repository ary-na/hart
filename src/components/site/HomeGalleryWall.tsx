"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ShowcaseDrawing } from "@hart/components/site/ArtworkFrame";
import { paintingAlt, sortNewestFirst, withPublicArtworkImage } from "@hart/lib/utils";

type HomeGalleryWallProps = {
  drawings: ShowcaseDrawing[];
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HomeGalleryWall = ({ drawings }: HomeGalleryWallProps) => {
  const visible = sortNewestFirst(withPublicArtworkImage(drawings));
  const headingId = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const next = Math.min(Math.max(index, 0), visible.length - 1);
      const track = trackRef.current;
      const slide = slideRefs.current[next];
      if (!track || !slide) return;

      const trackRect = track.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const delta =
        slideRect.left +
        slideRect.width / 2 -
        (trackRect.left + trackRect.width / 2);

      track.scrollBy({
        left: delta,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      setActiveIndex(next);
    },
    [visible.length]
  );

  const syncActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width / 2;
    let closest = 0;
    let minDist = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const rect = slide.getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - centerX);
      if (dist < minDist) {
        minDist = dist;
        closest = index;
      }
    });

    setActiveIndex((current) => (current === closest ? current : closest));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActiveFromScroll);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", syncActiveFromScroll);
    window.addEventListener("resize", syncActiveFromScroll);

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", syncActiveFromScroll);
      window.removeEventListener("resize", syncActiveFromScroll);
    };
  }, [syncActiveFromScroll, visible.length]);

  if (visible.length === 0) return null;

  const canShowDots = visible.length > 1 && visible.length <= 14;
  const atStart = activeIndex <= 0;
  const atEnd = activeIndex >= visible.length - 1;

  return (
    <section
      className="h-carousel-section"
      aria-labelledby={headingId}
      aria-roledescription="carousel"
    >
      <h2 id={headingId} className="sr-only">
        Gallery
      </h2>

      <div className="h-carousel">
        {visible.length > 1 && (
          <button
            type="button"
            className="h-carousel-nav h-carousel-nav-prev"
            aria-label="Previous painting"
            disabled={atStart}
            onClick={() => scrollToIndex(activeIndex - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}

        <div className="h-carousel-window">
          <ul
            ref={trackRef}
            className="h-carousel-track"
            tabIndex={0}
            aria-label="Paintings"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" && !atStart) {
                event.preventDefault();
                scrollToIndex(activeIndex - 1);
              }
              if (event.key === "ArrowRight" && !atEnd) {
                event.preventDefault();
                scrollToIndex(activeIndex + 1);
              }
              if (event.key === "Home") {
                event.preventDefault();
                scrollToIndex(0);
              }
              if (event.key === "End") {
                event.preventDefault();
                scrollToIndex(visible.length - 1);
              }
            }}
          >
            {visible.map((drawing, index) => {
              const isActive = index === activeIndex;
              const src = drawing.fileUrl || drawing.thumbnailUrl;

              return (
                <li
                  key={drawing._id}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  className={
                    isActive ? "h-carousel-slide is-active" : "h-carousel-slide"
                  }
                  aria-roledescription="slide"
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`${index + 1} of ${visible.length}`}
                >
                  <figure className="h-carousel-figure">
                    {isActive ? (
                      <Link
                        href={`/gallery?drawing=${drawing._id}`}
                        className="h-carousel-art"
                        aria-label={`View ${paintingAlt(drawing.title)}`}
                      >
                        {src ? (
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) min(60vw, 720px), (min-width: 768px) 70vw, 85vw"
                            className="object-cover"
                            priority={index < 2}
                            unoptimized
                          />
                        ) : null}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="h-carousel-art"
                        aria-label={`Show ${paintingAlt(drawing.title)}`}
                        onClick={() => scrollToIndex(index)}
                      >
                        {src ? (
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) min(60vw, 720px), (min-width: 768px) 70vw, 85vw"
                            className="object-cover"
                            unoptimized
                          />
                        ) : null}
                      </button>
                    )}

                    <figcaption
                      className="h-carousel-plaque"
                      aria-hidden={!isActive}
                    >
                      <p className="h-carousel-plaque-title">{drawing.title}</p>
                      {drawing.creditLine ? (
                        <p className="h-carousel-plaque-credit">
                          {drawing.creditLine}
                        </p>
                      ) : null}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>

        {visible.length > 1 && (
          <button
            type="button"
            className="h-carousel-nav h-carousel-nav-next"
            aria-label="Next painting"
            disabled={atEnd}
            onClick={() => scrollToIndex(activeIndex + 1)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>

      {canShowDots && (
        <div className="h-carousel-dots" aria-hidden="true">
          {visible.map((drawing, index) => (
            <button
              key={drawing._id}
              type="button"
              tabIndex={-1}
              aria-label={`Go to ${drawing.title}`}
              className={
                index === activeIndex
                  ? "h-carousel-dot is-active"
                  : "h-carousel-dot"
              }
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HomeGalleryWall;
