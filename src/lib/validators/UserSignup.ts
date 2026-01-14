// src/lib/validators/UserSignup.ts

import { z } from "zod";

const nonEmptyEmailSchema = z.string().min(1, { message: "Email is required" });

const passwordSchema = z
  .string()
  .min(1, { message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must include at least one number",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must include at least one lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must include at least one uppercase letter",
  });

export const userSignupSchema = z
  .object({
    email: z
      .union([nonEmptyEmailSchema])
      .refine((val) => val === "" || z.email().safeParse(val).success, {
        message: "Please enter a valid email address",
      }),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),

    firstName: z.string().min(1, { message: "First name is required" }),

    lastName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserSignupInput = z.infer<typeof userSignupSchema>;
