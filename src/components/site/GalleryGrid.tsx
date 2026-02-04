// src/components/GalleryGrid.tsx

"use client";

import Image from "next/image";
import { Loader } from "@hart/lib/ui";
import { Drawing } from "@hart/lib/types";
import { useEffect, useState } from "react";
import { EmptyGallery } from "@hart/lib/ui";
import { useCurrentUser } from "@hart/hooks";
import { useDrawingsContext, useCartContext, useToast } from "@hart/hooks";
import DrawingDetailsModal from "./DrawingDetailsModal";
import AddDrawingModal from "@hart/components/admin/AddDrawingModal";

const GalleryGrid = () => {
  const { drawings, fetchDrawings, loading } = useDrawingsContext();
  const { user, isLoading } = useCurrentUser();
  const { items: cartItems, addItem, removeItem, loading: cartLoading } =
    useCartContext();
  const { showToast } = useToast();
  const isAdmin = user?.role === "admin";
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [editingDrawing, setEditingDrawing] = useState<Drawing | null>(null);

  useEffect(() => {
    fetchDrawings({ limit: 12 });
  }, [fetchDrawings]);

  return (
    <>
      {loading && <Loader size="xl" message="Loading gallery..." />}
      {!loading && drawings.length === 0 ? (
        <EmptyGallery />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {drawings.map((drawing) => (
            <div
              key={drawing._id}
              className="group flex flex-col overflow-hidden rounded-md border-4 border-base-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(245,242,232,0.92))] shadow-[0_18px_35px_rgba(15,23,42,0.12)] transition-shadow hover:shadow-[0_24px_50px_rgba(15,23,42,0.18)]"
            >
              <button
                onClick={() => setSelectedDrawing(drawing)}
                className="relative text-left w-full"
              >
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
                </figure>
              </button>

              <div className="flex flex-1 flex-col gap-3 border-t border-base-200/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold">{drawing.title}</h2>
                    <p className="text-sm opacity-70 line-clamp-2">
                      {drawing.description}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    ${drawing.price.toLocaleString()}
                  </span>
                </div>

                {!isAdmin && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={async (event) => {
                      event.stopPropagation();
                      const isInCart = cartItems.some(
                        (item) => item.drawingId === drawing._id
                      );

                      if (isInCart) {
                        const removed = await removeItem(drawing._id);
                        if (removed) {
                          showToast("Removed from cart.", "success");
                        } else {
                          showToast("Could not remove item.", "error");
                        }
                        return;
                      }

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
                    disabled={cartLoading}
                  >
                    {cartLoading
                      ? "Working..."
                      : cartItems.some(
                            (item) => item.drawingId === drawing._id
                          )
                        ? "Remove from cart"
                        : "Add to cart"}
                  </button>
                )}
              </div>
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
        onClose={() => setSelectedDrawing(null)}
        onEdit={(drawing) => {
          setEditingDrawing(drawing);
          setSelectedDrawing(null);
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
