import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/save-the-date",
        destination: "/#save-the-date",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
