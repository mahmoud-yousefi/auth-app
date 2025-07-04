import type { NextConfig } from "next";

// next.config.js
const isProd = process.env.NODE_ENV === 'production';
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/auth-app' : '',
  assetPrefix: isProd ? '/auth-app/' : '',
  images: { unoptimized: true },
  reactStrictMode: true,
};
module.exports = nextConfig;
