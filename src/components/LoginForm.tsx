"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { cn } from "@harts/lib/utils";
import { FormField, SubmitButton } from "@harts/lib/ui";
import { userLoginSchema, UserLoginInput } from "@harts/lib/schemas";

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
    <form onSubmit={onSubmit} className={cn("grid gap-8 rounded-xl border md:p-10 p-6", Object.keys(errors).length > 0 && "border-error")} noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Username" error={errors.username?.message}>
          <input {...register("username")} type="text" placeholder="Enter your username..." className={cn("input w-full", errors.username && "input-error")} disabled={isLoading} />
        </FormField>
        <FormField label="Password" error={errors.password?.message}>
          <input {...register("password")} type="password" placeholder="Enter your password..." className={cn("input w-full", errors.password && "input-error")} disabled={isLoading} />
        </FormField>
      </div>
      {error && <p className="text-error text-center mt-2">{error}</p>}
      <SubmitButton isLoading={isLoading} text="Login" loadingText="Logging in..." />
    </form>
  );
}
