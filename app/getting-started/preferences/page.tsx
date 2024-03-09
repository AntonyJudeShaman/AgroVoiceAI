import { getCurrentUser } from '@/app/actions'
import GettingStartedPreferenceForm from '@/components/Form/getting-started-preference-form'
import React from 'react'
import { redirect } from 'next/navigation'

export default async function GettingStartedPreference() {
  const user = await getCurrentUser()
  if (user?.pageShown && user) {
    redirect('/chat')
  }
  return (
    <>
      {!user?.pageShown && (
        <div className="flex justify-center items-center min-h-screen">
          <GettingStartedPreferenceForm user={user} className="" />
        </div>
      )}
    </>
  )
}
