"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import AuthModal from "@hart/components/auth/AuthModal";

type AuthModalContextValue = {
  open: boolean;
  openAuth: () => void;
  closeAuth: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | undefined>(
  undefined
);
AuthModalContext.displayName = "AuthModalContext";

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openAuth = useCallback(() => {
    setOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ open, openAuth, closeAuth }),
    [open, openAuth, closeAuth]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal />
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = (): AuthModalContextValue => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};

export default AuthModalProvider;
