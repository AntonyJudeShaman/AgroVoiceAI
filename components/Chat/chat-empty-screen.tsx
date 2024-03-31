import { UseChatHelpers } from 'ai/react'

import { IconLogo } from '@/components/ui/icons'
import { useLocale } from 'next-intl'

export function EmptyScreen({ title }: any) {
  const locale = useLocale()
  return (
    <div className="mx-auto md:max-w-2xl px-4 max-w-full">
      <IconLogo className="md:size-32 size-28 mx-auto" />
      <p className="mx-auto font-display bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% flex justify-center pt-4  text-4xl md:text-5xl font-semibold">
        {locale === 'en' ? 'AgroVoiceAI' : 'அக்ரோவாய்ஸ்AI'}
      </p>
    </div>
  )
}
