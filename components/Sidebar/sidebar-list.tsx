import { clearChats, getChats } from '@/app/actions'
import { ClearHistory } from '@/components/Chat/chat-clear-history'
import { SidebarItems } from '@/components/Sidebar/sidebar-items'
import { cache } from 'react'
import { getTranslations } from 'next-intl/server'

interface SidebarListProps {
  userId?: string
  children?: React.ReactNode
}

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId)
})

export async function SidebarList({ userId }: SidebarListProps) {
  const chats = await loadChats(userId)
  const t = await getTranslations('Index')

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {chats?.length ? (
          <div className="space-y-2 px-2">
            <SidebarItems
              chats={chats}
              delete_text={t('sidebar.delete')}
              tooltip_delete_chat={t('sidebar.tooltip_delete_chat')}
              confirm={t('sidebar.confirm')}
              delete_chat={t('sidebar.delete_chat')}
              cancel={t('sidebar.cancel')}
            />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">
              {t('sidebar.no_history')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
