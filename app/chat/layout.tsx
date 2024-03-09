import { UserOrLogin } from '@/components/Chat/chat-header'
import ChatNavbar from '@/components/Chat/chat-navbar'
import { SidebarDesktop } from '@/components/Sidebar/sidebar-desktop'
import { auth } from '@/lib/auth'
import React from 'react'
import { getCurrentUser } from '../actions'
import { redirect } from 'next/navigation'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const session = await auth()
  const user = await getCurrentUser()
  if (!user?.pageShown && user) {
    redirect('/getting-started')
  }
  return (
    <div className="relative min-h-screen flex overflow-hidden dark:bg-[#020817]">
      {session && <SidebarDesktop />}
      <div className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        {session && (
          <div className="flex justify-between">
            <div className="flex items-center ml-5 md:ml-3 justify-start">
              <UserOrLogin />
            </div>{' '}
            <div>
              <ChatNavbar />
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
