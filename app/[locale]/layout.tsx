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
import { Metadata, Viewport } from 'next'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://agrovoiceai.vercel.app/en'),
  title: {
    default: 'AgroVoiceAI',
    template: `%s - AgroVoiceAI`
  },
  description:
    'AgroVoiceAI your one-stop solution for all your farming needs. Get the latest market & weather updates, test soil conditions, detect pests, and get your queries resolved with our Chatbot.',
  icons: {
    icon: '/en/favicon.ico',
    shortcut: '/en/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  creator: 'Antony Jude Shaman',
  manifest: '/en/manifest.json',
  twitter: {
    card: 'summary',
    images: '/favicon.ico',
    title: 'AgroVoiceAI',
    description:
      'AgroVoiceAI your one-stop solution for all your farming needs. Get the latest market & weather updates, test soil conditions, detect pests, and get your queries resolved with our Chatbot.'
  },
  openGraph: {
    type: 'website',
    title: 'AgroVoiceAI',
    description:
      'AgroVoiceAI your one-stop solution for all your farming needs. Get the latest market & weather updates, test soil conditions, detect pests, and get your queries resolved with our Chatbot.',
    siteName: 'AgroVoiceAI',
    url: 'https://agrovoiceai.vercel.app/en',
    images: '/apple-touch-icon.png'
  },
  viewport: {
    initialScale: 1,
    width: 'device-width',
    userScalable: false,
    viewportFit: 'cover',
    maximumScale: 1
  }
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#020817' }
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
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/en/favicon-32x32.png"
        />
        <link rel="shortcut icon" href="/en/favicon.ico" /> */}
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
