// src/lib/types/Modal.ts
import { ReactNode, ComponentType } from "react";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export type ModalTriggerProps = {
  trigger?: ReactNode;
  className?: string;
  ariaLabel?: string;
  ModalComponent: ComponentType<ModalProps>;
};
