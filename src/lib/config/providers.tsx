"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import DrawingsProvider from "@hart/context/DrawingsContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <DrawingsProvider>{children}</DrawingsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export { Providers };
