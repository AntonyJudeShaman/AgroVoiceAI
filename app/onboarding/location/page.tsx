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
        <div className="flex justify-center items-center min-h-screen">
          <OnboardingLocationForm user={users} />
        </div>
      )}
    </>
  )
}
