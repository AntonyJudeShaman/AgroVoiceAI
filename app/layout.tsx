import { Toaster } from 'react-hot-toast'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import LocalFont from 'next/font/local'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Chat/chat-header'
import { Analytics } from '@vercel/analytics/react'
import { MovingButton } from '@/components/ui/moving-border'
import { Providers } from '@/components/Theme/providers'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext', 'devanagari'],
  variable: '--font-pops'
})

const calSans = LocalFont({
  src: '../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans'
})

export const metadata = {
  title: {
    default: 'AgroVoiceAI',
    template: `%s - AgroVoiceAI`
  },
  description:
    'An AI-powered chatbot for agriculture-related questions and answers.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased scroll-smooth dark:bg-black bg-white transition-transform duration-1000',
          GeistSans.variable,
          GeistMono.variable,
          inter.variable,
          calSans.variable,
          poppins.variable,
          `
          ${
            process.env.NODE_ENV === 'development' ? 'debug-screens' : undefined
          }`
        )}
      >
        <Toaster />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <main className="flex flex-col flex-1 bg-muted/50">{children}</main>{' '}
            <Analytics />
          </div>
        </Providers>
      </body>
    </html>
  )
}
