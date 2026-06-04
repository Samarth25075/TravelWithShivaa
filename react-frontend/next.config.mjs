process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'https',
        hostname: 'travelwithshivaa.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'shiv-travel-backend.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'travelbookshiva.in',
      },
      {
        protocol: 'https',
        hostname: 'www.travelbookshiva.in',
      }
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    const defaultBackendUrl = process.env.NODE_ENV === 'production'
      ? 'https://travelwithshivaa.onrender.com/api'
      : 'http://localhost:8000/api';
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || defaultBackendUrl;
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig
