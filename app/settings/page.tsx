import { Header } from '@/components/header'
import { SettingsForm } from '@/components/Settings/settings-form'
import { SettingsShell } from '@/components/Settings/settings-shell'
import React from 'react'
import { auth } from '@/lib/auth'
import { getCurrentUser, getUser } from '../actions'

async function Settings() {
  const session = await getCurrentUser()
  return (
    <SettingsShell className=''>
      <Header
        heading="Settings"
        text="Manage account and website settings."
      />
      <SettingsForm user={session} className="" />
    </SettingsShell>
  )
}

export default Settings
