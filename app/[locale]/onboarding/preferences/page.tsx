import { getCurrentUser } from '@/app/actions'
import OnboardingPreferenceForm from '@/components/Form/onboarding-preference-form'
import React from 'react'
import { redirect } from 'next/navigation'

export default async function OnboardingPreference() {
  const user = await getCurrentUser()
  if (user?.pageShown && user) {
    redirect('/options')
  }
  return (
    <>
      {!user?.pageShown && (
        <div className="flex justify-center items-center min-h-screen dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
          {' '}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-green-50 [mask-image:radial-gradient(ellipse_at_center,transparent_1%,purple)]"></div>
          <OnboardingPreferenceForm user={user} className="" />
        </div>
      )}
    </>
  )
}
