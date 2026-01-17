// src/components/auth/PostAuthRedirect.tsx

"use client";

import { useEffect, useRef } from "react";
import { useCurrentUser } from "@hart/hooks";
import { usePathname, useRouter } from "next/navigation";

const PostAuthRedirect = () => {
  const { user, isAuthenticated } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  const redirected = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!user) return;
    if (redirected.current) return;

    // Avoid redirecting if already in the right area
    if (user.role === "admin" && pathname.startsWith("/admin")) {
      redirected.current = true;
      return;
    }

    if (user.role === "customer" && pathname.startsWith("/user")) {
      redirected.current = true;
      return;
    }

    redirected.current = true;

    if (user.role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/");
    }
  }, [isAuthenticated, user, pathname, router]);

  return null;
}

export default PostAuthRedirect;
