"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuthModal } from "@hart/context/AuthModalContext";

const AuthQueryOpener = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { openAuth } = useAuthModal();

  useEffect(() => {
    if (searchParams.get("auth") !== "signin") return;

    openAuth();
    const next = new URLSearchParams(searchParams.toString());
    next.delete("auth");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [openAuth, pathname, router, searchParams]);

  return null;
};

export default AuthQueryOpener;
