// src/components/user/UpdatePasswordModal.tsx

"use client";

import { ModalProps } from "@hart/lib/types";
import UpdatePasswordForm from "./UpdatePasswordForm";

const UpdatePasswordModal = ({ open = false, onClose }: ModalProps) => {
  if (!open || !onClose) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="mb-6">Update Password</h3>
        <UpdatePasswordForm onClose={onClose} />
      </div>
    </dialog>
  );
};

export default UpdatePasswordModal;
