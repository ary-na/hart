export type UserRole = "admin" | "customer";

export type SessionUser = {
  id: string;
  email: string;
  firstName: string;
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
