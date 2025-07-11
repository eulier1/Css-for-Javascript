"use client"

import { useLocale } from "next-intl";

export function DevDebug() {
  const currentLocale = useLocale();
  const isDebug = process.env.NEXT_PUBLIC_DEBUG_I18N === 'true';
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;

  if (!isDebug) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded-lg z-50">
      <div>🌍 Current Locale: {currentLocale}</div>
      <div>⚙️ Environment: {appEnv}</div>
      <div>🔧 Debug Mode: ON</div>
    </div>
  );
}
