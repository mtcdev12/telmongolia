import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { headers } from 'next/headers'
import { Toaster } from "@/components/ui/toaster"
import SiteChrome from '@/components/site-chrome'

const font = Montserrat({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
  title: process.env.TITLE,
  description: process.env.DESC,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const requestHeaders = await headers()
  const locale = requestHeaders.get('x-site-locale') === 'en' ? 'en' : 'mn'

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${font.className} flex flex-col min-h-screen`}>
        <SiteChrome>{children}</SiteChrome>
        <Toaster />
      </body>
    </html>
  )
}
