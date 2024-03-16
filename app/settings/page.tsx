import { SettingsForm } from '@/components/Settings/settings-form'
import { SettingsShell } from '@/components/Settings/settings-shell'
import React from 'react'
import { auth } from '@/lib/auth'
import { getCurrentUser } from '../actions'
import NotFound from '../not-found'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SettingsChatbot } from '@/components/Settings/settings-chatbot'
import { ArrowLeft, Bot, User } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Home/home-navbar'
import { SettingsHeader } from '@/components/Settings/settings-header'
import { IconLogo } from '@/components/ui/icons'

async function Settings() {
  const session = await auth()
  const user = await getCurrentUser()
  return session ? (
    <div className="justify-center dark:bg-dot-green-400/[0.2] bg-dot-green-600/[0.3]">
      <Navbar session={session} />
      <div className="flex items-end justify-between lg:px-28 xl:px-7 xl:pr-16">
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
      <Tabs
        defaultValue="profile"
        className="md:w-full flex xl:flex-row flex-col p-4 lg:px-28 xl:px-7 xl:pr-16 justify-center"
      >
        <TabsList className="font-pops rounded-2xl p-2 w-full xl:w-[300px] mx-auto xl:mx-0 h-[100px] xl:mt-2 mb-6 md:mb-0 flex flex-col border dark:bg-black bg-white border-gray-500 dark:border-slate-700">
          <TabsTrigger
            value="profile"
            className="w-full mb-2 text-md flex rounded-lg items-center xl:justify-start justify-center text-left"
          >
            <User className="size-5 mr-2" /> Profile & Account
          </TabsTrigger>
          <TabsTrigger
            value="chatbot"
            className="w-full rounded-lg flex items-center xl:justify-start justify-center text-md text-left"
          >
            <Bot className="size-5 mr-2" /> Chatbot Preferences
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="w-full">
          <SettingsShell className="xl:ml-10 pb-10">
            <SettingsForm user={user} className="" />
          </SettingsShell>
        </TabsContent>
        <TabsContent value="chatbot" className="w-full">
          <SettingsShell className="xl:ml-10 pb-10">
            <SettingsChatbot user={user} className="" />
          </SettingsShell>
        </TabsContent>
      </Tabs>
    </div>
  ) : (
    <NotFound />
  )
}

export default Settings
