// src/lib/ui/ModalClient.tsx

"use client";

import { useState } from "react";
import ChangePasswordModal from "@hart/components/Modal";

const ChangePassModalClient = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-outline"
      >
        Update Password
      </button>

      <ChangePasswordModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ChangePassModalClient;
