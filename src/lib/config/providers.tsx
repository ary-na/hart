"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import CartProvider from "@hart/context/CartContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export { Providers };
