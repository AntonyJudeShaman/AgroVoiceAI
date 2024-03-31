import * as React from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { SidebarList } from '@/components/Sidebar/sidebar-list'
import { buttonVariants } from '@/components/ui/button'
import { IconPlus } from '@/components/ui/icons'
import { UserMenu } from '../user-menu'
import { ClearHistory } from './chat-clear-history'
import { cache } from 'react'
import { clearChats, getChats } from '@/app/actions'
import { getTranslations } from 'next-intl/server'

interface ChatHistoryProps {
  userId?: string
}

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId)
})

export async function ChatHistory({ userId }: ChatHistoryProps) {
  const chats = await loadChats(userId)
  const t = await getTranslations('Index')

  return (
    <div className="flex flex-col size-full p-2">
      <div className="px-2 my-4 space-x-2 flex">
        <Link
          href="/chat/new"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-10 w-full z-40 justify-start bg-slate-50 px-4 shadow-none transition-colors hover:bg-slate-200/40 dark:bg-slate-900 dark:hover:bg-slate-300/10'
          )}
        >
          <IconPlus className="-translate-x-2 stroke-2" />
          {t('sidebar.new_chat')}
        </Link>
        <ClearHistory
          clearChats={clearChats}
          isEnabled={chats?.length > 0}
          delete_text={t('sidebar.delete')}
          tooltip_delete_history={t('sidebar.tooltip_delete_history')}
          confirm={t('sidebar.confirm')}
          delete_history={t('sidebar.delete_history')}
          cancel={t('sidebar.cancel')}
        />
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
