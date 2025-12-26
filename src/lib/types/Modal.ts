// src/lib/types/Modal.ts

import { ReactNode } from "react";

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

export interface ModalControllerProps {
  trigger?: ReactNode;
  className?: string;
  ariaLabel?: string;
  children: (props: { open: boolean; onClose: () => void }) => ReactNode;
}

export type ModalWrapperProps = {
  trigger: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  ModalComponent: React.ComponentType<{ open: boolean; onClose: () => void }>;
};
