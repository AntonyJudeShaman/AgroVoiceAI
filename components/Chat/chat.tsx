'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { EmptyScreen } from '@/components/Chat/chat-empty-screen'
import { usePathname, useRouter } from 'next/navigation'
import { ChatList } from './chat-list'
import { ChatScrollAnchor } from './chat-scroll-anchor'
import { ChatPanel } from './chat-panel'
import MyToast from '../ui/my-toast'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: any
}

export function Chat({ id, initialMessages, className, session }: ChatProps) {
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
          MyToast({
            message: 'Something went wrong. Please try again later.',
            type: 'error'
          })
        }
      },
      onFinish() {
        if (!path.includes('chat/c') && session?.user.id) {
          router.push(`chat/c/${id}`)
          router.refresh()
        } else {
          // do nothing
        }
      }
    })
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen />
        )}
      </div>
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
  )
}
