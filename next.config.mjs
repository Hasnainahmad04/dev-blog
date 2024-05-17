/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com", pathname: "/*" }],
  },
};

export default nextConfig;
