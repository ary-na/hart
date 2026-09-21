"use client";

import { useId } from "react";
import { AppModal } from "@hart/lib/ui";
import { useAuthModal } from "@hart/context/AuthModalContext";
import SigninForm from "./SigninForm";

const AuthModal = () => {
  const { open, closeAuth } = useAuthModal();
  const titleId = useId();

  return (
    <AppModal
      open={open}
      onClose={closeAuth}
      labelledBy={titleId}
      className="max-w-md border border-[#d9cfc3] bg-[#faf8f5] text-[#3d342c] shadow-none"
    >
      <div className="flex flex-col gap-5">
        <header>
          <p className="h-kicker">Studio</p>
          <h2 id={titleId} className="mt-2 text-3xl">
            Sign in
          </h2>
          <p className="mt-2 text-sm leading-relaxed opacity-80">
            Admin access for the studio.
          </p>
        </header>
        <SigninForm />
      </div>
    </AppModal>
  );
};

export default AuthModal;
