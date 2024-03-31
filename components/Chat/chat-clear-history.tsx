'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { ServerActionResult } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { IconSpinner, IconTrash } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import MyToast from '../ui/my-toast'
import { useLocale } from 'next-intl'

interface ClearHistoryProps {
  isEnabled: boolean
  clearChats: () => ServerActionResult<void>
  delete_text: string
  tooltip_delete_history: string
  confirm: string
  delete_history: string
  cancel: string
}

export function ClearHistory({
  isEnabled = false,
  clearChats,
  delete_text,
  tooltip_delete_history,
  confirm,
  delete_history,
  cancel
}: ClearHistoryProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const locale = useLocale()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="h-10"
              disabled={!isEnabled || isPending}
            >
              {isPending && <IconSpinner className="mr-2" />}
              <IconTrash className="size-5" />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>{tooltip_delete_history}</TooltipContent>
      </Tooltip>
      <AlertDialogContent className="border dark:border-red-900 border-red-500">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            {confirm}
          </AlertDialogTitle>
          <AlertDialogDescription>{delete_history}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{cancel}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="border bg-background hover:bg-transparent text-red-600 hover:border-red-600"
            onClick={event => {
              event.preventDefault()
              startTransition(async () => {
                const result = await clearChats()
                if (result && 'error' in result) {
                  MyToast({
                    message: 'Error clearing chat history',
                    type: 'error'
                  })
                  return
                }

                setOpen(false)
                router.refresh()
                router.push(`/chat`)
                MyToast({
                  message: 'Chat history cleared successfully',
                  type: 'success'
                })
              })
            }}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            {delete_text}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
