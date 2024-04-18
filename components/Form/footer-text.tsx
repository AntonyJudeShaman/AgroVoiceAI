import React from 'react'

import { cn } from '@/lib/utils'
import { useLocale } from 'next-intl'
import { Info } from 'lucide-react'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  const locale = useLocale()
  return (
    <p
      className={cn(
        'px-2 text-center text-sm text-red-600 leading-normal mb-4 flex items-center',
        className
      )}
      {...props}
    >
      {locale === 'en'
        ? 'AgroVoice will respond in the same language as your chatbot preference.'
        : 'AgroVoice உங்கள் சாட்போட் கூடுதல் தகவலில் உள்ள அதே மொழியில் மட்டுமே பதிலளிக்கும்.'}
    </p>
  )
}
