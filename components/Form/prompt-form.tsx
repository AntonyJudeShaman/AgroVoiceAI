'use client'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { UseChatHelpers } from 'ai/react'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { IconArrowElbow, IconClose, IconPlus } from '@/components/ui/icons'
import { useRouter } from 'next/navigation'
import { inputSchema, validateInput } from '@/lib/schema'
import toast from 'react-hot-toast'
import MyToast from '../ui/my-toast'
import { useLocale } from 'next-intl'
import { Mic, Mic2 } from 'lucide-react'
import { set } from 'zod'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => void
  isLoading: boolean
  reload: () => void
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
  reload
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const locale = useLocale()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const [isMicrophoneActive, setIsMicrophoneActive] =
    React.useState<boolean>(false)
  const [isMicActivated, setIsMicActivated] = React.useState<boolean>(false)
  let text = ''

  function handleVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    setInput('')
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
      if (transcript.trim() === '') {
        setInput(transcript)
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

  if (text.trim() === '' && isMicActivated) {
    toast(
      locale === 'en'
        ? 'Sorry, I did not catch that. 😔'
        : 'பேச்சு கண்டறியப்படவில்லை'
    )
    setIsMicActivated(false)
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
      <form
        onSubmit={async e => {
          e.preventDefault()
          if (!input?.trim()) {
            return
          }
          inputSchema.parse(input)
          if (!validateInput(input)) {
            MyToast({
              message:
                locale === 'en'
                  ? 'Dont try to inject code. 😒'
                  : 'குறியீட்டை உட்செலுத்த முயற்சிக்காதீர்கள். 😒',
              type: 'error'
            })
          } else {
            setInput('')
            await onSubmit(input)
          }
        }}
        ref={formRef}
      >
        <div className="relative flex flex-col pl-[24px] pr-[82px] overflow-hidden max-h-60 grow md:dark:bg-black dark:bg-transparent bg-gray-100 sm:rounded-md sm:border dark:sm:border-gray-600 sm:border-gray-400 sm:pl-12 sm:pr-28 dark:focus-within:border-blue-500 focus-within:border-blue-700">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={e => {
                  e.preventDefault()
                  router.refresh()
                  router.push('/chat/new')
                }}
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outline' }),
                  'absolute left-0 top-4 size-8 rounded-full bg-background p-0 sm:left-4'
                )}
              >
                <IconPlus />
                <span className="sr-only">New Chat</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {locale === 'en' ? 'New Chat' : 'புதிய உரையாடல்'}
            </TooltipContent>
          </Tooltip>
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Send a message."
            spellCheck={true}
            className="min-h-[60px] w-full resize-none bg-transparent px-4 mr-6 py-[1.3rem] focus-within:outline-none sm:text-sm"
          />
          <div className="absolute right-0 top-4 sm:right-4 flex items-center space-x-3">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleVoice}
                  type="button"
                  className={cn(
                    'rounded-ful dark:bg-slate-800 dark:text-white text-black bg-white dark:hover:bg-primary border border-gray-300 dark:border-gray-700 p-2 cursor-pointer',
                    isMicrophoneActive ||
                      !isLoading ||
                      'opacity-40 cursor-not-allowed'
                  )}
                  disabled={isMicrophoneActive || isLoading}
                >
                  <Mic className="size-5" />
                  <span className="sr-only">Open Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {locale === 'en' ? 'Click to speak' : 'பேச கிளிக் செய்க'}
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || input === ''}
                >
                  <IconArrowElbow />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {locale === 'en' ? 'Send message' : 'அனுப்பு'}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </form>
    </>
  )
}
