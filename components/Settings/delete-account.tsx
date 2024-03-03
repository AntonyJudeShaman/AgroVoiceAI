'use client'

import * as React from 'react'
import { redirect, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { ServerActionResult } from '@/lib/types'
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
import { deleteAccount } from '@/app/actions'
import { signOut } from 'next-auth/react'

export function DeleteAccount() {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  return (
    <Card className="w-full border dark:border-gray-700/70 border-gray-300">
      <form>
        <CardHeader className="h-">
          <CardTitle className="text-red-500">Delete account</CardTitle>
          <CardDescription>
            This will delete your account and all your data permanently.
          </CardDescription>
        </CardHeader>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger className="" asChild>
            <CardFooter className="dark:bg-gray-800/70 bg-slate-600  border dark:border-gray-700/70 border-gray-300 rounded-b-2xl md:-m-2 p-3 justify-end flex">
              {' '}
              <Button
                type="button"
                className={cn(
                  buttonVariants(),
                  'bg-red-700 text-white border dark:border-gray-700/70 flex justify-center items-center hover:bg-red-600/60 hover:text-white hover:border border-red-500'
                )}
                size="lg"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 size-4" />
                )}
                <span>Delete account</span>
              </Button>
            </CardFooter>
          </AlertDialogTrigger>
          <AlertDialogContent className="border dark:border-red-900 border-red-500">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={isSaving}
                className="border bg-background hover:bg-transparent text-red-600 hover:border-red-600"
                onClick={async event => {
                  event.preventDefault()
                  setIsSaving(true)
                  try {
                    await deleteAccount()
                    setOpen(false)
                    toast.success('Account deleted successfully', {
                      duration: 5000
                    })
                    window.history.pushState({}, '', `/`)
                    signOut()
                  } catch (error) {
                    toast.error('Error deleting account')
                    // Handle error here
                  } finally {
                    setIsSaving(false)
                  }
                }}
              >
                {isSaving && <IconSpinner className="mr-2 animate-spin" />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Card>
  )
}
