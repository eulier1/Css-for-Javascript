import * as React from "react";

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

// This is sample data.
const data = {
  versions: ["0.0.1"],
  navMain: [
    {
      title: "Module 1 - Intro",
      url: "/css-for-js-dev/introduction",
      items: [
        {
          title: "Introduction",
          url: "/css-for-js-dev/introduction",
        },
      ],
    },
    {
      title: "Module 2 - Recap Fundamentals",
      url: "#",
      items: [
        {
          title: "Coming Soon",
          url: "#",
        },
      ],
    },
    {
      title: "Module 3 - Rendering Logic",
      url: "#",
      items: [
        {
          title: "Coming Soon",
          url: "#",
        },
      ],
    },
    {
      title: "Module 4",
      url: "#",
      items: [
        {
          title: "Coming Soon",
          url: "#",
        },
      ],
    },
    {
      title: "Module 5",
      url: "#",
      items: [
        {
          title: "Coming Soon",
          url: "#",
        },
      ],
    },
    {
      title: "Module 6",
      url: "#",
      items: [
        {
          title: "Coming Soon",
          url: "#",
        },
      ],
    },
    {
      title: "Module 7",
      url: "#",
      items: [
        {
          title: "Coming Soon",
          url: "#",
        },
      ],
    },
    {
      title: "Module 8",
      url: "#",
      items: [
        {
          title: "Coming Soon",
          url: "#",
        },
      ],
    },
    {
      title: "Module 9",
      url: "#",
      items: [
        {
          title: "Coming Soon",
          url: "#",
        },
      ],
    },
    {
      title: "Module 10",
      url: "#",
      items: [
        {
          title: "Coming Soon",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
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
