import * as React from 'react'
import { type UseChatHelpers } from 'ai/react'

import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/Form/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { ChatShareDialog } from '@/components/Chat/chat-share-dialog'
import { useLocale } from 'next-intl'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
  title?: string
}

const exampleMessages = [
  {
    heading: 'How can I',
    subheading: 'maximize limited space for crop cultivation?',
    message: `How can small-scale farmers maximize limited space for crop cultivation?`
  },
  {
    heading: 'What are some cost-effective methods for',
    subheading: 'organic pest management on a small farm?',
    message:
      'What are some cost-effective methods for organic pest management on a small farm?'
  },
  {
    heading: `I'm looking for advice on`,
    subheading: 'efficient irrigation techniques for a small plot of land',
    message: `I'm looking for advice on efficient irrigation techniques for a small plot of land`
  },
  {
    heading: 'What are some ways',
    subheading: `I can diversify my income streams with limited resources?`,
    message: `What are some ways small-scale farmers can diversify their income streams with limited resources?`
  }
]

export function ChatPanel({
  id,
  title,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages
}: ChatPanelProps) {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const locale = useLocale()

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out dark:from-background/90 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom />
      {/* <ButtonScrollToTop /> */}
      <div className="mx-auto sm:max-w-3xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-md md:rounded-tl-none md:rounded-b-none md:rounded-tr-2xl md:rounded-bl-2xl border p-4 duration-300 bg-gradient-to-tr dark:from-slate-900 dark:to-slate-950/40 dark:hover:to-slate-900 dark:hover:from-slate-950/40 to-60% from-zinc-100  to-indigo-100/30 hover:to-zinc-200  hover:from-indigo-200/30  
                  
                }`}
                onClick={async () => {
                  await append({
                    id,
                    content: example.message,
                    role: 'user'
                  })
                }}
              >
                <div className="text-sm font-semibold font-pops">
                  {example.heading}
                </div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-center h-12">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              {locale === 'en' ? 'Stop generating' : 'நிறுத்து'}
            </Button>
          ) : (
            messages?.length >= 2 && (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => reload()}>
                  <IconRefresh className="mr-2" />
                  {locale === 'en' ? 'Regenerate response' : 'மீளாக்கம் செய்'}
                </Button>
                {id && title ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShareDialogOpen(true)}
                    >
                      <IconShare className="mr-2" />
                      Share
                    </Button>
                    <ChatShareDialog
                      open={shareDialogOpen}
                      onOpenChange={setShareDialogOpen}
                      onCopy={() => setShareDialogOpen(false)}
                      shareChat={shareChat}
                      chat={{
                        id,
                        title,
                        messages
                      }}
                    />
                  </>
                ) : null}
              </div>
            )
          )}
        </div>
        <div className="px-4 py-2 space-y-4 border md:mb-10 shadow-lg bg-gradient-to-r from-green-500 dark:from-green-700 dark:via-green-900 dark:to-emerald-900 from-10% via-green-500 via-30% to-emerald-500 to-60%  sm:rounded-tr-[25px] sm:rounded-bl-[25px] dark:sm:border-gray-800 sm:border-gray-300 md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          {/* <FooterText className="hidden sm:block" /> */}
        </div>
      </div>
    </div>
  )
}
