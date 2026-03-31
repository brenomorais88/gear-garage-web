import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-55f733f017554a599e9d6645ac69fcba.r2.dev",
      },
    ],
  },
};

export default nextConfig;
