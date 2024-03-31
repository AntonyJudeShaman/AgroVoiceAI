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
      {session?.user ? (
        <div className="">
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </div>
      ) : (
        <Link href="/" target="_blank" rel="nofollow">
          <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
          <IconNextChat className="hidden size-6 mr-2 dark:block" />
        </Link>
      )}
      <div className="flex items-center">
        {!session?.user && (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
