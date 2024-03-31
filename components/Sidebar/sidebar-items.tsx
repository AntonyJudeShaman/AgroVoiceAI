'use client'

import { Chat } from '@/lib/types'
import { AnimatePresence, motion } from 'framer-motion'

import { removeChat, shareChat } from '@/app/actions'

import { SidebarActions } from '@/components/Sidebar/sidebar-actions'
import { SidebarItem } from '@/components/Sidebar/sidebar-item'

interface SidebarItemsProps {
  chats?: Chat[]
  delete_text: string
  tooltip_delete_chat: string
  confirm: string
  delete_chat: string
  cancel: string
}

export function SidebarItems({
  chats,
  delete_text,
  tooltip_delete_chat,
  confirm,
  delete_chat,
  cancel
}: SidebarItemsProps) {
  if (!chats?.length) return null

  return (
    <AnimatePresence>
      {chats.map(
        (chat, index) =>
          chat && (
            <motion.div
              key={chat?.id}
              exit={{
                opacity: 0,
                height: 0
              }}
            >
              <SidebarItem index={index} chat={chat}>
                <SidebarActions
                  chat={chat}
                  removeChat={removeChat}
                  shareChat={shareChat}
                  delete_text={delete_text}
                  tooltip_delete_chat={tooltip_delete_chat}
                  confirm={confirm}
                  delete_chat={delete_chat}
                  cancel={cancel}
                />
              </SidebarItem>
            </motion.div>
          )
      )}
    </AnimatePresence>
  )
}
