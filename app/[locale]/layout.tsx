import { Toaster } from 'react-hot-toast'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import LocalFont from 'next/font/local'
import './globals.css'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from '@/components/Theme/providers'
import { Inter, Poppins, Bricolage_Grotesque } from 'next/font/google'
import { TailwindIndicator } from '@/components/Theme/tailwind-indicator'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, useMessages } from 'next-intl'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext', 'devanagari'],
  variable: '--font-pops'
})

const bricol = Bricolage_Grotesque({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bricol'
})

const calSans = LocalFont({
  src: '../../public/fonts/CalSans-SemiBold.ttf',
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
  params: { locale: string }
}

export default function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'font-san antialiased scroll-smooth font-bricol transition-transform duration-1000',
          GeistSans.variable,
          GeistMono.variable,
          inter.variable,
          calSans.variable,
          poppins.variable,
          bricol.variable,
          `
          ${
            process.env.NODE_ENV === 'development' ? 'debug-screens' : undefined
          }`
        )}
      >
        <NextIntlClientProvider locale={locale}>
          {' '}
          <Toaster />
          <TailwindIndicator />
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <main className="flex flex-col flex-1 dark:bg-[#020817] bg-muted/20">
                {children}
              </main>{' '}
              <Analytics />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
