import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import "../globals.css";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { DevDebug } from "@/components/dev-debug";
import { routing } from '@/src/i18n/routing';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  
  return {
    title: t('title'),
    description: t('description'),
    generator: "v0.dev",
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  
  // Validate locale and enable static rendering
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  // Enable static rendering for this locale
  setRequestLocale(locale);
  
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} timeZone="UTC">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbNav />
              </header>
              {children}
            </SidebarInset>
          </SidebarProvider>
          <DevDebug />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
