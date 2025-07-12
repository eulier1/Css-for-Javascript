import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/src/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleRoot({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Enable static rendering for this locale
  setRequestLocale(locale);
  
  redirect(`/${locale}/introduction`);
}
