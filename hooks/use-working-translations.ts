"use client";

import { useCallback, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";

const messageMap = {
  en: enMessages,
  es: esMessages,
};

function getLocaleFromUrl(): string {
  if (typeof window !== "undefined") {
    const urlPath = window.location.pathname;
    if (urlPath.startsWith('/es')) return 'es';
    if (urlPath.startsWith('/en')) return 'en';
  }
  return 'en';
}

// Hydration-safe translation hook
export function useWorkingTranslations(namespace: string) {
  const serverLocale = useLocale(); // Use server locale initially
  const [isHydrated, setIsHydrated] = useState(false);

  // After hydration, detect client-side locale changes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return useCallback((key: string) => {
    // Use server locale during SSR/initial hydration, then switch to URL-based
    const currentLocale = isHydrated ? getLocaleFromUrl() : serverLocale;
    const messages = messageMap[currentLocale as keyof typeof messageMap];
    
    // Navigate to the correct namespace and key
    const keys = key.split('.');
    let value: any = (messages as any)[namespace];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }, [namespace, serverLocale, isHydrated]);
}