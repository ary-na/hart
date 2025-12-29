// src/lib/ui/controllers/Modal.tsx

"use client";

import { useState } from "react";
import { cn } from "@hart/lib/utils";
import { ModalTriggerProps } from "@hart/lib/types";

export function ModalController({
  trigger,
  className,
  ariaLabel = "Open modal",
  ModalComponent,
}: ModalTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("btn", className)}
        aria-label={ariaLabel}
      >
        {trigger || "Open"}
      </button>

      <ModalComponent open={open} onClose={() => setOpen(false)} />
    </>
  );
}
