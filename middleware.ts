import createMiddleware from 'next-intl/middleware'
import { pathnames, locales, localePrefix } from './config'

export default createMiddleware({
  defaultLocale: 'en',
  locales,
  pathnames,
  localePrefix
})

export const config = {
  matcher: [
    '/',
    '/(ta|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ]
}
