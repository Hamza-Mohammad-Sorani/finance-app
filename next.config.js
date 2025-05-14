const nextTranslate = require('next-translate-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'api.ts'],
  reactStrictMode: true,
};

module.exports = nextTranslate(nextConfig);
