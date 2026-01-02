// src/server/auth/redirect.ts

import type { SessionUser } from "@hart/lib/types";

export function getRedirectPath(user: SessionUser | null): string | null {
  if (!user) return null;

  switch (user.role) {
    case "admin":
      return "/admin";
    case "customer":
      return "/";
  }
}
