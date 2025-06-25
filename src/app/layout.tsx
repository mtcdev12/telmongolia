import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Navbar from './navbar'
import Topbar from './topbar'
import Footer from './footer'
import { Toaster } from "@/components/ui/toaster"
import Feedback from '@/components/feedback'
import Chatbot from '@/components/chatbot'
import FacebookMessenger from '@/components/facebookMessenger'

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
    <html lang="en">
      <body className={`${font.className} flex flex-col min-h-screen`}>
        <Topbar />
        <Navbar />
        <main className='grow'>
          {children}
          {
            (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? false : <FacebookMessenger />
          }
        </main>
        <Feedback />
        <div className='fixed right-20 bottom-20'>
          <Chatbot />
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
