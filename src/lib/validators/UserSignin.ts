// src/lib/schemas/UserSignin.ts

import { z } from "zod";

const nonEmptyEmail = z.string().min(1, { message: "Email is required." });

export const userSigninSchema = z.object({
  email: z
    .union([nonEmptyEmail])
    .refine((val) => val === "" || z.email().safeParse(val).success, {
      message: "Please enter a valid email address.",
    }),

  password: z.string().min(8, { message: "Password is required." }),
});

export type UserSigninInput = z.infer<typeof userSigninSchema>;
