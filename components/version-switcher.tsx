"use client"

import * as React from "react"
import { Check, ChevronsUpDown, GalleryVerticalEnd, Languages } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { usePathname, useRouter } from "@/src/i18n/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const locales = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
];

export function VersionSwitcher({
  versions,
  defaultVersion,
}: {
  versions: string[]
  defaultVersion: string
}) {
  const t = useTranslations('Navigation');
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocaleData = locales.find(locale => locale.code === currentLocale) || locales[0];

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <SidebarMenu>
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
                <span className="font-semibold">{t('title')}</span>
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
              <DropdownMenuItem
                key={locale.code}
                onSelect={() => handleLanguageChange(locale.code)}
              >
                <span>{locale.name}</span>
                {locale.code === currentLocale && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
