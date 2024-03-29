import OnboardingForm from '@/components/Form/onboarding-form'
import React from 'react'
import { getCurrentUser } from '../../actions'
import { redirect } from 'next/navigation'

export default async function Onboarding() {
  const user = await getCurrentUser()
  console.log(user)
  if (user?.pageShown) {
    redirect('/options')
  }
  return (
    <>
      {!user?.pageShown && (
        <div className="flex justify-center items-center min-h-screen">
          <OnboardingForm user={user} className="" />
        </div>
      )}
    </>
  )
}
