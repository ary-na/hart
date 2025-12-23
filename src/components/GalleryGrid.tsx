// src/components/GalleryGrid.tsx

"use client";

import Image from "next/image";
import { cn } from "@hart/lib/utils";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Drawing } from "@hart/lib/types";
import { useDrawingsContext } from "@hart/hooks";

export default function GalleryGrid() {
  const { drawings, fetchDrawings, loading, deleteDrawing, deletingIds } =
    useDrawingsContext();
  const { data: session, status } = useSession();

  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);

  const isAdmin = session?.user?.role === "admin";
  const isLoadingUser = status === "loading";

  useEffect(() => {
    fetchDrawings({ limit: 12 });
  }, [fetchDrawings]);

  const handleDelete = async (drawingId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      !confirm(
        "Are you sure you want to delete this drawing? This action cannot be undone."
      )
    ) {
      return;
    }
    await deleteDrawing(drawingId);
  };

  return (
    <>
      <div className="space-y-8">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {drawings.map((drawing) => (
            <div key={drawing._id} className="relative group">
              {/* Card – clickable to open modal */}
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
              {isAdmin && !isLoadingUser && (
                <button
                  onClick={(e) => handleDelete(drawing._id, e)}
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

        {/* Load More */}
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
      </div>

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
}
