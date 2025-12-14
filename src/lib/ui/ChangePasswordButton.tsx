"use client";

import { useState } from "react";
import ChangePasswordModal from "@hart/components/changePasswordModal";

export function ChangePasswordButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-outline mt-4">
        Change Password
      </button>

      {open && <ChangePasswordModal onClose={() => setOpen(false)} />}
    </>
  );
}
