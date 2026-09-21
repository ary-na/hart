"use client";

import { ConfirmModalProps } from "@hart/lib/types";
import { AppModal } from "./AppModal";

export const ConfirmModal = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <AppModal
      open={open}
      onClose={onCancel}
      title={title}
      footer={
        <>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-error"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </>
      }
    >
      <p className="py-4">{message}</p>
    </AppModal>
  );
};
