// src/components/GalleryGrid.tsx

"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@hart/lib/ui";
import { Drawing } from "@hart/lib/types";
import {
  paintingAlt,
  sortNewestFirst,
  wallPackProps,
  withPublicArtworkImage,
} from "@hart/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { EmptyGallery } from "@hart/lib/ui";
import { useCurrentUser } from "@hart/hooks";
import { useDrawingsContext } from "@hart/hooks";
import DrawingDetailsModal from "./DrawingDetailsModal";
import AddDrawingModal from "@hart/components/admin/AddDrawingModal";

const GalleryGrid = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { drawings, fetchDrawings, loading } = useDrawingsContext();
  const { user, isLoading } = useCurrentUser();

  const isAdmin = user?.role === "admin";
  const [manualSelectedDrawing, setManualSelectedDrawing] = useState<Drawing | null>(null);
  const [editingDrawing, setEditingDrawing] = useState<Drawing | null>(null);
  const selectedDrawingId = searchParams.get("drawing");

  useEffect(() => {
    fetchDrawings({ limit: 48 });
  // fetchDrawings is a stable callback
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listed = useMemo(
    () => sortNewestFirst(withPublicArtworkImage(drawings)),
    [drawings]
  );

  const selectedDrawing = useMemo(() => {
    if (manualSelectedDrawing) return manualSelectedDrawing;
    if (!selectedDrawingId) return null;
    return listed.find((d) => d._id === selectedDrawingId) ?? null;
  }, [listed, manualSelectedDrawing, selectedDrawingId]);

  const handleCloseDrawingModal = () => {
    setManualSelectedDrawing(null);
    if (!selectedDrawingId) return;
    const next = new URLSearchParams(searchParams.toString());
    next.delete("drawing");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <>
      {loading && listed.length === 0 && (
        <Loader size="xl" message="Loading gallery..." />
      )}

      {!loading && listed.length === 0 && <EmptyGallery />}

      {listed.length > 0 && (
        <div className="h-wall" {...wallPackProps(listed.length)}>
          {listed.map((drawing, index) => (
            <div
              key={drawing._id}
              className="h-wall-item h-reveal"
              style={{ ["--reveal-delay" as never]: `${(index % 6) * 60}ms` }}
            >
              <div className="h-frame h-frame-hover relative h-full">
                <button
                  type="button"
                  onClick={() => setManualSelectedDrawing(drawing)}
                  className="absolute inset-0 z-10 text-left"
                  aria-label={`View ${paintingAlt(drawing.title)}`}
                />

                <figure className="h-frame-face h-full w-full">
                  {drawing.thumbnailUrl ? (
                    <Image
                      src={drawing.thumbnailUrl}
                      alt=""
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
                <div className="h-frame-whisper">
                  <span>{drawing.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {listed.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => fetchDrawings({ append: true, limit: 48 })}
            disabled={loading}
            className="btn btn-outline min-w-36 rounded-full"
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
