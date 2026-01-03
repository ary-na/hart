// src/components/GalleryGrid.tsx

"use client";

import Image from "next/image";
import { cn } from "@hart/lib/utils";
import { Drawing } from "@hart/lib/types";
import { useEffect, useState } from "react";
import { ConfirmModal } from "@hart/lib/ui";
import { useCurrentUser } from "@hart/hooks";
import { useDrawingsContext } from "@hart/hooks";
import { EmptyGalleryCanvas } from "@hart/lib/ui";

const GalleryGrid = () => {
  const { drawings, fetchDrawings, loading, deleteDrawing, deletingIds } =
    useDrawingsContext();
  const { user, isLoading } = useCurrentUser();
  const isAdmin = user?.role === "admin";

  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);

  const [deletePendingId, setDeletePendingId] = useState<string | null>(null);

  useEffect(() => {
    fetchDrawings({ limit: 12 });
  }, [fetchDrawings]);

  return (
    <>
      <div className="space-y-8">
        {loading && (
          <div className="flex flex-col my-15 items-center justify-center text-center">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        )}
        {drawings.length === 0 && !loading ? (
          <div className="flex flex-col my-10 items-center justify-center text-center">
            <EmptyGalleryCanvas
              className="mb-4"
              alt="Illustration of an empty gallery with a blank canvas on an easel"
              title="Empty gallery – waiting for your first drawing"
            />
            <h2>Nothing here… yet.</h2>
            <p className="opacity-75 max-w-md">
              No drawings have found their way here yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {drawings.map((drawing) => (
              <div key={drawing._id} className="relative group">
                <button
                  onClick={() => setSelectedDrawing(drawing)}
                  className="card bg-base-100 shadow-xl transition-all hover:shadow-2xl overflow-hidden text-left w-full"
                >
                  <figure className="relative aspect-square w-full overflow-hidden bg-base-200">
                    {drawing.thumbnailUrl ? (
                      <Image
                        src={drawing.thumbnailUrl}
                        alt={drawing.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-base-content/20">
                        No Image
                      </div>
                    )}
                  </figure>

                  <div className="card-body p-4">
                    <h2 className="card-title text-lg">{drawing.title}</h2>
                    <p className="text-sm opacity-70 line-clamp-2">
                      {drawing.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between font-medium">
                      <span>${drawing.price.toLocaleString()}</span>
                    </div>
                  </div>
                </button>

                {/* Delete Button – visible only to admins */}
                {isAdmin && !isLoading && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletePendingId(drawing._id);
                    }}
                    disabled={deletingIds.has(drawing._id)}
                    className={cn(
                      "absolute top-3 right-3 btn btn-circle btn-sm btn-error shadow-lg transition-opacity",
                      deletingIds.has(drawing._id)
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-90 hover:opacity-100"
                    )}
                    title="Delete drawing"
                    aria-label="Delete drawing"
                  >
                    {deletingIds.has(drawing._id) ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2.175 2.175 0 0116.138 21H7.862a2.175 2.175 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {drawings.length !== 0 && !loading && (
          <div className="flex justify-center">
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
      </div>

      <ConfirmModal
        open={deletePendingId !== null}
        title="Delete this drawing?"
        message={`Are you sure you want to delete "${
          drawings.find((d) => d._id === deletePendingId)?.title ||
          "this drawing"
        }"? This action cannot be undone.`}
        loading={deletePendingId ? deletingIds.has(deletePendingId) : false}
        onConfirm={async () => {
          if (deletePendingId) {
            await deleteDrawing(deletePendingId);
          }
          setDeletePendingId(null);
        }}
        onCancel={() => setDeletePendingId(null)}
      />

      {/* Modal – Full Image + Details */}
      {selectedDrawing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedDrawing(null)}
        >
          <div
            className="relative max-w-5xl max-h-full overflow-auto rounded-lg bg-base-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDrawing(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-base-200/80 p-2 text-2xl backdrop-blur hover:bg-base-300"
            >
              ✕
            </button>

            {/* Full Image */}
            {selectedDrawing.fileUrl ? (
              <div className="relative max-h-[80vh] overflow-hidden bg-base-200">
                <Image
                  src={selectedDrawing.fileUrl}
                  alt={selectedDrawing.title}
                  width={1200}
                  height={1200}
                  className="max-h-[80vh] w-full object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center bg-base-200">
                <span className="text-2xl opacity-50">
                  Loading full image...
                </span>
              </div>
            )}

            {/* Details */}
            <div className="p-6">
              <h2 className="text-3xl font-bold">{selectedDrawing.title}</h2>
              <p className="mt-3 text-lg opacity-80">
                {selectedDrawing.description}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-semibold">
                  ${selectedDrawing.price.toLocaleString()}
                </span>
              </div>

              {selectedDrawing.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedDrawing.tags.map((tag) => (
                    <span key={tag} className="badge badge-primary badge-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
