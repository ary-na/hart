// src/lib/ui/SubmitButton.tsx

import { cn } from "@hart/lib/utils";

type SubmitButtonProps = {
  text?: string;
  loadingText?: string;
  isLoading: boolean;
  disabled?: boolean;
  className?: string;
};

export function SubmitButton({
  text = "Submit",
  loadingText = "Submitting...",
  isLoading,
  disabled = false,
  className,
}: SubmitButtonProps) {
  const isDisabled = isLoading || disabled;
  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-label={isLoading ? "Submitting, please wait" : text}
      aria-live="polite"
      className={cn(
        "btn btn-primary",
        isDisabled && "cursor-not-allowed opacity-75",
        className
      )}
    >
      {isLoading ? (
        <>
          <span className="loading loading-dots loading-md"></span>
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
}
