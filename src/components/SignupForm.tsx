// src/components/SignupForm.tsx
"use client";

import { cn } from "@hart/lib/utils";
import { FormField, SubmitButton } from "@hart/lib/ui";
import { useSignup } from "@hart/hooks";

export default function SignupForm() {
  const { form, onSubmit, isSubmitting, serverError } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <FormField label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email..."
          className={cn("input w-full", errors.email && "input-error")}
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="First name" error={errors.firstName?.message}>
        <input
          {...register("firstName")}
          type="text"
          placeholder="Enter your first name..."
          className={cn("input w-full", errors.firstName && "input-error")}
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Last name (optional)" error={errors.lastName?.message}>
        <input
          {...register("lastName")}
          type="text"
          placeholder="Enter your last name..."
          className={cn("input w-full", errors.lastName && "input-error")}
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Password" error={errors.password?.message}>
        <input
          {...register("password")}
          type="password"
          placeholder="Create a password..."
          className={cn("input w-full", errors.password && "input-error")}
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Confirm password" error={errors.confirmPassword?.message}>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm your password..."
          className={cn("input w-full", errors.confirmPassword && "input-error")}
          disabled={isSubmitting}
        />
      </FormField>

      {serverError && (
        <p className="text-error text-center mt-2">{serverError}</p>
      )}

      <SubmitButton
        isLoading={isSubmitting}
        text="Create account"
        loadingText="Creating account..."
      />
    </form>
  );
}
