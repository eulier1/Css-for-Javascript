import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use Next.js 15 automatic static optimization instead of manual export
  // This provides better i18n integration and eliminates warnings
  images: {
    unoptimized: true, // Keep for static hosting compatibility
  },
};

export default withNextIntl(nextConfig);
