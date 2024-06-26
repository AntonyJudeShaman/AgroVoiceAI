import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './config'

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (
      await (locale === 'en'
        ? import('./messages/en.json')
        : import(`./messages/ta.json`))
    ).default
  }
})
