import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import SiteChrome from '@/components/site-chrome'

const font = Montserrat({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
  title: process.env.TITLE,
  description: process.env.DESC,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={`${font.className} flex flex-col min-h-screen`}>
        <SiteChrome>{children}</SiteChrome>
        <Toaster />
      </body>
    </html>
  )
}
