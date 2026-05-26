// src/components/site/DrawingDetailsModal.tsx

"use client";

import Image from "next/image";
import { Drawing } from "@hart/lib/types";
import { AppModal } from "@hart/lib/ui";

type Props = {
  open: boolean;
  drawing: Drawing | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  onClose: () => void;
  onEdit: (drawing: Drawing) => void;
  onAddToCart: (drawing: Drawing) => void;
  addToCartDisabled?: boolean;
};

const DrawingDetailsModal = ({
  open,
  drawing,
  isAdmin,
  isAuthenticated,
  onClose,
  onEdit,
  onAddToCart,
  addToCartDisabled = false,
}: Props) => {
  if (!open || !drawing) return null;

  const isForSale = drawing.price > 0;

  return (
    <AppModal open={open} onClose={onClose} className="max-w-5xl">
      <div className="grid items-start gap-0 lg:grid-cols-[1fr_300px]">

        {/* ── Image panel ── */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-l-none rounded-r-none lg:rounded-l-xl bg-[#f6f1e8] border border-stone-200 lg:border-r-0 lg:rounded-r-none min-h-64 p-4 md:p-6">
          {drawing.fileUrl ? (
            <>
              <Image
                src={drawing.fileUrl}
                alt={drawing.title}
                width={1200}
                height={1200}
                className="relative z-10 max-h-[65vh] w-auto max-w-full rounded object-contain shadow-[0_20px_50px_rgba(43,33,24,0.18),0_6px_16px_rgba(43,33,24,0.1)]"
                priority
                unoptimized
              />
              {/* Paper texture overlays */}
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-soft-light bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.24)_0px,rgba(255,255,255,0.24)_1px,transparent_1px,transparent_4px),repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_6px)]" />
              <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(120,95,68,0.12),inset_0_12px_20px_rgba(255,255,255,0.06),inset_0_-12px_18px_rgba(0,0,0,0.05)]" />
            </>
          ) : (
            <div className="flex min-h-48 w-full items-center justify-center">
              <span className="text-sm opacity-40">Loading image…</span>
            </div>
          )}
        </div>

        {/* ── Details panel ── */}
        <div className="flex flex-col gap-6 rounded-r-xl border border-stone-200 border-l-0 bg-base-100 p-6 lg:min-h-full lg:border-l-0">

          {/* Title + description */}
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold leading-snug">{drawing.title}</h2>
            {drawing.description && (
              <p className="text-sm leading-relaxed opacity-65">
                {drawing.description}
              </p>
            )}
          </div>

          <div className="h-px w-full bg-base-300" />

          {/* Price + provenance */}
          <div className="flex flex-col gap-2">
            {isForSale ? (
              <>
                <p className="text-xs uppercase tracking-[0.35em] opacity-45">
                  Price
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  ${drawing.price.toLocaleString()}
                  <span className="ml-1.5 text-sm font-normal opacity-50">AUD</span>
                </p>
              </>
            ) : (
              <div className="rounded-xl border border-base-300 bg-base-200/60 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.35em] opacity-45 mb-0.5">Availability</p>
                <p className="text-sm font-medium opacity-70">Display piece — not currently for sale</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {isAuthenticated && !isAdmin && (
            <div className="flex flex-col gap-2 mt-auto">
              {isForSale ? (
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => onAddToCart(drawing)}
                  disabled={addToCartDisabled}
                >
                  {addToCartDisabled ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to cart
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-ghost btn-block btn-sm opacity-50 cursor-not-allowed"
                  disabled
                >
                  Not available for purchase
                </button>
              )}
            </div>
          )}

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

          {/* Original artwork note */}
          <p className="text-xs opacity-35 leading-relaxed">
            All works are original pieces. Each painting is hand-made and one of a kind.
          </p>
        </div>
      </div>
    </AppModal>
  );
};

export default DrawingDetailsModal;
