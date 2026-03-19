// src/components/site/DrawingDetailsModal.tsx

"use client";

import Image from "next/image";
import { Drawing } from "@hart/lib/types";
import { AppModal } from "@hart/lib/ui";

type Props = {
  open: boolean;
  drawing: Drawing | null;
  isAdmin: boolean;
  onClose: () => void;
  onEdit: (drawing: Drawing) => void;
  onAddToCart: (drawing: Drawing) => void;
  addToCartDisabled?: boolean;
};

const DrawingDetailsModal = ({
  open,
  drawing,
  isAdmin,
  onClose,
  onEdit,
  onAddToCart,
  addToCartDisabled = false,
}: Props) => {
  if (!open || !drawing) return null;

  return (
    <AppModal open={open} onClose={onClose} className="max-w-6xl">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-h-[240px] items-start justify-center rounded-lg bg-base-200/50 p-3 md:p-4">
          {drawing.fileUrl ? (
            <Image
              src={drawing.fileUrl}
              alt={drawing.title}
              width={1200}
              height={1200}
              className="h-auto max-h-[72vh] w-auto max-w-full rounded-md object-contain shadow-[0_18px_35px_rgba(43,33,24,0.14)]"
              priority
              unoptimized
            />
          ) : (
            <div className="flex min-h-[240px] w-full items-center justify-center">
              <span className="text-2xl opacity-50">Loading full image...</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 lg:pt-1">
          <div>
            <h2 className="text-3xl font-bold">{drawing.title}</h2>
            <p className="mt-3 text-lg opacity-80">{drawing.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold">
              ${drawing.price.toLocaleString()}
            </span>
            {!isAdmin && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onAddToCart(drawing)}
                disabled={addToCartDisabled}
              >
                Add to cart
              </button>
            )}
          </div>

          {drawing.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {drawing.tags.map((tag) => (
                <span key={tag} className="badge badge-primary badge-lg">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {isAdmin && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onEdit(drawing)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </AppModal>
  );
};

export default DrawingDetailsModal;
