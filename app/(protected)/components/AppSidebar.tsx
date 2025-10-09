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
  Building2,
  LogOut
} from 'lucide-react'
import { useSignOut } from '@/queries/auth'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/Spinner'

export default function AppSideBar() {
  const pathname = usePathname()
  const signOut = useSignOut()
  const router = useRouter()

  const items = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Citas', url: '/dashboard/citas', icon: CalendarDays },
    { title: 'Miembros', url: '/dashboard/miembros', icon: Users },
    { title: 'Servicios', url: '/dashboard/servicios', icon: Briefcase },
    { title: 'Clientes', url: '/dashboard/clientes', icon: Handshake },
    { title: 'Perfil', url: '/dashboard/perfil', icon: UserCircle },
    { title: 'Organización', url: '/dashboard/organizacion', icon: Building2 }
  ]

  const handleLogOut = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        router.push('/sign-in')
      }
    })
  }

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
              <SidebarMenuItem key="Cerrar Sesión">
                <SidebarMenuButton
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-base text-gray-700 transition-colors hover:bg-red-500 hover:text-white"
                  onClick={handleLogOut}
                  disabled={signOut.isPending}
                >
                  {signOut.isPending ? <Spinner /> : <LogOut className="h-5 w-5" />}
                  <span>Cerrar Sesión</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
