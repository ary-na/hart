// src/hooks/useSignout.ts

import { signOut } from "next-auth/react";

export const useSignout = () => {
  return async (e?: React.MouseEvent) => {
    if (e?.preventDefault) e.preventDefault();
    sessionStorage.removeItem("welcome-toast-shown");
    sessionStorage.setItem("signed-out-toast", "1");
    await signOut({ redirectTo: "/signin" });
  };
};
