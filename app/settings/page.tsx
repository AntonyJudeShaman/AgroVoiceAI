import { Header } from '@/components/header'
import { SettingsForm } from '@/components/Settings/settings-form'
import { SettingsShell } from '@/components/Settings/settings-shell'
import React from 'react'
import { auth } from '@/lib/auth'
import { getCurrentUser } from '../actions'
import NotFoundPage from '@/components/not-found'

async function Settings() {
  const session = await auth()
  const user = await getCurrentUser()
  return (
    session  ?
    <SettingsShell className=''>
      <Header
        heading="Settings"
        text="Manage account and website settings."
      />
      <SettingsForm user={user} className="" />
    </SettingsShell>
    : <NotFoundPage/>
    )
}

export default Settings
