// src/lib/ui/CancelButton.tsx

import { cn } from "@hart/lib/utils";

import { CancelButtonProps } from "@hart/lib/types";

export const CancelButton = ({
  onClick,
  text = "Cancel",
  className,
  type = "button",
}: CancelButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn("btn btn-ghost", className)}
    >
      {text}
    </button>
  );
};
