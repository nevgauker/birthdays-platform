import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@clerk/nextjs'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },

};

export default nextConfig;
