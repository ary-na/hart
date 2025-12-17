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
