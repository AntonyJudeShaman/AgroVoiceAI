import { getCurrentUser } from '@/app/actions'
import React from 'react'
import { redirect } from 'next/navigation'
import { OnboardingLocationForm } from '@/components/Form/onboarding-location'

export default async function OnboardingLocation() {
  const users = await getCurrentUser()
  if (users?.pageShown && users) {
    redirect('/onboarding/preferences')
  }
  return (
    <>
      {!users?.pageShown && (
        <div className="flex justify-center items-center min-h-screen dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
          {' '}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-green-50 [mask-image:radial-gradient(ellipse_at_center,transparent_1%,purple)]"></div>
          <OnboardingLocationForm user={users} />
        </div>
      )}
    </>
  )
}
