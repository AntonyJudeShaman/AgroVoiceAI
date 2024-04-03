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
import { handleEmailSubmit } from '@/helpers/user-info'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { SettingsProps } from '@/lib/types'

export function SettingsEmailForm({
  user,
  title,
  description,
  save
}: SettingsProps) {
  const [email, setEmail] = useState(user?.email || '')
  const [isEmailChanged, setIsEmailChanged] = useState(false)
  const [isSavingEmail, setIsSavingEmail] = useState<boolean>(false)

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    setIsEmailChanged(event.target.value !== user?.phone)
  }

  return (
    <Card className="w-full border dark:border-green-900/50 border-green-200">
      <form
        onSubmit={event =>
          handleEmailSubmit(
            event,
            user,
            email,
            setIsSavingEmail,
            setIsEmailChanged
          ).then(() => {
            setIsEmailChanged(false)
          })
        }
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              {title}
            </Label>
            <Input
              id="name"
              className=""
              type="text"
              size={32}
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </CardContent>
        <CardFooter className="bg-gradient-to-r dark:from-green-900/40 from-10% dark:via-teal-900/40 via-30% dark:to-emerald-900/40 from-green-200 via-teal-100 to-emerald-100  to-60% border dark:border-green-900/50 border-green-200 rounded-b-2xl md:-m-2 p-3 md:mt-4 justify-end flex">
          {' '}
          <Button
            type="submit"
            className={cn(
              buttonVariants(),
              'dark:hover:text-black/80 dark:hover:bg-white/80 hover:text-white/80 disabled:text-gray-600 disabled:border-gray-400 hover:opacity-85 border dark:hover:opacity-100 flex justify-center items-center',
              `${isEmailChanged ? '' : 'bg-transparent dark:text-gray-300 text-gray-100 border dark:border-green-200/70 border-green-200'}`
            )}
            size="lg"
            disabled={!isEmailChanged || isSavingEmail}
          >
            {isSavingEmail && <Loader2 className="mr-2 size-4 animate-spin" />}
            <span>{save}</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
