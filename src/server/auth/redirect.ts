// src/server/auth/redirect.ts

import type { User } from "@hart/lib/types";

export function getRedirectPath(user: User | null): string | null {
  if (!user) return null;

  switch (user.role) {
    case "admin":
      return "/admin";
    case "customer":
      return "/";
  }
}
