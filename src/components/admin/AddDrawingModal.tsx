// src/components/admin/CreateDrawingModal.tsx

"use client";

import { ModalProps, Drawing } from "@hart/lib/types";
import { AppModal } from "@hart/lib/ui";
import AddDrawingForm from "./AddDrawingFrom";

type AddDrawingModalProps = ModalProps & {
  initialDrawing?: Drawing | null;
};

const AddDrawingModal = ({
  open = false,
  onClose,
  initialDrawing,
}: AddDrawingModalProps) => {
  if (!open || !onClose) return null;

  const isEdit = Boolean(initialDrawing?._id);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Drawing" : "Create Drawing"}
      className="max-w-2xl"
    >
      <AddDrawingForm onClose={onClose} initialDrawing={initialDrawing} />
    </AppModal>
  );
};

export default AddDrawingModal;
