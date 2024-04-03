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
import { Loader2 } from 'lucide-react'
import { handleNameSubmit } from '@/helpers/user-info'
import { cn } from '@/lib/utils'
import { SettingsProps } from '@/lib/types'

export function SettingsNameForm({
  user,
  title,
  description,
  save
}: SettingsProps) {
  const [name, setName] = useState(user?.name || '')
  const [isSaving, setIsSaving] = useState(false)
  const [isNameChanged, setIsNameChanged] = useState(false)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    setIsNameChanged(event.target.value !== user?.name)
  }

  return (
    <Card className="md:w-2/3 w-full border dark:border-green-900/50 border-green-200">
      <form
        onSubmit={event =>
          handleNameSubmit(
            event,
            user,
            name,
            setIsSaving,
            setIsNameChanged
          ).then(() => {
            setIsNameChanged(false)
          })
        }
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Input
              id="name"
              className=""
              size={32}
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </CardContent>
        <CardFooter className="bg-gradient-to-r dark:from-green-900/40 from-10% dark:via-teal-900/40 via-30% dark:to-emerald-900/40 from-green-200 via-teal-100 to-emerald-100  to-60% p-3 border dark:border-green-900/50 border-green-200 rounded-b-2xl md:-m-2 md:mt-4 justify-end flex">
          <Button
            type="submit"
            className={cn(
              buttonVariants(),
              'dark:hover:text-black/80 dark:hover:bg-white/80 hover:text-white/80 disabled:text-gray-600 disabled:border-gray-400 hover:opacity-85 dark:hover:opacity-100 flex justify-center items-center',
              `${isNameChanged ? '' : 'bg-transparent dark:text-gray-300 text-gray-100 border dark:border-green-200/70'}`
            )}
            size="lg"
            disabled={!isNameChanged || isSaving}
            variant="outline"
          >
            {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
            <span>{save}</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
