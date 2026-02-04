// src/lib/ui/FormField.tsx

"use client";

import { cn } from "@hart/lib/utils";
import { ReactNode, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  iconSvg?: ReactNode;
  registerProps: UseFormRegisterReturn;
  error?: string;
  enterKeyHint?: "next" | "go" | "done" | "search" | "send" | "enter";
  className?: string;
  required?: boolean;
  showToggle?: boolean;
  as?: "input" | "textarea";
  rows?: number;
}

export function FormField({
  label,
  id,
  type = "text",
  placeholder,
  autoComplete,
  iconSvg,
  registerProps,
  error,
  enterKeyHint = "next",
  className = "",
  required = true,
  showToggle = false,
  as = "input",
  rows = 4,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const errorId = error ? `${id}-error` : undefined;
  const inputType = showToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className={cn("form-control w-full", className)}>
      <label htmlFor={id} className="label mb-2">
        <span className="label-text">{label}</span>
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={errorId}
          rows={rows}
          {...registerProps}
          className={cn(
            "textarea w-full",
            error && "textarea-error"
          )}
        />
      ) : (
        <div className="relative w-full">
          <div
            className={cn(
              "input w-full flex items-center gap-2",
              error && "input-error"
            )}
          >
            {iconSvg && <span className="opacity-70">{iconSvg}</span>}

            <input
              id={id}
              type={inputType}
              placeholder={placeholder}
              autoComplete={autoComplete}
              required={required}
              aria-required={required}
              aria-invalid={!!error}
              aria-describedby={errorId}
              enterKeyHint={enterKeyHint}
              {...registerProps}
              className="w-full bg-transparent outline-none pr-10"
            />

            {showToggle && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  // hidden
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  // visible
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {error && (
        <p id={errorId} role="alert" className="label-text-alt text-error mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
