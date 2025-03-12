import type { NextConfig } from 'next';
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${API_URL}/:path*`, // 프록시할 URL
  //     },
  //   ];
  // },
};

export default nextConfig;
