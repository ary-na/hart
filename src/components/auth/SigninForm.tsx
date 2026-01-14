// src/components/SigninForm.tsx
"use client";

import { FormField } from "@hart/lib/ui";
import { SubmitButton } from "@hart/lib/ui";
import { useSignin } from "@hart/hooks/useSignin";
import Link from "next/link";

export default function SigninForm() {
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <fieldset className="space-y-4">
        <legend className="sr-only">Sign-in credentials</legend>

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

        {/* Password field */}
        <FormField
          label="Password"
          id="password"
          placeholder="Enter your password"
          autoComplete="current-password"
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
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </g>
            </svg>
          }
          registerProps={register("password")}
          error={errors.password?.message}
          enterKeyHint="go"
          showToggle={true}
        />
      </fieldset>

      {serverError && (
        <p className="text-error" role="alert">
          {serverError}
        </p>
      )}

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            {...register("rememberMe")}
          />
          <span className="text-sm">Remember me</span>
        </label>

        <Link href="/forgot-password" className="link link-primary text-sm">
          Forgot password?
        </Link>
      </div>

      <SubmitButton
        isLoading={isSubmitting}
        text="Sign in"
        loadingText="Signing in..."
      />
    </form>
  );
}
