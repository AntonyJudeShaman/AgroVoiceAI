'use client'
import { useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { handleUserNameSubmit } from '@/helpers/user-info'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import { Loader2 } from 'lucide-react'
import { SettingsProps } from '@/lib/types'

export function SettingsUsernameForm({
  user,
  title,
  description,
  save,
  subDescription
}: SettingsProps) {
  const [userName, setUserName] = useState(user?.userName || '')
  const [isUserNameChanged, setIsUserNameChanged] = useState(false)
  const [isSavingUserName, setIsSavingUserName] = useState<boolean>(false)

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
    setIsUserNameChanged(event.target.value !== user?.name)
  }

  return (
    <Card className="flex justify-center flex-col border dark:border-green-900/50 border-green-200">
      <form
        onSubmit={event =>
          handleUserNameSubmit(
            event,
            user,
            userName,
            setIsSavingUserName,
            setIsUserNameChanged
          ).then(() => {
            setIsUserNameChanged(false)
          })
        }
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {user?.userName ? subDescription : description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              {title}
            </Label>
            <Input
              id="email"
              className={cn(
                `${user?.userName?.length > 0 ? 'text-gray-400' : ''}`
              )}
              size={32}
              value={userName}
              onChange={handleUserNameChange}
              readOnly={user?.userName?.length > 0 ? true : false}
            />
          </div>
        </CardContent>
        <CardFooter
          className={cn(
            'bg-gradient-to-r dark:from-green-900/40 from-10% dark:via-teal-900/40 via-30% dark:to-emerald-900/40 from-green-200 via-teal-100 to-emerald-100  to-60% border dark:border-green-900/50 border-green-200 rounded-b-2xl md:-m-2 p-3 md:mt-4 justify-end flex',
            `${user?.userName?.length > 0 ? 'hidden' : ''}`
          )}
        >
          {' '}
          <Button
            type="submit"
            className={cn(
              buttonVariants(),
              'dark:hover:text-black/80 dark:hover:bg-white/80 hover:text-white/80 disabled:text-gray-600 disabled:border-gray-400 hover:opacity-85 border dark:hover:opacity-100 flex justify-center items-center',
              `${isUserNameChanged ? '' : 'bg-transparent dark:text-gray-300 text-gray-100 border dark:border-green-200/70 border-green-200'}`
            )}
            size="lg"
            disabled={!isUserNameChanged || isSavingUserName}
          >
            {isSavingUserName && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            <span>{save}</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
