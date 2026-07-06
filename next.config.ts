import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
