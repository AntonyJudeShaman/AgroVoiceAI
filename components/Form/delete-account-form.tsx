'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { Button, buttonVariants } from '@/components/ui/button'
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
import { IconSpinner } from '@/components/ui/icons'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { cn } from '@/lib/utils'
import { Loader2, Trash2 } from 'lucide-react'
import { clearChats, deleteAccount } from '@/app/actions'
import { signOut } from 'next-auth/react'
import MyToast from '../ui/my-toast'
import { SettingsProps } from '@/lib/types'

export function DeleteAccount({
  title,
  description,
  confirm,
  deleteButton,
  cancel,
  subDescription
}: SettingsProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  return (
    <Card className="w-full border dark:border-gray-700/70 border-gray-300">
      <form>
        <CardHeader className="h-">
          <CardTitle className="text-green-500">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger className="" asChild>
            <CardFooter className="bg-gradient-to-r dark:from-green-900/40 from-10% dark:via-teal-900/40 via-30% dark:to-emerald-900/40 from-green-200 via-teal-100 to-emerald-100  to-60% border dark:border-green-900/50 border-green-200 rounded-b-2xl md:-m-2 p-3 justify-end flex">
              {' '}
              <Button
                type="button"
                className={cn(
                  buttonVariants(),
                  'bg-green-700 text-white border dark:border-green-200/70 flex justify-center items-center dark:hover:bg-red-600/60 hover:bg-red-700 hover:text-white hover:border border-green-200 shadow-lg'
                )}
                size="lg"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 size-4" />
                )}
                <span>{title}</span>
              </Button>
            </CardFooter>
          </AlertDialogTrigger>
          <AlertDialogContent className="border dark:border-red-900 border-red-500">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600">
                {confirm}
              </AlertDialogTitle>
              <AlertDialogDescription>{subDescription}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSaving}>
                {cancel}
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isSaving}
                className="border bg-background hover:bg-transparent text-red-600 hover:border-red-600"
                onClick={async event => {
                  event.preventDefault()
                  setIsSaving(true)
                  try {
                    await clearChats()
                    await deleteAccount()
                    setOpen(false)
                    MyToast({
                      message: 'Account deleted successfully',
                      type: 'success'
                    })
                    window.history.pushState({}, '', `/`)
                    signOut()
                  } catch (error) {
                    MyToast({
                      message: 'Error deleting account',
                      type: 'error'
                    })
                  } finally {
                    setIsSaving(false)
                  }
                }}
              >
                {isSaving && <IconSpinner className="mr-2 animate-spin" />}
                {deleteButton}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Card>
  )
}
