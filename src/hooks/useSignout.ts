// src/hooks/useSignout.ts

import { useToast } from "./";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function useSignout() {
  const router = useRouter();
  const { showToast } = useToast();
  return async (e?: React.MouseEvent) => {
    if (e?.preventDefault) e.preventDefault();
    sessionStorage.removeItem("post-auth-toast-shown");
    await signOut({ redirect: false });
    showToast("We hope to see you again soon.", "info");
    router.replace("/signin");
  };
}
