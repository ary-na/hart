// src/lib/ui/ModalClient.tsx

"use client";

import { useState } from "react";
import { cn } from "@hart/lib/utils";
import { ModalToggleButtonProps } from "@hart/lib/types";
import ChangePasswordModal from "@hart/components/ChangePasswordModal";

const ModalClient = ({
  className = "",
  label = "",
}: ModalToggleButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("btn btn-outline", className)}
      >
        {label}
      </button>

      <ChangePasswordModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ModalClient;
