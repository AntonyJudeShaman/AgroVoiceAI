'use client'
import { useCallback, useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { Loader2, Trash2, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { Label } from '../ui/label'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '../ui/dialog'
import { useDropzone } from 'react-dropzone'
import { DeleteAccount } from './delete-account'
import {
  handleAgeSubmit,
  handleImageSubmit,
  handleNameSubmit,
  handlePhoneNumberSubmit,
  handlePrefSubmit
} from '@/helpers/user-info'
import {
  getStorage,
  ref as reff,
  uploadBytes,
  listAll,
  getDownloadURL
} from 'firebase/storage'
import { firebaseConfig } from '@/lib/firebase'
import { initializeApp } from 'firebase/app'
import { removeImage } from '@/app/actions'
import { Textarea } from '../ui/textarea'

export function SettingsChatbot({
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

  const firebaseApp = initializeApp(firebaseConfig, 'profile')
  const storage = getStorage(firebaseApp)
  const router = useRouter()

  const handlePrefChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreference(event.target.value)
    setIsPreferenceChanged(event.target.value !== user?.chatbotPreference)
  }

  return (
    <>
      <div
        className={cn(
          className,
          'flex flex-col md:space-x-4 md:space-y-0 space-y-4 space-x-0 md:flex-row'
        )}
      >
        <Card className="w-full border dark:border-green-900/50 border-green-200">
          <form
            onSubmit={event =>
              handlePrefSubmit(
                event,
                user,
                preference,
                setIsSavingPref,
                setIsPreferenceChanged,
                toast
              )
            }
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
                  className="placeholder:text-zinc-500/50"
                  value={preference}
                  onChange={handlePrefChange}
                  spellCheck="true"
                  autoCorrect="true"
                  placeholder='Type "I like to grow tomatoes" or "I am interested in organic farming" or tell about the current method carried out for your crops to get better suggestions.'
                />
              </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r dark:from-green-900/40 from-10% dark:via-teal-900/40 via-30% dark:to-emerald-900/40 from-green-200 via-teal-100 to-emerald-100  to-60% p-3 border dark:border-green-900/50 border-green-200 rounded-b-2xl md:-m-2 md:mt-4 justify-end flex">
              <Button
                type="submit"
                className={cn(
                  buttonVariants(),
                  className,
                  'dark:hover:text-black/80 dark:hover:bg-white/80 hover:text-white/80 disabled:text-gray-600 disabled:border-gray-400 hover:opacity-85 dark:hover:opacity-100 flex justify-center items-center',
                  `${
                    isPreferenceChanged
                      ? ''
                      : 'bg-transparent dark:text-gray-300 text-gray-100 border dark:border-green-200/70'
                  }`
                )}
                size="lg"
                disabled={!isPreferenceChanged || isSavingPref}
                variant="outline"
              >
                {isSavingPref && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                <span>Save</span>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  )
}
