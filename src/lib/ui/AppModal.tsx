// src/lib/ui/AppModal.tsx

"use client";

import { ReactNode } from "react";
import { cn } from "@hart/lib/utils";
import { ModalProps } from "@hart/lib/types";

type AppModalProps = ModalProps & {
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  showClose?: boolean;
};

export const AppModal = ({
  open,
  onClose,
  title,
  children,
  footer,
  className,
  showClose = true,
}: AppModalProps) => {
  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div
        className={cn(
          "modal-box overflow-visible px-6 pb-6 pt-14 md:px-8 md:pb-8 md:pt-16",
          className
        )}
      >
        {showClose && (
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 z-20 border border-base-300/60 bg-base-100/90 shadow-sm backdrop-blur-sm"
            aria-label="Close modal"
          >
            ✕
          </button>
        )}

        {title && <h3 className="mb-6 text-lg font-semibold">{title}</h3>}

        {children}

        {footer && <div className="modal-action">{footer}</div>}
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
