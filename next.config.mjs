/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Bỏ tối ưu ảnh của Next ở môi trường dev để tránh lỗi 404 từ _next/image
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;

