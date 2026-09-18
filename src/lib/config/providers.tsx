// src/lib/config/providers.tsx

"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import CartProvider from "@hart/context/CartContext";

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
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export { Providers };
