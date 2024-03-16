import { getCurrentUser } from '@/app/actions'
import OnboardingPreferenceForm from '@/components/Form/onboarding-preference-form'
import React from 'react'
import { redirect } from 'next/navigation'
import { DistrictForm } from '@/components/Form/district-form'
import { OnboardingLocationForm } from '@/components/Form/onboarding-location'

export default async function OnboardingLocation() {
  const users = await getCurrentUser()
  if (users?.pageShown && users) {
    redirect('/options')
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
