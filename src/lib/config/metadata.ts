// src/lib/config/metadata.ts

// Next.js type imports
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Hart",
    template: "%s | Hart",
  },
  description: "",
  metadataBase: new URL("https://hildart.vercel.app"),
  openGraph: {
    images: "/og-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
  },
};
