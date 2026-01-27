import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.AWS_S3_BUCKET_HOSTNAME || "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
