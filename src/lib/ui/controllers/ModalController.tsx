// src/lib/ui/controllers/ModalController.tsx

"use client";

import { useState } from "react";
import { cn } from "@hart/lib/utils";
import { ModalControllerProps } from "@hart/lib/types";

export const ModalController = ({
  trigger,
  className,
  ariaLabel = "Open modal",
  children,
}: ModalControllerProps) => {
  const [open, setOpen] = useState(false);

  const defaultTrigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn("btn", className)}
      aria-label={ariaLabel}
    >
      {trigger || "Open"}
    </button>
  );

  return (
    <>
      {defaultTrigger}
      {children({ open, onClose: () => setOpen(false) })}
    </>
  );
};
