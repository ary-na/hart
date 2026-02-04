export type UpdatePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type UpdateAddressPayload = {
  firstName: string;
  lastName?: string;
  street: string;
  city: string;
  state?: string;
  postCode: string;
  country: string;
  phone?: string;
};
