// src/components/CreateDrawingModal.tsx

"use client";

import { ModalProps } from "@hart/lib/types";
import AddDrawingForm from "./AddDrawingFrom";

const AddDrawingModal = ({ open = false, onClose }: ModalProps) => {
  if (!open || !onClose) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="mb-8!">Create Drawing</h3>
        <AddDrawingForm onClose={onClose} />
      </div>
    </dialog>
  );
};

export default AddDrawingModal;
