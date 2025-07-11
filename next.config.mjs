import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isExport = process.env.BUILD_EXPORT === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isExport ? 'export' : undefined,
  trailingSlash: isExport ? true : false, // Only use trailing slash in production
  assetPrefix: !isExport ? undefined : undefined, // Keep assets at root level
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig);
