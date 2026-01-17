import { signOut } from "next-auth/react";

export function useSignout() {
  return async (e?: React.MouseEvent) => {
    if (e?.preventDefault) e.preventDefault();
    sessionStorage.removeItem("post-auth-toast-shown");
    await signOut({ callbackUrl: "/signin" });
  };
}
