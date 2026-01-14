// src/components/SignupForm.tsx
"use client";

import Link from "next/link";
import { useSignup } from "@hart/hooks";
import { signIn } from "next-auth/react";
import { FormField, SubmitButton } from "@hart/lib/ui";

export default function SignupForm() {
  const { form, onSubmit, isSubmitting, serverError } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <fieldset className="space-y-4">
        <legend className="sr-only">Sign-up credentials</legend>

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

        {/* Name + Last Name – grid: stacked on mobile, side-by-side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="First name"
            id="firstName"
            type="text"
            placeholder="First name"
            autoComplete="given-name"
            iconSvg={
              <svg
                aria-hidden="true"
                className="h-4 w-4 opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
            registerProps={register("firstName")}
            error={errors.firstName?.message}
            enterKeyHint="next"
          />

          <FormField
            label="Last name (optional)"
            id="lastName"
            type="text"
            placeholder="Last name"
            autoComplete="family-name"
            iconSvg={
              <svg
                aria-hidden="true"
                className="h-4 w-4 opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 10h2" />
                <path d="M16 14h2" />
                <path d="M6.17 15a3 3 0 0 1 5.66 0" />
                <circle cx="9" cy="11" r="2" />
                <rect width="20" height="14" x="2" y="5" rx="2" />
              </svg>
            }
            registerProps={register("lastName")}
            error={errors.lastName?.message}
            enterKeyHint="next"
          />
        </div>

        {/* Password field */}
        <FormField
          label="Password"
          id="password"
          placeholder="Create a password"
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

        <FormField
          label="Confirm Password"
          id="confirmPassword"
          placeholder="Re-enter your password"
          autoComplete="current-password"
          iconSvg={
            <svg
              aria-hidden="true"
              className="h-4 w-4 opacity-70"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <path d="M9 17l2 2 4-4" />
              </g>
            </svg>
          }
          registerProps={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          enterKeyHint="go"
          showToggle={true}
        />
      </fieldset>

      {serverError && (
        <p className="text-error" role="alert">
          {serverError}
        </p>
      )}

      <div className="text-xs my-1 opacity-75">
        By signing up, you agree to our{" "}
        <Link href="/privacy" className="link link-primary underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms-of-service" className="link link-primary underline">
          Terms of Service
        </Link>
        .
      </div>

      <SubmitButton
        isLoading={isSubmitting}
        text="Sign up"
        loadingText="Signing up..."
      />
    </form>
  );
}
