// src/hooks/useCartContext.ts

import { useContext } from "react";
import { UseCartReturn } from "@hart/lib/types";
import { CartContext } from "@hart/context/CartContext";

export function useCartContext(): UseCartReturn {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
