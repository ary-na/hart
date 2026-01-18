// src/lib/config/metadata.ts

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "H♡ART",
    template: "%s | H♡ART",
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
