import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

const isExport = process.env.BUILD_EXPORT === 'true';
const isDev = process.env.ENABLE_MIDDLEWARE === 'true';
 
export default getRequestConfig(async ({locale}) => {
  // Handle undefined locale (use default)
  if (!locale) {
    locale = routing.defaultLocale;
  }
  
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    // Only call notFound in development, not during static export
    if (isDev) {
      notFound();
    }
    // For static export, use default locale
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
