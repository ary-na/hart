// src/components/LoginForm.tsx

"use client";

// React and library imports
import { useState } from "react";
import { useForm } from "react-hook-form";

// Zod resolver import
import { zodResolver } from "@hookform/resolvers/zod";

// Next.js import
import { useRouter } from "next/navigation";

// NextAuth import
import { signIn } from "next-auth/react";

// Utility and schema imports
import { cn } from "@hart/lib/utils";
import { FormField, SubmitButton } from "@hart/lib/ui";
import { userLoginSchema, UserLoginInput } from "@hart/lib/schemas";

export default function LoginForm() {
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
    router.refresh();
  });

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4"
      noValidate
    >
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
