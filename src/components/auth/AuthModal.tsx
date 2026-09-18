"use client";

import { AppModal } from "@hart/lib/ui";
import { useAuthModal } from "@hart/context/AuthModalContext";
import SigninForm from "./SigninForm";

const AuthModal = () => {
  const { open, closeAuth } = useAuthModal();

  return (
    <AppModal
      open={open}
      onClose={closeAuth}
      className="max-w-md border border-[#d9cfc3] bg-[#faf8f5] text-[#3d342c] shadow-none"
    >
      <div className="flex flex-col gap-5">
        <header>
          <p className="text-xs uppercase tracking-[0.35em] text-[#e8a4a8]">
            Studio
          </p>
          <h2 className="mt-2 text-3xl">Sign in</h2>
          <p className="mt-2 text-sm leading-relaxed opacity-70">
            Admin access for the studio.
          </p>
        </header>
        <SigninForm />
      </div>
    </AppModal>
  );
};

export default AuthModal;
