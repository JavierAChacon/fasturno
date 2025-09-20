'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './components/AppSidebar'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const getSession = async () => {
      const supabase = createClient()

      const {
        data: { session }
      } = await supabase.auth.getSession()
      if (!session) {
        redirect('/login')
      }
    }
    getSession()
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
