"use client";

import { ReactNode, useEffect, useId, useLayoutEffect, useRef } from "react";
import { cn } from "@hart/lib/utils";
import { ModalProps } from "@hart/lib/types";

type AppModalProps = ModalProps & {
  title?: ReactNode;
  labelledBy?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  showClose?: boolean;
};

export const AppModal = ({
  open,
  onClose,
  title,
  labelledBy,
  children,
  footer,
  className,
  showClose = true,
}: AppModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const labelId = title ? titleId : labelledBy;

  useLayoutEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    if (document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) dialog.close();
      const restore = previousFocusRef.current;
      previousFocusRef.current = null;
      queueMicrotask(() => restore?.focus?.());
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", onCancel);

    return () => {
      dialog.removeEventListener("cancel", onCancel);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-modal="true"
      aria-labelledby={labelId}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          "modal-box overflow-visible px-6 pb-6 pt-14 md:px-8 md:pb-8 md:pt-16",
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 z-20 border border-base-300/60 bg-base-100/90 shadow-sm backdrop-blur-sm"
            aria-label="Close dialog"
          >
            ✕
          </button>
        )}

        {title && (
          <h2 id={titleId} className="mb-6 text-lg font-semibold">
            {title}
          </h2>
        )}

        {children}

        {footer && <div className="modal-action">{footer}</div>}
      </div>
    </dialog>
  );
};
