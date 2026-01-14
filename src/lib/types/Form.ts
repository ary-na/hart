// src/lib/types/FormField.ts

export type CancelButtonProps = {
  onClick: () => void;
  text?: string;
  className?: string;
  type?: "button" | "reset";
  disabled?: boolean;
};
