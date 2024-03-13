'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Info, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { handlePrefSubmit } from '@/helpers/user-info'
import { Textarea } from '../ui/textarea'
import { updatePageShown } from '@/app/actions'

export default function GettingStartedPreferenceForm({
  user,
  className,
  ...props
}: {
  user: any
  className: string
}) {
  const [isSavingPref, setIsSavingPref] = useState<boolean>(false)
  const [isPreferenceChanged, setIsPreferenceChanged] = useState<boolean>(false)
  const [preference, setPreference] = useState(user?.chatbotPreference || '')
  const [next, setNext] = useState(false)

  const router = useRouter()

  const handlePrefChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreference(event.target.value)
    setIsPreferenceChanged(event.target.value !== user?.chatbotPreference)
  }

  return (
    <Card
      className={cn(
        className,
        'flex flex-col m-4 items-center dark:bg-slate-900/10 bg-white/80 shadow-none'
      )}
    >
      <Card className="w-full border-none bg-transparent shadow-none">
        <form
          onSubmit={event => {
            event.preventDefault()
            if (isPreferenceChanged) {
              handlePrefSubmit(
                event,
                user,
                preference,
                setIsSavingPref,
                setIsPreferenceChanged,
                toast
              ).then(() => {
                setNext(true)
                setIsSavingPref(true)
                updatePageShown(user.id)
                router.push('/options')
              })
            } else {
              setNext(true)
              setIsSavingPref(true)
              updatePageShown(user.id)
              router.push('/options')
            }
          }}
        >
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>
              Please provide extra information for the chatbot to give more
              precise suggestions for your crop.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <Textarea
                id="preference"
                className="placeholder:text-gray-400/70 border"
                value={preference}
                onChange={handlePrefChange}
                spellCheck="true"
                autoCorrect="true"
                placeholder='Type "I like to grow tomatoes" or "I am interested in organic farming" or tell about the current method carried out for your crops to get better suggestions.'
              />
            </div>
            <div className="flex justify-end mt-5">
              <Button
                className="flex mr-3"
                onClick={() => {
                  updatePageShown(user.id)
                  router.push('/options')
                }}
                variant="outline"
                disabled={next || isSavingPref}
                type="button"
              >
                Skip
              </Button>
              <Button
                type="submit"
                className={cn(buttonVariants())}
                size="lg"
                disabled={isSavingPref}
                variant="outline"
              >
                {isSavingPref && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                <span>Save & Next</span>
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
      <p className="flex justify-start text-sm pb-4 dark:text-gray-500 text-gray-700">
        <Info className="size-5 mr-1" />
        <span>You can always change your details later.</span>
      </p>
    </Card>
  )
}
