// src/hooks/useSignin.ts
"use client";

import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSigninSchema, UserSigninInput } from "@hart/lib/validators";

type UseSigninReturn = {
  form: ReturnType<typeof useForm<UserSigninInput>>;
  onSubmit: (data: UserSigninInput) => Promise<void>;
  isSubmitting: boolean;
  serverError: string | null;
  resetServerError: () => void;
};

export const useSignin = (): UseSigninReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<UserSigninInput>({
    resolver: zodResolver(userSigninSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = useCallback(async (data: UserSigninInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }
    } catch (err) {
      const e = err instanceof Error ? err : new Error("Sign in failed");
      setServerError(e.message);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

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
