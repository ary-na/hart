// src/components/SigninForm.tsx
"use client";

import { FormField } from "@hart/lib/ui";
import { SubmitButton } from "@hart/lib/ui";
import { useSignin } from "@hart/hooks";

export default function ForgotPasswordForm() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
    isSubmitting,
    serverError,
  } = useSignin();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4"
      noValidate
      aria-describedby={serverError ? "forgot-password-server-error" : undefined}
    >
      <fieldset className="space-y-4">
        <legend className="sr-only">Password reset</legend>

        {/* Email field */}
        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          iconSvg={
            <svg
              aria-hidden="true"
              className="h-4 w-4 opacity-70"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </g>
            </svg>
          }
          registerProps={register("email")}
          error={errors.email?.message}
          enterKeyHint="next"
        />
      </fieldset>

      {serverError && (
        <p id="forgot-password-server-error" className="text-error" role="alert">
          {serverError}
        </p>
      )}

      <SubmitButton
        isLoading={isSubmitting}
        text="Reset Password"
        loadingText="Resetting..."
      />
    </form>
  );
}
