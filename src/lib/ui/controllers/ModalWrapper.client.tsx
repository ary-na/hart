// src/lib/ui/controllers/ModalWrapper.client.tsx
// src/lib/ui/controllers/ModalWrapper.client.tsx

"use client";

import { ModalController } from "./ModalController";
import { ModalWrapperProps } from "@hart/lib/types";

export function ModalWrapper({
  trigger,
  className,
  ariaLabel,
  ModalComponent,
}: ModalWrapperProps) {
  return (
    <ModalController trigger={trigger} className={className} ariaLabel={ariaLabel}>
      {({ open, onClose }) => <ModalComponent open={open} onClose={onClose} />}
    </ModalController>
  );
}

