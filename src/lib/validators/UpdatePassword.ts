import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Current password is required."),
    newPassword: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
