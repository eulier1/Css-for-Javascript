"use client";

import { NextIntlClientProvider } from 'next-intl';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Load messages dynamically
async function loadMessages(locale: string) {
  const messages = await import(`@/messages/${locale}.json`);
  return messages.default;
}

// Minimal wrapper to force provider re-render on locale changes
export function ProviderWrapper({ children, messages: serverMessages, locale }: { 
  children: React.ReactNode; 
  messages: any; 
  locale: string; 
}) {
  const [key, setKey] = useState(0);
  const [currentMessages, setCurrentMessages] = useState(serverMessages);
  const pathname = usePathname();
  
  // Extract current locale from URL
  const currentLocale = pathname.startsWith('/es') ? 'es' : 'en';
  
  // Load correct messages when locale changes
  useEffect(() => {
    loadMessages(currentLocale).then(messages => {
      setCurrentMessages(messages);
      setKey(k => k + 1);
    });
  }, [currentLocale]);
  
  return <NextIntlClientProvider key={key} messages={currentMessages} locale={currentLocale} timeZone="UTC">{children}</NextIntlClientProvider>;
}