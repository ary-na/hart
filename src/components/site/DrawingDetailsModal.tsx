"use client";

import Image from "next/image";
import { useId } from "react";
import { Drawing } from "@hart/lib/types";
import { AppModal } from "@hart/lib/ui";
import { paintingAlt } from "@hart/lib/utils";

type Props = {
  open: boolean;
  drawing: Drawing | null;
  isAdmin: boolean;
  onClose: () => void;
  onEdit: (drawing: Drawing) => void;
};

const DrawingDetailsModal = ({
  open,
  drawing,
  isAdmin,
  onClose,
  onEdit,
}: Props) => {
  const titleId = useId();

  if (!open || !drawing) return null;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      className="w-[min(96vw,72rem)] max-w-5xl p-0"
      bodyClassName="p-0"
    >
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(16rem,19rem)]">
        <div className="relative bg-[#faf8f5]">
          {drawing.fileUrl || drawing.thumbnailUrl ? (
            <Image
              src={drawing.fileUrl || drawing.thumbnailUrl || ""}
              alt={paintingAlt(drawing.title)}
              width={1200}
              height={1200}
              className="relative z-10 h-auto w-full max-h-[min(52dvh,28rem)] object-contain lg:max-h-[min(80dvh,44rem)]"
              priority
              unoptimized
            />
          ) : (
            <div className="flex min-h-48 w-full items-center justify-center">
              <span className="text-sm opacity-70">Loading image…</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 border-t border-[#d9cfc3] bg-[#faf8f5] p-6 lg:border-l lg:border-t-0">
          <div className="flex min-w-0 flex-col">
            <h2 id={titleId} className="text-2xl font-medium leading-snug">
              {drawing.title}
            </h2>
            {drawing.creditLine && (
              <p className="mt-1.5 text-xs italic leading-relaxed text-[#3d342c]/60">
                {drawing.creditLine}
              </p>
            )}
            {drawing.description && (
              <p className="mt-4 text-sm leading-relaxed opacity-80">
                {drawing.description}
              </p>
            )}
          </div>

          {isAdmin && (
            <div className="mt-auto">
              <button
                type="button"
                className="btn btn-outline btn-block"
                onClick={() => onEdit(drawing)}
              >
                Edit drawing
              </button>
            </div>
          )}

          <p className="text-xs leading-relaxed opacity-70">
            All works are original pieces. Each painting is hand-made and one of a kind.
          </p>
        </div>
      </div>
    </AppModal>
  );
};

export default DrawingDetailsModal;
