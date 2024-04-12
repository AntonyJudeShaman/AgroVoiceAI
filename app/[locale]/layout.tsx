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
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
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
    'AgroVoiceAI is a web app that helps farmers to get their queries resolved with our Chatbot. It also provides the latest market & weather updates and the ability to test soil conditions and detect pests.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest'
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
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AgroVoiceAI" />
        <meta
          property="og:description"
          content="AgroVoiceAI is a web app that helps farmers to get their queries resolved with our Chatbot. It also provides the latest market & weather updates and the ability to test soil conditions and detect pests."
        />
        <meta property="og:site_name" content="PWA App" />
        <meta property="og:url" content="https://agrovoiceai.vercel.app" />
        <meta
          property="og:image"
          content="https://agrovoiceai.vercel.app/apple-touch-icon.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://agrovoiceai.vercel.app" />
        <meta name="twitter:title" content="AgroVoiceAI" />
        <meta
          name="twitter:description"
          content="AgroVoiceAI is a web app that helps farmers to get their queries resolved with our Chatbot. It also provides the latest market & weather updates and the ability to test soil conditions and detect pests."
        />
        <meta
          name="twitter:image"
          content="https://agrovoiceai.vercel.app/android-chrome-192x192.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
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
            defaultTheme="dark"
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
