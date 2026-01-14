// src/hooks/useSignup.ts
"use client";
import { useToast } from "./useToast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignupSchema, UserSignupInput } from "@hart/lib/validators";

export interface UseSignupReturn {
  form: ReturnType<typeof useForm<UserSignupInput>>;
  onSubmit: (data: UserSignupInput) => Promise<void>;
  isSubmitting: boolean;
  serverError: string | null;
  resetServerError: () => void;
}

export const useSignup = (): UseSignupReturn => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<UserSignupInput>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: UserSignupInput): Promise<void> => {
      setIsSubmitting(true);
      setServerError(null);

      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok) {
          if (result.errors) {
            Object.entries(result.errors).forEach(([field, messages]) => {
              form.setError(field as keyof UserSignupInput, {
                type: "server",
                message: Array.isArray(messages) ? messages[0] : messages,
              });
            });
          }
          throw new Error(result.message || `Signup failed (${res.status})`);
        }

        router.push("/signin");
        showToast(
          "Account created! We've sent a verification email. Please check your inbox to activate your account.",
          "success",
          8000
        );
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        console.error("useSignup.onSubmit:", e);
        setServerError(e.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, router, showToast]
  );

  const resetServerError = useCallback(() => {
    setServerError(null);
  }, []);

  return {
    form,
    onSubmit,
    isSubmitting,
    serverError,
    resetServerError,
  };
};
