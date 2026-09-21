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

const scrollSlideToCentre = (
  scroller: HTMLElement,
  slide: HTMLElement,
  behavior: ScrollBehavior
) => {
  const scrollerRect = scroller.getBoundingClientRect();
  const slideRect = slide.getBoundingClientRect();
  const side = (scroller.clientWidth - slideRect.width) / 2;
  const left =
    scroller.scrollLeft + (slideRect.left - scrollerRect.left) - side;

  scroller.scrollTo({ left, behavior });
};

const closestSlideIndex = (scroller: HTMLElement, slides: (HTMLElement | null)[]) => {
  const scrollerRect = scroller.getBoundingClientRect();
  const centerX = scrollerRect.left + scrollerRect.width / 2;
  let closest = 0;
  let minDist = Number.POSITIVE_INFINITY;

  slides.forEach((slide, index) => {
    if (!slide) return;
    const rect = slide.getBoundingClientRect();
    const dist = Math.abs(rect.left + rect.width / 2 - centerX);
    if (dist < minDist) {
      minDist = dist;
      closest = index;
    }
  });

  return closest;
};

const HomeGalleryWall = ({ drawings }: HomeGalleryWallProps) => {
  const visible = sortNewestFirst(withPublicArtworkImage(drawings));
  const headingId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const programmaticUntilRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const next = Math.min(Math.max(index, 0), visible.length - 1);
      const scroller = scrollerRef.current;
      const slide = slideRefs.current[next];
      if (!scroller || !slide) return;

      const reduced = prefersReducedMotion();
      programmaticUntilRef.current = performance.now() + (reduced ? 0 : 480);
      scrollSlideToCentre(scroller, slide, reduced ? "auto" : "smooth");
      setActiveIndex(next);
    },
    [visible.length]
  );

  const syncActiveFromScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const closest = closestSlideIndex(scroller, slideRefs.current);
    setActiveIndex((current) => (current === closest ? current : closest));
    return closest;
  }, []);

  const settleOnCentre = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const closest = syncActiveFromScroll();
    if (closest === undefined) return;
    if (performance.now() < programmaticUntilRef.current) return;

    const slide = slideRefs.current[closest];
    if (!slide) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const offset =
      slideRect.left +
      slideRect.width / 2 -
      (scrollerRect.left + scrollerRect.width / 2);

    if (Math.abs(offset) > 1) {
      scrollSlideToCentre(scroller, slide, "auto");
    }
  }, [syncActiveFromScroll]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    let settleTimer = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActiveFromScroll);
      window.clearTimeout(settleTimer);
      const wait = Math.max(
        120,
        programmaticUntilRef.current - performance.now() + 16
      );
      settleTimer = window.setTimeout(settleOnCentre, wait);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("scrollend", settleOnCentre);
    window.addEventListener("resize", settleOnCentre);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("scrollend", settleOnCentre);
      window.removeEventListener("resize", settleOnCentre);
    };
  }, [settleOnCentre, syncActiveFromScroll, visible.length]);

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

        <div
          ref={scrollerRef}
          className="h-carousel-window"
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
          <ul className="h-carousel-track">
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
