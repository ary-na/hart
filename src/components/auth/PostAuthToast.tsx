// src/components/auth/PostAuthToast.tsx

"use client";

import { useEffect } from "react";
import { useCurrentUser, useToast } from "@hart/hooks";

const TOAST_KEY = "post-auth-toast-shown";

const PostAuthGate = () => {
  const { user, isAuthenticated } = useCurrentUser();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (sessionStorage.getItem(TOAST_KEY)) return;

    showToast(`Welcome ${user.firstName || "back"} 👋`, "success");

    sessionStorage.setItem(TOAST_KEY, "true");
  }, [isAuthenticated, user, showToast]);

  return null;
};

export default PostAuthGate;
