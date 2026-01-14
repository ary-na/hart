// src/lib/ui/Loader.tsx

type LoaderProps = {
  size?: "sm" | "md" | "lg" | "xl";
  message?: string;
};

export const Loader = ({
  size = "xl",
  message = "Loading...",
}: LoaderProps) => {
  return (
    <div
      className="flex flex-1 items-center justify-center gap-2"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      {/* Loading  */}
      <span
        className={`loading loading-bars loading-${size}`}
        aria-hidden="true"
      />

      {/* Message */}
      <span className="text-sm opacity-70">{message}</span>
    </div>
  );
};
