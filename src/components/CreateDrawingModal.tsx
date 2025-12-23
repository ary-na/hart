// src/components/CreateDrawingModal.tsx
"use client";

import { ModalProps } from "@hart/lib/types";
import CreateDrawingForm from "./CreateDrawingFrom";

const CreateDrawingModal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="mb-8!">Create Drawing</h3>
        <CreateDrawingForm onClose={onClose} />
      </div>
    </dialog>
  );
};

export default CreateDrawingModal;
