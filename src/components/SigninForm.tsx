// src/components/SigninForm.tsx

"use client";

import { useState } from "react";
import { cn } from "@hart/lib/utils";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, SubmitButton } from "@hart/lib/ui";
import { userLoginSchema, UserLoginInput } from "@hart/lib/validators";

export default function SigninForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({
    resolver: zodResolver(userLoginSchema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.error) {
      setError("Invalid username or password");
      return;
    }

    router.push("/admin");
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <FormField label="Username" error={errors.username?.message}>
        <input
          {...register("username")}
          type="text"
          placeholder="Enter your username..."
          className={cn("input w-full", errors.username && "input-error")}
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
        text="Login"
        loadingText="Logging in..."
      />
    </form>
  );
}
