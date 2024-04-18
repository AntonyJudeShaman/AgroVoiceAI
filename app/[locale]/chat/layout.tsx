import { UserOrLogin } from '@/components/Chat/chat-header'
import ChatNavbar from '@/components/Chat/chat-navbar'
import { SidebarDesktop } from '@/components/Sidebar/sidebar-desktop'
import { auth } from '@/lib/auth'
import React from 'react'
import { getCurrentUser } from '../../actions'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { navItems } from '@/config/constants'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const session = await auth()
  const user = await getCurrentUser()
  const t = await getTranslations('Index')
  if (!user?.pageShown && user) {
    redirect('/onboarding/location')
  }
  return (
    <div className="relative min-h-screen flex overflow-hidden dark:bg-[#020817]">
      {<SidebarDesktop />}

      <div className="group w-full overflow-auto items-center pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        {
          <div className="flex items-center md:ml-3 w-full">
            <UserOrLogin />
            <ChatNavbar
              title={t('title')}
              home={t(navItems[0])}
              chat={t(navItems[1])}
              weather={t(navItems[2])}
              market={t(navItems[3])}
              settings={t(navItems[4])}
              pest={t(navItems[5])}
              download={t('app')}
            />
          </div>
        }
        {children}
      </div>
    </div>
  )
}
