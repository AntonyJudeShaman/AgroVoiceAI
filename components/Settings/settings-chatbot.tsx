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
import { Loader2, Mic } from 'lucide-react'
import toast from 'react-hot-toast'
import { handlePrefSubmit } from '@/helpers/user-info'
import { Textarea } from '../ui/textarea'
import { SettingsProps } from '@/lib/types'
import MyToast from '../ui/my-toast'
import { useLocale } from 'next-intl'
import { IconClose } from '../ui/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export function SettingsChatbot({
  user,
  title,
  description,
  save,
  placeholder
}: SettingsProps) {
  const [isSavingPref, setIsSavingPref] = useState<boolean>(false)
  const [isPreferenceChanged, setIsPreferenceChanged] = useState<boolean>(false)
  const [preference, setPreference] = useState(user?.chatbotPreference || '')

  const router = useRouter()
  const locale = useLocale()

  const handlePrefChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreference(event.target.value)
    setIsPreferenceChanged(event.target.value !== user?.chatbotPreference)
  }

  const [isMicrophoneActive, setIsMicrophoneActive] = useState<boolean>(false)

  let trans = ''

  function handleVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    setPreference('')
    const recognition = new SpeechRecognition()
    recognition.lang = 'ta-IN'
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    recognition.start()
    recognition.onstart = () => {
      setIsMicrophoneActive(true)
    }
    recognition.onresult = async function (e) {
      const transcript = e.results[0][0].transcript
      if (transcript.trim() !== '') {
        setPreference(transcript)
        setIsPreferenceChanged(true)
      }
      trans = transcript
    }
    recognition.onend = () => {
      if (trans.trim() !== '') {
        toast(
          locale === 'en'
            ? 'Sorry, I did not catch that. 😔'
            : 'பேச்சு கண்டறியப்படவில்லை'
        )
      }
      setIsMicrophoneActive(false)
      recognition.stop()
    }
  }

  const closeModal = () => {
    setIsMicrophoneActive(false)
  }
  return (
    <>
      {isMicrophoneActive && (
        <div
          className="fixed inset-0 p-6 flex animate-in duration-500 justify-center items-center"
          onClick={closeModal}
          style={{ backdropFilter: 'blur(10px)', zIndex: 99999999 }}
        >
          <div className="bg-transparent p-8 shadow-none rounded-full flex flex-col items-center">
            <button
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
              type="button"
            >
              <IconClose className="z-40 size-8 dark:text-white text-black" />
            </button>
            <div className="animate-opacity">
              <Mic className="md:size-32 size-20 w-full text-red-600" />
            </div>
            <p className="text-3xl mt-4 font-display">
              {locale === 'en' ? 'Mic is On' : 'மைக் இயக்கத்தில் உள்ளது'}
            </p>
          </div>
        </div>
      )}
      <div
        className={cn(
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
                setIsPreferenceChanged
              )
            }
          >
            <CardHeader className="">
              <CardTitle>{title}</CardTitle>
              <CardDescription className="flex justify-between items-center">
                <>
                  {description}
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleVoice}
                        type="button"
                        className={cn(
                          ' w-10 dark:text-white text-black border border-gray-300 dark:border-gray-700 p-2 cursor-pointer',
                          isMicrophoneActive ||
                            !isSavingPref ||
                            'opacity-40 cursor-not-allowed'
                        )}
                        disabled={isMicrophoneActive || isSavingPref}
                      >
                        <Mic className="size-5" />
                        <span className="sr-only">Open Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {locale === 'en' ? 'Click to speak' : 'பேச கிளிக் செய்க'}
                    </TooltipContent>
                  </Tooltip>
                </>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Textarea
                  id="preference"
                  className="placeholder:text-gray-400/70"
                  value={preference}
                  onChange={handlePrefChange}
                  spellCheck="true"
                  autoCorrect="true"
                  placeholder={placeholder}
                />
              </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r dark:from-green-900/40 from-10% dark:via-teal-900/40 via-30% dark:to-emerald-900/40 from-green-200 via-teal-100 to-emerald-100  to-60% p-3 border dark:border-green-900/50 border-green-200 rounded-b-2xl md:-m-2 md:mt-4 justify-end flex">
              <Button
                type="submit"
                className={cn(
                  buttonVariants(),
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
                <span>{save}</span>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  )
}
