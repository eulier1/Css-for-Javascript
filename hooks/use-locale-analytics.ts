'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { trackLanguageSwitch } from '@/lib/analytics';

export const useLocaleAnalytics = () => {
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;
  const previousLocale = useRef<string | null>(null);
  
  useEffect(() => {
    // Skip tracking on initial page load (no previous locale)
    if (previousLocale.current === null) {
      previousLocale.current = currentLocale;
      return;
    }
    
    // Only track if locale actually changed
    if (previousLocale.current !== currentLocale) {
      trackLanguageSwitch({
        fromLocale: previousLocale.current,
        toLocale: currentLocale,
        currentPage: pathname,
      });
      
      // Update the previous locale for next comparison
      previousLocale.current = currentLocale;
    }
  }, [currentLocale, pathname]);
  
  // Manual tracking function for language selector components
  const trackLocaleChange = (fromLocale: string, toLocale: string) => {
    trackLanguageSwitch({
      fromLocale,
      toLocale,
      currentPage: pathname,
    });
  };
  
  return { trackLocaleChange };
};