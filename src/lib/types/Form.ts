// src/lib/types/FormField.ts
export type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export type SubmitButtonProps = {
  text?: string;
  loadingText?: string;
  isLoading: boolean;
  className?: string;
};

export type ModalToggleButtonProps = {
  className?: string;
  label?: string;
};
