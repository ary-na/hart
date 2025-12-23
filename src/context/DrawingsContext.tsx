// src/context/DrawingsContext.tsx

"use client";

import React, { createContext } from "react";

import { UseDrawingsReturn } from "@hart/lib/types";
import { useDrawings } from "@hart/hooks/useDrawings";

export const DrawingsContext = createContext<UseDrawingsReturn | undefined>(
  undefined
);
DrawingsContext.displayName = "DrawingsContext";

const DrawingsProvider = ({ children }: { children: React.ReactNode }) => {
  const drawingsData = useDrawings();

  return (
    <DrawingsContext.Provider value={drawingsData}>
      {children}
    </DrawingsContext.Provider>
  );
};

export default DrawingsProvider;
