import { getCurrentUser } from '@/app/actions'
import OnboardingPreferenceForm from '@/components/Form/onboarding-preference-form'
import React from 'react'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { auth } from '@/lib/auth'
import LocaleSwitcher from '@/components/locale-switcher'

export default async function OnboardingPreference() {
  const session = await auth()
  const user = await getCurrentUser()
  console.log(user)
  if (user?.pageShown && session) {
    redirect('/options')
  }
  if (!session?.user?.id) {
    redirect('/sign-in')
  }
  const t = await getTranslations('Index')

  return (
    <>
      {!user?.pageShown && (
        <div className="flex flex-col justify-center items-center min-h-screen dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
          {' '}
          <div className="z-40">
            <LocaleSwitcher />
          </div>
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-green-50 [mask-image:radial-gradient(ellipse_at_center,transparent_1%,purple)]"></div>
          <OnboardingPreferenceForm
            user={user}
            className=""
            back={t('onboarding.back')}
            saveName={t('onboarding.save&next')}
            title={t('settings.bot.title')}
            description={t('settings.bot.desc')}
            placeholder={t('settings.bot.placeholder')}
            changeLater={t('onboarding.change_later')}
          />
        </div>
      )}
    </>
  )
}
