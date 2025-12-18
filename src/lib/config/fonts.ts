// src/lib/config/fonts.ts

import { Playfair_Display, Inter } from "next/font/google";

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const secondary = Playfair_Display({
  variable: "--font-secondary",
  subsets: ["latin"],
  display: "swap",
});

export const fontClassName = `
  ${primary.variable}
  ${secondary.variable}
  antialiased
`.trim();
