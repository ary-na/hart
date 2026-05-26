// src/components/GalleryGrid.tsx

"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@hart/lib/ui";
import { Drawing } from "@hart/lib/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { EmptyGallery } from "@hart/lib/ui";
import { useCurrentUser } from "@hart/hooks";
import { useDrawingsContext, useCartContext, useToast } from "@hart/hooks";
import DrawingDetailsModal from "./DrawingDetailsModal";
import AddDrawingModal from "@hart/components/admin/AddDrawingModal";
import { cn } from "@hart/lib/utils";

const GalleryGrid = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    drawings,
    fetchDrawings,
    loading,
    allTags,
    activeTag,
    setActiveTag,
  } = useDrawingsContext();
  const { user, isLoading, isAuthenticated } = useCurrentUser();
  const { addItem, loading: cartLoading } = useCartContext();
  const { showToast } = useToast();

  const isAdmin = user?.role === "admin";
  const [manualSelectedDrawing, setManualSelectedDrawing] = useState<Drawing | null>(null);
  const [editingDrawing, setEditingDrawing] = useState<Drawing | null>(null);
  const selectedDrawingId = searchParams.get("drawing");

  // Read the initial tag from the URL once on mount, then let hook state drive
  const initialTagRef = useRef(searchParams.get("tag"));
  useEffect(() => {
    const tag = initialTagRef.current;
    if (tag) {
      setActiveTag(tag);
    } else {
      fetchDrawings({ limit: 12 });
    }
  // fetchDrawings and setActiveTag are stable callbacks — safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedDrawing = useMemo(() => {
    if (manualSelectedDrawing) return manualSelectedDrawing;
    if (!selectedDrawingId) return null;
    return drawings.find((d) => d._id === selectedDrawingId) ?? null;
  }, [drawings, manualSelectedDrawing, selectedDrawingId]);

  const handleTagClick = (tag: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (tag) {
      next.set("tag", tag);
    } else {
      next.delete("tag");
    }
    // Preserve ?drawing= if open
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    setActiveTag(tag);
  };

  const handleCloseDrawingModal = () => {
    setManualSelectedDrawing(null);
    if (!selectedDrawingId) return;
    const next = new URLSearchParams(searchParams.toString());
    next.delete("drawing");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const showFilterBar = allTags.length > 0;

  return (
    <>
      {/* ── Tag filter bar ─────────────────────────────────── */}
      {showFilterBar && (
        <div className="mb-8 h-reveal">
          <div className="flex items-center gap-2 flex-wrap">
            {/* "All" pill */}
            <button
              type="button"
              onClick={() => handleTagClick(null)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
                activeTag === null
                  ? "border-primary bg-primary text-primary-content shadow-sm"
                  : "border-base-300 bg-base-100 opacity-65 hover:opacity-100 hover:border-base-content/30"
              )}
            >
              All
            </button>

            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-all duration-200",
                  activeTag === tag
                    ? "border-primary bg-primary text-primary-content shadow-sm"
                    : "border-base-300 bg-base-100 opacity-65 hover:opacity-100 hover:border-base-content/30"
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Active filter indicator */}
          {activeTag && (
            <p className="mt-3 text-sm opacity-50">
              Showing works tagged{" "}
              <span className="font-medium opacity-100 capitalize">
                &ldquo;{activeTag}&rdquo;
              </span>
              {" — "}
              <button
                type="button"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                onClick={() => handleTagClick(null)}
              >
                clear filter
              </button>
            </p>
          )}
        </div>
      )}

      {/* ── Loading ───────────────────────────────────────── */}
      {loading && drawings.length === 0 && (
        <Loader size="xl" message="Loading gallery..." />
      )}

      {/* ── Empty state ───────────────────────────────────── */}
      {!loading && drawings.length === 0 && (
        activeTag ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <p className="text-lg font-semibold opacity-60">
              No works found for &ldquo;{activeTag}&rdquo;
            </p>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => handleTagClick(null)}
            >
              Show all drawings
            </button>
          </div>
        ) : (
          <EmptyGallery />
        )
      )}

      {/* ── Grid ─────────────────────────────────────────── */}
      {drawings.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drawings.map((drawing, index) => (
            <div
              key={drawing._id}
              className="group h-reveal"
              style={{ ["--reveal-delay" as never]: `${(index % 6) * 60}ms` }}
            >
              <div className="relative overflow-hidden border border-stone-300 bg-[#f6f1e8] shadow-[0_18px_35px_rgba(43,33,24,0.18),0_6px_18px_rgba(43,33,24,0.1)] transition-shadow hover:shadow-[0_24px_50px_rgba(43,33,24,0.22)]">
                {/* Full-card button — opens the detail modal */}
                <button
                  onClick={() => setManualSelectedDrawing(drawing)}
                  className="absolute inset-0 z-10 text-left"
                  aria-label={`View details for ${drawing.title}`}
                />

                <figure className="relative aspect-square w-full overflow-hidden bg-base-200">
                  {drawing.thumbnailUrl ? (
                    <Image
                      src={drawing.thumbnailUrl}
                      alt={drawing.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-base-content/20">
                      No Image
                    </div>
                  )}
                  <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.24)_0px,rgba(255,255,255,0.24)_1px,transparent_1px,transparent_4px),repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_6px)]" />
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_18%,transparent_82%,rgba(0,0,0,0.1)),linear-gradient(90deg,rgba(255,255,255,0.06),transparent_10%,transparent_90%,rgba(0,0,0,0.08))]" />
                  <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(120,95,68,0.16),inset_0_16px_24px_rgba(255,255,255,0.08),inset_0_-14px_20px_rgba(0,0,0,0.07)]" />
                </figure>

                {/* Hover add-to-cart overlay — slides up from bottom */}
                {isAuthenticated && !isAdmin && drawing.price > 0 && (
                  <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                    <div className="bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-10">
                      <button
                        type="button"
                        disabled={cartLoading}
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (!drawing.thumbnailName) {
                            showToast("Missing thumbnail for cart item.", "error");
                            return;
                          }
                          const added = await addItem({
                            drawingId: drawing._id,
                            title: drawing.title,
                            price: drawing.price,
                            thumbnailName: drawing.thumbnailName,
                          });
                          if (added) {
                            showToast("Added to cart.", "success");
                          } else {
                            showToast("Could not add to cart.", "error");
                          }
                        }}
                        className="btn btn-sm btn-block border-0 bg-white/92 text-stone-800 shadow-sm backdrop-blur-sm hover:bg-white"
                      >
                        {cartLoading ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          <>
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add to cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-2.5 text-center text-sm font-medium opacity-70">
                {drawing.title}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Load more ─────────────────────────────────────── */}
      {drawings.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => fetchDrawings({ append: true, limit: 12 })}
            disabled={loading}
            className="btn btn-outline min-w-36"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Load more"
            )}
          </button>
        </div>
      )}

      {/* ── Modals ────────────────────────────────────────── */}
      <DrawingDetailsModal
        open={selectedDrawing !== null}
        drawing={selectedDrawing}
        isAdmin={isAdmin && !isLoading}
        isAuthenticated={isAuthenticated && !isLoading}
        onClose={handleCloseDrawingModal}
        onEdit={(drawing) => {
          setEditingDrawing(drawing);
          setManualSelectedDrawing(null);
        }}
        onAddToCart={async (drawing) => {
          if (!drawing.thumbnailName) {
            showToast("Missing thumbnail for cart item.", "error");
            return;
          }
          const added = await addItem({
            drawingId: drawing._id,
            title: drawing.title,
            price: drawing.price,
            thumbnailName: drawing.thumbnailName,
          });
          if (added) {
            showToast("Added to cart.", "success");
          } else {
            showToast("Could not add to cart.", "error");
          }
        }}
        addToCartDisabled={cartLoading}
      />

      <AddDrawingModal
        open={editingDrawing !== null}
        onClose={() => setEditingDrawing(null)}
        initialDrawing={editingDrawing}
      />
    </>
  );
};

export default GalleryGrid;
