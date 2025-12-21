// src/server/auth/getCurrentUser.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./nAuth";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
};
