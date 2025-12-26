// src/lib/ui/controllers/ModalWrapper.client.tsx

"use client";

import { cloneElement } from "react";
import { ModalController } from "./ModalController";
import { ModalWrapperProps } from "@hart/lib/types";

export function ModalWrapper({
  trigger,
  className,
  ariaLabel,
  modal,
}: ModalWrapperProps) {
  return (
    <ModalController
      trigger={trigger}
      className={className}
      ariaLabel={ariaLabel}
    >
      {({ open, onClose }) => cloneElement(modal, { open, onClose })}
    </ModalController>
  );
}
