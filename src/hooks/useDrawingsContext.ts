// src/hooks/useDrawingsContext.ts

import { useContext } from "react";

import { UseDrawingsReturn } from "@hart/lib/types";
import { DrawingsContext } from "@hart/context";

export function useDrawingsContext(): UseDrawingsReturn {
  const context = useContext(DrawingsContext);
  if (!context) {
    throw new Error(
      "useDrawingsContext must be used within a DrawingsProvider"
    );
  }
  return context;
}
