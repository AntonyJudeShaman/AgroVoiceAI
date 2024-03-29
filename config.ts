import { Pathnames } from 'next-intl/navigation'

export const locales = ['en', 'ta'] as const

export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    ta: '/pfadnamen'
  }
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
