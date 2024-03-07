import { SettingsForm } from '@/components/Settings/settings-form'
import { SettingsShell } from '@/components/Settings/settings-shell'
import React from 'react'
import { auth } from '@/lib/auth'
import { getCurrentUser } from '../actions'
import NotFound from '../not-found'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SettingsChatbot } from '@/components/Settings/settings-chatbot'
import { ArrowLeft } from 'lucide-react'

async function Settings() {
  const session = await auth()
  const user = await getCurrentUser()
  return session ? (
    <div className="flex justify-center min-h-screen dark:bg-dot-green-400/[0.2] bg-dot-green-600/[0.3]">
      <Tabs
        defaultValue="profile"
        className="md:w-full flex xl:flex-row flex-col p-4 xl:px-40 justify-center"
      >
        <ArrowLeft className="size-8 xl:mt-[7rem] mb-6 xl:mb-0" />
        <TabsList className="font-pops p-2 w-full xl:w-[300px] mx-auto xl:mx-0 h-[100px] xl:mt-[13rem] flex flex-col border dark:bg-black bg-white border-gray-500 dark:border-slate-700">
          <TabsTrigger
            value="profile"
            className="w-full mb-2 text-md text-left"
          >
            Profile & Account
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="w-full text-md text-left">
            Chatbot Preferences
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="w-full">
          <SettingsShell className="xl:ml-10">
            <SettingsForm user={user} className="" />
          </SettingsShell>
        </TabsContent>
        <TabsContent value="chatbot" className="w-full">
          <SettingsShell className="xl:ml-10">
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
