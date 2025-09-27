'use client'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from './components/AppSidebar'
import { useRouter } from 'next/navigation'
import { useGetSession } from '@/queries/auth'
import { useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useGetSession()
  const router = useRouter()

  useEffect(() => {
    if (!session && !isPending) {
      router.replace('/sign-in')
    }
  }, [session, isPending, router])

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
