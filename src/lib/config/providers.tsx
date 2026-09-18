// src/lib/config/providers.tsx

"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import AuthModalProvider from "@hart/context/AuthModalContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        forcedTheme="light"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <AuthModalProvider>{children}</AuthModalProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export { Providers };
