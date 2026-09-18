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
    <AppModal open={open} onClose={onClose} labelledBy={titleId} className="max-w-5xl">
      <div className="grid items-start gap-0 lg:grid-cols-[1fr_300px]">
        <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-[#faf8f5] p-0">
          {drawing.fileUrl ? (
            <Image
              src={drawing.fileUrl}
              alt={paintingAlt(drawing.title)}
              width={1200}
              height={1200}
              className="relative z-10 max-h-[65vh] w-auto max-w-full object-contain"
              priority
              unoptimized
            />
          ) : (
            <div className="flex min-h-48 w-full items-center justify-center">
              <span className="text-sm opacity-70">Loading image…</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 border-t border-[#d9cfc3] bg-[#faf8f5] p-6 lg:min-h-full lg:border-l lg:border-t-0">
          <div className="flex flex-col gap-3">
            <h2 id={titleId} className="text-2xl font-medium leading-snug">
              {drawing.title}
            </h2>
            {drawing.description && (
              <p className="text-sm leading-relaxed opacity-80">
                {drawing.description}
              </p>
            )}
            {drawing.creditLine && (
              <p className="text-xs leading-relaxed italic opacity-80">
                {drawing.creditLine}
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
