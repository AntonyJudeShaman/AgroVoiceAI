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
        <div className="flex justify-center items-center min-h-screen">
          <OnboardingPreferenceForm user={user} className="" />
        </div>
      )}
    </>
  )
}
