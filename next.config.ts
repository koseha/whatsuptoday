import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/scripts/**'],
    };

    // face-api.js 서버사이드 렌더링 문제 해결
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      encoding: false,
      path: false,
      crypto: false,
    };

    // TensorFlow.js 관련 설정
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
