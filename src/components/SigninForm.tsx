// src/components/SigninForm.tsx

"use client";

import { useState } from "react";
import { cn } from "@hart/lib/utils";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, SubmitButton } from "@hart/lib/ui";
import { userSigninSchema, UserSigninInput } from "@hart/lib/validators";

export default function SigninForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSigninInput>({
    resolver: zodResolver(userSigninSchema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <FormField label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="text"
          placeholder="Enter your email..."
          className={cn("input w-full", errors.email && "input-error")}
          disabled={isLoading}
        />
      </FormField>
      <FormField label="Password" error={errors.password?.message}>
        <input
          {...register("password")}
          type="password"
          placeholder="Enter your password..."
          className={cn("input w-full", errors.password && "input-error")}
          disabled={isLoading}
        />
      </FormField>

      {error && <p className="text-error text-center mt-2">{error}</p>}
      <SubmitButton
        isLoading={isLoading}
        text="Sign in"
        loadingText="Signing in..."
      />
    </form>
  );
}
