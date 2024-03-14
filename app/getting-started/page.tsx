import GettingStartedForm from '@/components/Form/getting-started-form'
import React from 'react'
import { getCurrentUser } from '../actions'
import { redirect } from 'next/navigation'

export default async function GettingStarted() {
  const user = await getCurrentUser()
  if (user?.pageShown && user) {
    redirect('/options')
  }
  return (
    <>
      {!user?.pageShown && (
        <div className="flex justify-center items-center min-h-screen">
          <GettingStartedForm user={user} className="" />
        </div>
      )}
    </>
  )
}
