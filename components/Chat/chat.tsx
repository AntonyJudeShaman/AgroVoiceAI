'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/Chat/chat-list'
import { ChatPanel } from '@/components/Chat/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/Chat/chat-scroll-anchor'
import { toast } from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      onFinish() {
        if (!path.includes('chat')) {
          window.history.pushState({}, '', `/chat/${id}`)
        }
      }
    })
  return (
    <>
      <div className={cn('pb-[200px] md:pb-[0px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <>
            <EmptyScreen setInput={setInput} />{' '}
            <ChatPanel
              id={id}
              isLoading={isLoading}
              stop={stop}
              append={append}
              reload={reload}
              messages={messages}
              input={input}
              setInput={setInput}
            />
          </>
        )}
      </div>
    </>
  )
}
