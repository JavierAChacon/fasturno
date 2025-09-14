"use client";
import { CalendarDays, HomeIcon, Users2, ClipboardList } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Citas",
    url: "/dashboard/citas",
    icon: CalendarDays,
  },
  {
    title: "Empleados",
    url: "/dashboard/empleados",
    icon: Users2,
  },
];

const profile = {
  name: "Juan Pérez",
  url: "/dashboard/perfil",
  avatar: "/avatars/profile.jpg",
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                console.log(item.url, pathname);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-4 px-4 py-4 text-lg rounded-lg transition-all duration-150
                          ${
                            pathname === item.url
                              ? "bg-purple-500 text-white font-bold"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                      >
                        <item.icon className="w-8 h-8" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto px-4 pb-6">
          <Link href={profile.url} className="flex items-center gap-3">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={48}
              height={48}
              className="rounded-full border border-gray-300 object-cover"
            />
            <span className="font-medium text-lg">{profile.name}</span>
          </Link>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
