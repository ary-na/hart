import { useForm } from "react-hook-form";
import { UserSignupInput } from "../validators";

export type UserRole = "admin" | "customer";

export type SessionUser = {
  id: string;
  email: string;
  role: UserRole;
};

export type Address = {
  street?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
};

export type User = {
  id: string;
  email: string;
  role: UserRole;

  firstName: string;
  lastName?: string;
  avatarName?: string;
  bio?: string;

  shippingAddress?: Address;

  paymentCustomerId?: string;

  purchases?: string[];

  createdAt?: string;
  updatedAt?: string;
};

export interface UseSignupReturn {
  form: ReturnType<typeof useForm<UserSignupInput>>;
  onSubmit: (data: UserSignupInput) => Promise<void>;
  isSubmitting: boolean;
  serverError: string | null;
  resetServerError: () => void;
}
