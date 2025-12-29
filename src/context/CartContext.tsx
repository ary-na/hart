// src/context/CartContext.tsx

"use client";

import React, { createContext } from "react";
import { useCart } from "@hart/hooks/useCart";
import { UseCartReturn } from "@hart/lib/types";

export const CartContext = createContext<UseCartReturn | undefined>(undefined);
CartContext.displayName = "CartContext";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cartData = useCart();

  return (
    <CartContext.Provider value={cartData}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
