/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  productionBrowserSourceMaps: false,
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
};