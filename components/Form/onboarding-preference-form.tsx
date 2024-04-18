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
import { Info, Loader2, Mic } from 'lucide-react'
import toast from 'react-hot-toast'
import { handlePrefSubmit } from '@/helpers/user-info'
import { Textarea } from '../ui/textarea'
import { updatePageShown } from '@/app/actions'
import { OnboardingFormProps } from '@/lib/types'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { useLocale } from 'next-intl'
import MyToast from '../ui/my-toast'
import { IconClose } from '../ui/icons'

export default function OnboardingPreferenceForm({
  user,
  className,
  title,
  description,
  saveName,
  placeholder,
  back,
  changeLater
}: OnboardingFormProps) {
  const [isSavingPref, setIsSavingPref] = useState<boolean>(false)
  const [isPreferenceChanged, setIsPreferenceChanged] = useState<boolean>(false)
  const [preference, setPreference] = useState(user?.chatbotPreference || '')
  const [next, setNext] = useState(false)

  const router = useRouter()
  const locale = useLocale()

  const handlePrefChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreference(event.target.value)
    setIsPreferenceChanged(event.target.value !== user?.chatbotPreference)
  }

  const [isMicrophoneActive, setIsMicrophoneActive] = useState<boolean>(false)
  const [isMicActivated, setIsMicActivated] = useState<boolean>(false)
  let text = ''

  function handleVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    setPreference('')
    setIsMicActivated(true)
    const recognition = new SpeechRecognition()
    recognition.lang = locale === 'en' ? 'en-IN' : 'ta-IN'
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
      text = transcript
    }
    recognition.onend = () => {
      setIsMicrophoneActive(false)
      recognition.stop()
    }
  }

  const closeModal = () => {
    setIsMicrophoneActive(false)
  }

  if (text.trim() === '') {
    toast(
      locale === 'en'
        ? 'Sorry, I did not catch that. 😔'
        : 'பேச்சு கண்டறியப்படவில்லை'
    )
    setIsMicActivated(true)
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
      <Card
        className={cn(
          className,
          'flex flex-col md:w-2/3 xl:w-2/4 m-4 w-full items-center shadow-none z-20 bg-transparent'
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
                  setIsPreferenceChanged
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
                  className="placeholder:text-gray-400/70 border"
                  value={preference}
                  onChange={handlePrefChange}
                  spellCheck="true"
                  autoCorrect="true"
                  placeholder={placeholder}
                  disabled={isSavingPref || next}
                />
              </div>
              <div className="flex justify-between mt-5">
                <Button
                  className="flex mr-3"
                  onClick={() => {
                    router.push('/onboarding/location')
                  }}
                  variant="outline"
                  disabled={next || isSavingPref}
                  type="button"
                >
                  {back}
                </Button>
                <Button
                  type="submit"
                  className={cn(buttonVariants(), '')}
                  size="lg"
                  disabled={isSavingPref}
                  variant="outline"
                >
                  {isSavingPref && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  <span>{saveName}</span>
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
        <p className="flex justify-start text-sm pb-4 dark:text-gray-500 text-gray-700">
          <Info className="size-5 mr-1" />
          <span>{changeLater}</span>
        </p>
      </Card>
    </>
  )
}
