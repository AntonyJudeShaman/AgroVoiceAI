import { getCurrentUser } from '@/app/actions'
import React from 'react'
import { redirect } from 'next/navigation'
import { OnboardingLocationForm } from '@/components/Form/onboarding-location'
import { getTranslations } from 'next-intl/server'
import { auth } from '@/lib/auth'
import LocaleSwitcher from '@/components/locale-switcher'

export default async function OnboardingLocation() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  const users = await getCurrentUser()
  if (users?.pageShown && session) {
    redirect('/options')
  }

  const t = await getTranslations('Index')
  return (
    <>
      {!users?.pageShown && (
        <div className="flex flex-col justify-center items-center min-h-screen dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
          {' '}
          <div className="z-40">
            <LocaleSwitcher />
          </div>
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-green-50 [mask-image:radial-gradient(ellipse_at_center,transparent_1%,purple)]"></div>
          <OnboardingLocationForm
            user={users}
            title={t('settings.account.district.title')}
            description={t('settings.account.district.desc')}
            back={t('onboarding.back')}
            saveName={t('onboarding.save&next')}
          />
        </div>
      )}
    </>
  )
}
