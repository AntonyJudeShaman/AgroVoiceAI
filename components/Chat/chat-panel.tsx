import * as React from 'react'
import { type UseChatHelpers } from 'ai/react'

import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/Form/prompt-form'
import { ButtonScrollToBottom } from '@/components/Miscellaneous/button-scroll-to-bottom'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { ChatShareDialog } from '@/components/Chat/chat-share-dialog'
import { useLocale } from 'next-intl'
import ChatExampleMessages from './chat-example-messages'
import { FooterText } from '../Form/footer-text'
import { Loader, Loader2 } from 'lucide-react'
import { LoadingDots } from '../ui/loading-dots'

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
        <ChatExampleMessages messages={messages} id={id} append={append} />
        <div className="flex items-center justify-center h-12">
          {isLoading ? (
            <div className="flex items-center space-x-4">
              <LoadingDots className="bg-gradient-to-r size-3 from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%" />
              <Button
                variant="outline"
                onClick={() => stop()}
                className="bg-background"
              >
                <IconStop className="mr-2" />
                {locale === 'en' ? 'Stop generating' : 'நிறுத்து'}
              </Button>
            </div>
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
        <div className="px-4 py-2 space-y-4 border md:mb-4 shadow-lg bg-gradient-to-r from-green-500 dark:from-green-700 dark:via-green-900 dark:to-emerald-900 from-10% via-green-500 via-30% to-emerald-500 to-60%  sm:rounded-tr-[25px] sm:rounded-bl-[25px] dark:sm:border-gray-800 sm:border-gray-300 md:py-4">
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
            reload={reload}
          />
        </div>
        <FooterText className="hidden sm:block" />
      </div>
    </div>
  )
}
