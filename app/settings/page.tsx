import { SettingsHeader } from '@/components/header'
import { SettingsForm } from '@/components/Settings/settings-form'
import { SettingsShell } from '@/components/Settings/settings-shell'
import React from 'react'
import { auth } from '@/lib/auth'

async function Settings() {
  const session = await auth()
  return (
    <SettingsShell className=''>
      <SettingsHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <SettingsForm user={session} className="" />
    </SettingsShell>
  )
}

export default Settings
