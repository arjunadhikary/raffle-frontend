/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  unoptimized: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
