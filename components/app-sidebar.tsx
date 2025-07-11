"use client"

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { SearchForm } from "./search-form";
import { VersionSwitcher } from "./version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Version data
const data = {
  versions: ["0.0.1"],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations('Navigation');
  
  // Dynamic navigation structure with translations
  const navMain = [
    {
      titleKey: "modules.module1",
      url: "/introduction",
      items: [
        {
          titleKey: "modules.introduction",
          url: "/introduction",
        },
      ],
    },
    {
      titleKey: "modules.module2",
      url: "#",
      items: [
        {
          titleKey: "modules.comingSoon",
          url: "#",
        },
      ],
    },
    {
      titleKey: "modules.module3",
      url: "#",
      items: [
        {
          titleKey: "modules.comingSoon",
          url: "#",
        },
      ],
    },
    {
      titleKey: "modules.module4",
      url: "#",
      items: [
        {
          titleKey: "modules.comingSoon",
          url: "#",
        },
      ],
    },
    {
      titleKey: "modules.module5",
      url: "#",
      items: [
        {
          titleKey: "modules.comingSoon",
          url: "#",
        },
      ],
    },
    {
      titleKey: "modules.module6",
      url: "#",
      items: [
        {
          titleKey: "modules.comingSoon",
          url: "#",
        },
      ],
    },
    {
      titleKey: "modules.module7",
      url: "#",
      items: [
        {
          titleKey: "modules.comingSoon",
          url: "#",
        },
      ],
    },
    {
      titleKey: "modules.module8",
      url: "#",
      items: [
        {
          titleKey: "modules.comingSoon",
          url: "#",
        },
      ],
    },
    {
      titleKey: "modules.module9",
      url: "#",
      items: [
        {
          titleKey: "modules.comingSoon",
          url: "#",
        },
      ],
    },
    {
      titleKey: "modules.module10",
      url: "#",
      items: [
        {
          titleKey: "modules.comingSoon",
          url: "#",
        },
      ],
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {navMain.map((item) => (
          <SidebarGroup key={item.titleKey}>
            <SidebarGroupLabel>{t(item.titleKey)}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.titleKey}>
                    <SidebarMenuButton asChild isActive={subItem.url === "/introduction"}>
                      {subItem.url === "#" ? (
                        <span className="cursor-not-allowed opacity-50">{t(subItem.titleKey)}</span>
                      ) : (
                        <Link href={subItem.url}>{t(subItem.titleKey)}</Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
