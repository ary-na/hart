// src/components/GalleryGrid.tsx

"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@hart/lib/ui";
import { Drawing } from "@hart/lib/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { EmptyGallery } from "@hart/lib/ui";
import { useCurrentUser } from "@hart/hooks";
import { useDrawingsContext } from "@hart/hooks";
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
  const { user, isLoading } = useCurrentUser();

  const isAdmin = user?.role === "admin";
  const [manualSelectedDrawing, setManualSelectedDrawing] = useState<Drawing | null>(null);
  const [editingDrawing, setEditingDrawing] = useState<Drawing | null>(null);
  const selectedDrawingId = searchParams.get("drawing");

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
      {showFilterBar && (
        <div className="mb-8 h-reveal">
          <div className="flex items-center gap-2 flex-wrap">
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

          {activeTag && (
            <p className="mt-3 text-sm opacity-50">
              Showing works tagged{" "}
              <span className="font-medium opacity-100 capitalize">
                &ldquo;{activeTag}&rdquo;
              </span>
              .{" "}
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

      {loading && drawings.length === 0 && (
        <Loader size="xl" message="Loading gallery..." />
      )}

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

      {drawings.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drawings.map((drawing, index) => (
            <div
              key={drawing._id}
              className="group h-reveal"
              style={{ ["--reveal-delay" as never]: `${(index % 6) * 60}ms` }}
            >
              <div className="h-frame h-frame-hover relative">
                <button
                  onClick={() => setManualSelectedDrawing(drawing)}
                  className="absolute inset-0 z-10 text-left"
                  aria-label={`View details for ${drawing.title}`}
                />

                <figure className="h-frame-face aspect-square w-full">
                  {drawing.thumbnailUrl ? (
                    <Image
                      src={drawing.thumbnailUrl}
                      alt={drawing.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="absolute inset-0 object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-base-content/20">
                      No Image
                    </div>
                  )}
                </figure>
              </div>
              <p className="mt-2.5 text-center text-sm font-medium opacity-70">
                {drawing.title}
              </p>
            </div>
          ))}
        </div>
      )}

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

      <DrawingDetailsModal
        open={selectedDrawing !== null}
        drawing={selectedDrawing}
        isAdmin={isAdmin && !isLoading}
        onClose={handleCloseDrawingModal}
        onEdit={(drawing) => {
          setEditingDrawing(drawing);
          setManualSelectedDrawing(null);
        }}
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
