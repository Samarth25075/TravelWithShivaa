/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
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
