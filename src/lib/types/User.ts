export type UserRole = "admin" | "user";

export type Address = {
  street?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
};

export type User = {
  id: string;
  username: string;
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
