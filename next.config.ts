import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      "hart-portfolio-uploads.s3.ap-southeast-2.amazonaws.com"
    ],
  },
};

export default nextConfig;
