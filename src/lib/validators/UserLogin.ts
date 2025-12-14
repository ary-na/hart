// src/lib/schemas/UserLogin.ts

// Zod import
import { z } from "zod";

export const userLoginSchema = z.object({
  username: z.string().min(3, { message: "Username is required." }),

  password: z.string().min(8, { message: "Password is required." }),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;
