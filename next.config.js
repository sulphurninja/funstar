/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'image.tmdb.org',
      'via.placeholder.com',
      'imgs.search.brave.com'
    ],
  }
};

module.exports = nextConfig;
