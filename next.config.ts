import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
}

export default nextConfig