import QueryProvider from '@/components/QueryProvider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
        <QueryProvider>
          <Toaster position="top-right" />
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  )
}
