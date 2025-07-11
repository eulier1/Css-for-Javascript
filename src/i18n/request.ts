import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

const isExport = process.env.BUILD_EXPORT === 'true';
const isDev = process.env.NODE_ENV === 'development';
 
export default getRequestConfig(async ({locale}) => {
  // Handle undefined locale (use default)
  if (!locale) {
    locale = routing.defaultLocale;
  }
  
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    // Only call notFound in development with middleware, not during static export
    if (isDev && !isExport) {
      notFound();
    }
    // For static export or invalid locale, use default locale
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'UTC' // Add default timezone to prevent hydration warnings
  };
});
