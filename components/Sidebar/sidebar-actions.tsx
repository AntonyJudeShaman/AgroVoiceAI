'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'react-hot-toast'

import { ServerActionResult, type Chat } from '@/lib/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { IconShare, IconSpinner, IconTrash } from '@/components/ui/icons'
import { ChatShareDialog } from '@/components/Chat/chat-share-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import MyToast from '../ui/my-toast'
import { useLocale } from 'next-intl'

interface SidebarActionsProps {
  chat: Chat
  removeChat: (args: { id: string; path: string }) => ServerActionResult<void>
  shareChat: (id: string) => ServerActionResult<Chat>
  delete_text: string
  tooltip_delete_chat: string
  confirm: string
  delete_chat: string
  cancel: string
}

export function SidebarActions({
  chat,
  removeChat,
  shareChat,
  delete_text,
  tooltip_delete_chat,
  confirm,
  delete_chat,
  cancel
}: SidebarActionsProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const [isRemovePending, startRemoveTransition] = React.useTransition()
  const locale = useLocale()

  return (
    <>
      <div className="space-x-1">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="size-6 p-0 hover:bg-background"
              onClick={() => setShareDialogOpen(true)}
            >
              <IconShare />
              <span className="sr-only">
                {locale === 'en' ? 'Share' : 'பகிர்'}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {locale === 'en' ? 'Share Chat' : 'சாட் பகிர்ந்துகொள்'}
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="size-6 p-0 hover:bg-background"
              disabled={isRemovePending}
              onClick={() => setDeleteDialogOpen(true)}
            >
              <IconTrash />
              <span className="sr-only">{delete_text}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{tooltip_delete_chat}</TooltipContent>
        </Tooltip>
      </div>
      <ChatShareDialog
        chat={chat}
        shareChat={shareChat}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onCopy={() => setShareDialogOpen(false)}
      />
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border dark:border-red-900 border-red-500 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              {confirm}
            </AlertDialogTitle>
            <AlertDialogDescription>{delete_chat}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemovePending}>
              {cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              className="border bg-background hover:bg-transparent text-red-600 hover:border-red-600"
              disabled={isRemovePending}
              onClick={event => {
                event.preventDefault()
                // @ts-ignore
                startRemoveTransition(async () => {
                  const result = await removeChat({
                    id: chat.id,
                    path: chat.path
                  })

                  if (result && 'error' in result) {
                    MyToast({
                      message:
                        locale === 'en'
                          ? 'Error deleting chat'
                          : 'உரையாடலை நீக்குவதில் பிழை',
                      type: 'error'
                    })
                    return
                  }

                  setDeleteDialogOpen(false)
                  router.refresh()
                  router.push('/chat')
                  MyToast({
                    message:
                      locale === 'en'
                        ? 'Chat deleted successfully'
                        : 'உரையாடல் வெற்றிகரமாக நீக்கப்பட்டது',
                    type: 'success'
                  })
                })
              }}
            >
              {isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
              {delete_text}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
