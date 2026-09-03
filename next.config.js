/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'api.dicebear.com',
      'raw.githubusercontent.com',
      'images.unsplash.com',
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
