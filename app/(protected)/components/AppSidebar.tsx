'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Briefcase,
  UserCircle,
  Handshake,
  Building2
} from 'lucide-react'

export default function AppSideBar() {
  const pathname = usePathname()

  const items = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Citas', url: '/dashboard/citas', icon: CalendarDays },
    { title: 'Empleados', url: '/dashboard/empleados', icon: Users },
    { title: 'Servicios', url: '/dashboard/servicios', icon: Briefcase },
    { title: 'Clientes', url: '/dashboard/clientes', icon: Handshake },
    { title: 'Perfil', url: '/dashboard/perfil', icon: UserCircle },
    { title: 'Organización', url: '/dashboard/organizacion', icon: Building2 }
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-base transition-colors ${
                        pathname === item.url
                          ? 'bg-purple-500 font-semibold text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
