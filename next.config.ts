import type { NextConfig } from 'next';
import { RemotePattern } from 'next/dist/shared/lib/image-config';

import { env } from './env.mjs';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const domainImages: RemotePattern[] = process.env.NEXT_PUBLIC_IMAGE_DOMAINS
  ? process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',').map((domain) => ({
      protocol: 'https',
      hostname: domain.trim(),
      pathname: '/**',
    }))
  : [];

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  basePath,
  assetPrefix: basePath || undefined,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      ...domainImages,
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: env.ANALYZE,
});

export default env.ANALYZE ? withBundleAnalyzer(nextConfig) : nextConfig;
