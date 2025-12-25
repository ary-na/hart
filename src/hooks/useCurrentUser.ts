// src/hooks/useCurrentUser.ts
"use client";

import { useSession } from "next-auth/react";
import type { User } from "@hart/lib/types";

export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user as User | null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    isUnauthenticated: status === "unauthenticated",
  };
};
