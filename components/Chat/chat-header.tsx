import * as React from 'react'
import Link from 'next/link'

import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { IconNextChat } from '@/components/ui/icons'
import { SidebarMobile } from '../Sidebar/sidebar-mobile'
import { SidebarToggle } from '../Sidebar/sidebar-toggle'
import { ChatHistory } from './chat-history'

export async function UserOrLogin() {
  const session = await auth()
  return (
    <div className="max-w-full ml-4">
      <div className="">
        <SidebarMobile session={session}>
          <ChatHistory />
        </SidebarMobile>
        <SidebarToggle />
      </div>
    </div>
  )
}
