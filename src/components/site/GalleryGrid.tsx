// src/components/GalleryGrid.tsx

"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@hart/lib/ui";
import { Drawing } from "@hart/lib/types";
import { useEffect, useMemo, useState } from "react";
import { EmptyGallery } from "@hart/lib/ui";
import { useCurrentUser } from "@hart/hooks";
import { useDrawingsContext, useCartContext, useToast } from "@hart/hooks";
import DrawingDetailsModal from "./DrawingDetailsModal";
import AddDrawingModal from "@hart/components/admin/AddDrawingModal";

const GalleryGrid = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { drawings, fetchDrawings, loading } = useDrawingsContext();
  const { user, isLoading } = useCurrentUser();
  const { addItem, loading: cartLoading } = useCartContext();
  const { showToast } = useToast();
  const isAdmin = user?.role === "admin";
  const [manualSelectedDrawing, setManualSelectedDrawing] =
    useState<Drawing | null>(null);
  const [editingDrawing, setEditingDrawing] = useState<Drawing | null>(null);
  const selectedDrawingId = searchParams.get("drawing");

  useEffect(() => {
    fetchDrawings({ limit: 12 });
  }, [fetchDrawings]);

  const selectedDrawing = useMemo(() => {
    if (manualSelectedDrawing) return manualSelectedDrawing;
    if (!selectedDrawingId) return null;
    return (
      drawings.find((drawing) => drawing._id === selectedDrawingId) ?? null
    );
  }, [drawings, manualSelectedDrawing, selectedDrawingId]);

  const handleCloseDrawingModal = () => {
    setManualSelectedDrawing(null);

    if (!selectedDrawingId) return;

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("drawing");
    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  };

  return (
    <>
      {loading && <Loader size="xl" message="Loading gallery..." />}
      {!loading && drawings.length === 0 ? (
        <EmptyGallery />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drawings.map((drawing, index) => (
            <div
              key={drawing._id}
              className="group h-reveal"
              style={{ ["--reveal-delay" as never]: `${index % 5 * 80}ms` }}
            >
              <div className="relative overflow-hidden border border-stone-300 bg-[#f6f1e8] shadow-[0_18px_35px_rgba(43,33,24,0.18),0_6px_18px_rgba(43,33,24,0.1)] transition-shadow hover:shadow-[0_24px_50px_rgba(43,33,24,0.22)]">
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-base-content/20">
                      No Image
                    </div>
                  )}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-18 mix-blend-soft-light bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.24)_0px,rgba(255,255,255,0.24)_1px,transparent_1px,transparent_4px),repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_6px)]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_18%,transparent_82%,rgba(0,0,0,0.1)),linear-gradient(90deg,rgba(255,255,255,0.06),transparent_10%,transparent_90%,rgba(0,0,0,0.08))]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(120,95,68,0.16),inset_0_16px_24px_rgba(255,255,255,0.08),inset_0_-14px_20px_rgba(0,0,0,0.07)]"
                  />
                </figure>

              </div>
              <p className="mt-3 text-center text-sm font-medium opacity-80">
                {drawing.title}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {drawings.length !== 0 && !loading && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => fetchDrawings({ append: true, limit: 12 })}
            disabled={loading}
            className="btn btn-outline min-w-32"
          >
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              "Load More"
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
