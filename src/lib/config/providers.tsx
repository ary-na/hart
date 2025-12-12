// src/lib/config/providers.tsx
"use client";

// Theme provider import
import { ThemeProvider } from "next-themes";

// NextAuth session provider import
import { SessionProvider } from "next-auth/react";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export { Providers };
