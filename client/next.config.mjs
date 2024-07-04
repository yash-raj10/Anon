/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com", "avatars.githubusercontent.com"],
    unoptimized: true,
  },
};

export default nextConfig;
