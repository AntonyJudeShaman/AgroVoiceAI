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
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import { useRouter } from 'next/navigation'
import { inputSchema, validateInput } from '@/lib/schema'
import toast from 'react-hot-toast'
import MyToast from '../ui/my-toast'
import { useLocale } from 'next-intl'
import { Mic, Mic2 } from 'lucide-react'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => void
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
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

  function handleVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = locale === 'en' ? 'en-IN' : 'ta-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.start()
    recognition.onresult = async function (e) {
      const transcript = e.results[0][0].transcript
      setInput(transcript)
    }
    recognition.onend = () => {
      recognition.stop()
    }
  }

  return (
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
      <div className="relative md:w-[46rem] flex flex-col px-8 overflow-hidden max-h-60 grow md:dark:bg-black dark:bg-transparent bg-gray-100 sm:rounded-md sm:border dark:sm:border-gray-600 sm:border-gray-400 sm:px-12 dark:focus-within:border-blue-500 focus-within:border-blue-700">
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
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4 flex items-center space-x-3">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={handleVoice}
                className="rounded-full bg-slate-800 p-2"
              >
                <Mic className="size-5" />
                <span className="sr-only">Send message</span>
              </button>
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
  )
}
