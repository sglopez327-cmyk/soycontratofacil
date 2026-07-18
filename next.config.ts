import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "date-fns"],
  },
  async redirects() {
    return [
      {
        source: "/articulos/modelo-contrato-alquiler-pdf-gratis",
        destination: "/articulos/plantilla-contrato-alquiler-pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
