import * as React from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { SidebarList } from '@/components/Sidebar/sidebar-list'
import { buttonVariants } from '@/components/ui/button'
import { IconPlus } from '@/components/ui/icons'
import { UserMenu } from '../user-menu'
import { ClearHistory } from '../clear-history'
import { cache } from 'react'
import { clearChats, getChats } from '@/app/actions'

interface ChatHistoryProps {
  userId?: string
}

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId)
})
export async function ChatHistory({ userId }: ChatHistoryProps) {
  
  const chats = await loadChats(userId)

  return (
    <div className="flex flex-col w-full h-full p-2">
      <div className="px-2 my-4 space-x-2 flex">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-10 w-full z-40 justify-start bg-slate-50 px-4 shadow-none transition-colors hover:bg-slate-200/40 dark:bg-slate-900 dark:hover:bg-slate-300/10'
          )}
        >
          <IconPlus className="-translate-x-2 stroke-2" />
          New Chat
        </Link>
        <ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} />
        {/* <ThemeToggle /> */}
      </div>
      <React.Suspense
        fallback={
          <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        }
      >
        {/* @ts-ignore */}
        <SidebarList userId={userId} />
      <UserMenu />
      </React.Suspense>
    </div>
  )
}
