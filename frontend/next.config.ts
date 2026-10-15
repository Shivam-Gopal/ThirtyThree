import type { NextConfig } from "next";

// The "@/..." import alias is defined in tsconfig.json (paths), which both
// Turbopack and webpack read automatically, so no custom webpack hook is needed.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        // media files never change name -> cache them hard so repeat visits are instant
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
