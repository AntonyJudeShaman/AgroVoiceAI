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
        <div className="flex justify-center items-center min-h-screen dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
          {' '}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-green-50 [mask-image:radial-gradient(ellipse_at_center,transparent_1%,purple)]"></div>
          <OnboardingForm user={user} className="z-20" />
        </div>
      )}
    </>
  )
}
