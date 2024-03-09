import { getCurrentUser } from '@/app/actions'
import GettingStartedPreferenceForm from '@/components/Form/getting-started-preference-form'
import React from 'react'
import { redirect } from 'next/navigation'
import { DistrictForm } from '@/components/Form/district-form'
import { GettingStartedLocationForm } from '@/components/Form/getting-started-location'

export default async function GettingStartedLocation() {
  const users = await getCurrentUser()
  if (users?.pageShown && users) {
    redirect('/chat')
  }
  return (
    <>
      {!users?.pageShown && (
        <div className="flex justify-center items-center min-h-screen">
          <GettingStartedLocationForm user={users} />
        </div>
      )}
    </>
  )
}
