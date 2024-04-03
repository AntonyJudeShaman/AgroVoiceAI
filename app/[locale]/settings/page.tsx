import { SettingsForm } from '@/components/Settings/settings-form'
import { SettingsShell } from '@/components/Settings/settings-shell'
import React from 'react'
import { auth } from '@/lib/auth'
import { getCurrentUser } from '../../actions'
import NotFound from '../not-found'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SettingsChatbot } from '@/components/Settings/settings-chatbot'
import { Bot, User } from 'lucide-react'
import Link from 'next/link'
import { SettingsHeader } from '@/components/Settings/settings-header'
import { IconLogo } from '@/components/ui/icons'
import SessionPageContainer from '@/components/session-page-container'
import { getTranslations } from 'next-intl/server'

async function Settings() {
  const session = await auth()
  const user = await getCurrentUser()
  const t = await getTranslations('Index')
  return session ? (
    <div className="justify-center dark:bg-dot-green-400/[0.2] bg-dot-green-600/[0.3]">
      <SessionPageContainer
        component={
          <>
            <div className="flex items-end justify-between lg:px-28 xl:px-7 xl:pr-16">
              <SettingsHeader
                heading={t('settings.setting')}
                text={t('settings.desc')}
                className="md:-mt-10 mt-8 text-5xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%"
              />
              <Link
                className=" hidden items-center font-normal font-pops text-3xl dark:text-white text-black lg:flex"
                href="/"
              >
                {t('title')} <IconLogo className="size-16 ml-3" />
                <span className="sr-only">{t('title')}</span>
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
                  <User className="size-5 mr-2" /> {t('settings.tab1')}
                </TabsTrigger>
                <TabsTrigger
                  value="chatbot"
                  className="w-full rounded-lg flex items-center xl:justify-start justify-center text-md text-left"
                >
                  <Bot className="size-5 mr-2" /> {t('settings.tab2')}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="w-full">
                <SettingsShell className="xl:ml-10 pb-10">
                  <SettingsForm user={user} />
                </SettingsShell>
              </TabsContent>
              <TabsContent value="chatbot" className="w-full">
                <SettingsShell className="xl:ml-10 pb-10">
                  <SettingsChatbot
                    user={user}
                    title={t('settings.bot.title')}
                    description={t('settings.bot.desc')}
                    save={t('settings.save')}
                    placeholder={t('settings.bot.placeholder')}
                  />
                </SettingsShell>
              </TabsContent>
            </Tabs>
          </>
        }
      />
    </div>
  ) : (
    <NotFound />
  )
}

export default Settings
