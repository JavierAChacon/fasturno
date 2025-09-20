'use client'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from './components/AppSidebar'
import { useRouter } from 'next/navigation'
import { useGetSession } from '@/queries/auth'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useGetSession()
  const router = useRouter()

  if (!session && !isPending) {
    router.push('/sign-in')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen w-full">
        <SidebarTrigger className="absolute" />
        {children}
      </main>
    </SidebarProvider>
  )
}
