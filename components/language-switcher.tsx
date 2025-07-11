"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  GalleryVerticalEnd,
  Languages,
} from "lucide-react";
import { useLocale } from "next-intl";
import { useWorkingTranslations } from "@/hooks/use-working-translations";
import { usePathname, Link } from "@/src/i18n/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const locales = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
];

export function LanguageSwitcher() {
  const t = useWorkingTranslations("Navigation");
  const hookLocale = useLocale(); // This might be stale
  const pathname = usePathname(); // Should return path without locale prefix

  // Extract actual locale from URL as source of truth
  const getActualLocale = () => {
    if (typeof window !== "undefined") {
      const urlPath = window.location.pathname;
      const localeFromUrl = locales.find(locale => 
        urlPath.startsWith(`/${locale.code}`)
      )?.code;
      return localeFromUrl || 'en';
    }
    return hookLocale;
  };

  const currentLocale = getActualLocale();
  const currentLocaleData = locales.find((locale) => locale.code === currentLocale) || locales[0];

  // Force re-render when locale changes
  const [renderKey, setRenderKey] = React.useState(0);
  
  React.useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [currentLocale]);

  // According to next-intl docs, usePathname should return locale-free path
  // If it doesn't, we need to extract it manually from the current URL
  const getCurrentPath = (pathname: ReturnType<typeof usePathname>) => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      // Remove locale prefix from current URL path
      const localePattern = new RegExp(
        `^/(${locales.map((l) => l.code).join("|")})`
      );
      return currentPath.replace(localePattern, "") || "/";
    }
    return pathname;
  };

  const safePath = getCurrentPath(pathname);


  return (
    <SidebarMenu key={renderKey}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{t("title")}</span>
                <div className="flex items-center gap-1">
                  <Languages className="size-3" />
                  <span className="text-xs">{currentLocaleData.name}</span>
                </div>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {locales.map((locale) => (
              <DropdownMenuItem key={locale.code} asChild>
                <Link
                  href={safePath}
                  locale={locale.code}
                  className="flex w-full items-center justify-between"
                >
                  <span>{locale.name}</span>
                  {locale.code === currentLocale && (
                    <Check className="ml-auto" />
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
