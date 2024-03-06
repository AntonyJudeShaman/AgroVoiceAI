import { SettingsForm } from '@/components/Settings/settings-form'
import { SettingsShell } from '@/components/Settings/settings-shell'
import React from 'react'
import { auth } from '@/lib/auth'
import { getCurrentUser } from '../actions'
import NotFound from '../not-found'
import Link from 'next/link'
import { IconLogo } from '@/components/ui/icons'
import { SettingsHeader } from '@/components/Settings/settings-header'

async function Settings() {
  const session = await auth()
  const user = await getCurrentUser()
  return session ? (
    <SettingsShell className="">
      <div className="flex items-end justify-between">
        <SettingsHeader
          heading="Settings"
          text="Manage account and website settings."
          className="md:mt-10 mt-4 text-5xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%"
        />
        <Link
          className=" hidden items-center font-normal font-pops text-3xl dark:text-white text-black lg:flex"
          href="/"
        >
          AgroVoiceAI <IconLogo className="size-16 ml-3" />
          <span className="sr-only">AgroVoiceAI</span>
        </Link>
      </div>
      <SettingsForm user={user} className="" />
    </SettingsShell>
  ) : (
    <NotFound />
  )
}

export default Settings
