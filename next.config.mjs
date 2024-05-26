/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com", pathname: "/*" }],
  },
  experimental: { reactCompiler: true },
};

export default nextConfig;
