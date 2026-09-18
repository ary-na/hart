// src/components/auth/PostAuthToast.tsx

"use client";

import { useEffect } from "react";
import { useCurrentUser, useToast } from "@hart/hooks";

const TOAST_KEY = "welcome-toast-shown";

const WelcomeToast = () => {
  const { user, isAuthenticated } = useCurrentUser();
  const { showToast } = useToast();

  useEffect(() => {
    if (sessionStorage.getItem("signed-out-toast")) {
      showToast("We hope to see you again soon.", "info");
      sessionStorage.removeItem("signed-out-toast");
    }
  }, [showToast]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (sessionStorage.getItem(TOAST_KEY)) return;

    showToast(`Welcome ${user.firstName || "back"}`, "success");

    sessionStorage.setItem(TOAST_KEY, "true");
  }, [isAuthenticated, user, showToast]);

  return null;
};

export default WelcomeToast;
