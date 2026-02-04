// src/lib/validators/UpdateAddress.ts

import { z } from "zod";

export const updateAddressSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().optional(),
  street: z.string().min(1, { message: "Street is required." }),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().optional(),
  postCode: z.string().min(1, { message: "Post code is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  phone: z.string().optional(),
});

export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
