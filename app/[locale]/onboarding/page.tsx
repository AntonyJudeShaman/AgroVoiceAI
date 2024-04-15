import OnboardingForm from '@/components/Form/onboarding-form'
import React from 'react'
import { getCurrentUser } from '../../actions'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { auth } from '@/lib/auth'
import LocaleSwitcher from '@/components/Miscellaneous/locale-switcher'

export default async function Onboarding() {
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
          <OnboardingForm
            user={user}
            className="z-20"
            welcome={t('onboarding.welcome')}
            title={t('settings.account.image.title')}
            description={t('settings.account.image.desc')}
            upload={t('settings.account.image.upload')}
            remove={t('settings.account.image.remove')}
            save={t('settings.save')}
            cancel={t('settings.cancel')}
            drag={t('settings.account.image.drag')}
            saveName={t('onboarding.save&next')}
            nameText={t('onboarding.name')}
            changeLater={t('onboarding.change_later')}
          />
        </div>
      )}
    </>
  )
}
