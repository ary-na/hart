// src/lib/ui/ConfirmModal.tsx

"use client";

import { ConfirmModalProps } from "@hart/lib/types";

export const ConfirmModal = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>

        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="btn btn-error"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <div className="modal-backdrop" onClick={onCancel} />
    </dialog>
  );
};
