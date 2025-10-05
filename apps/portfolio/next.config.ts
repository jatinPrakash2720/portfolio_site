import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Enable SWC minification for faster builds
  swcMinify: true,

  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      '@radix-ui/react-tooltip',
    ],
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Tree shaking improvements
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    }

    // Split chunks for better caching
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk for node_modules
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk for shared code
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Separate chunk for icons
          icons: {
            name: 'icons',
            test: /[\\/]node_modules[\\/](react-icons|lucide-react)[\\/]/,
            chunks: 'all',
            priority: 30,
          },
        },
      }
    }

    return config
  },
}

export default nextConfig
