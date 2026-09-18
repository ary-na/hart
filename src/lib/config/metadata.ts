// src/lib/config/metadata.ts

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "H♡ART",
    template: "%s | H♡ART",
  },
  description: "",
  metadataBase: new URL("https://hildart.vercel.app"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    images: "/og-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
  },
};
