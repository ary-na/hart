// src/lib/validators/UserSignup.ts

import { z } from "zod";

const nonEmptyEmail = z.string().min(1, { message: "Email is required." });

export const userSignupSchema = z
  .object({
    email: z
      .union([nonEmptyEmail])
      .refine((val) => val === "" || z.email().safeParse(val).success, {
        message: "Please enter a valid email address.",
      }),
    password: z
      .string()
      .min(1, { message: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters." }),

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),

    firstName: z.string().min(1, { message: "First name is required." }),

    lastName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type UserSignupInput = z.infer<typeof userSignupSchema>;
