/** @type {import('next-translate').LoaderConfig} */
module.exports = {
  defaultLocale: 'en',
  locales: ['en', 'ar'],
  extensionsRgx: /\.page\.(tsx|ts|js|mjs|jsx)$/,
  pages: {
    '*': ['layout', 'common'],
  },
};
