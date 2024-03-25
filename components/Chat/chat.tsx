'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { EmptyScreen } from '@/components/Chat/chat-empty-screen'
import { toast } from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import { ChatList } from './chat-list'
import { ChatScrollAnchor } from './chat-scroll-anchor'
import { ChatPanel } from './chat-panel'

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
          toast.error('Something went wrong. Please try again later.', {
            style: {
              borderRadius: '10px',
              background: '#d83030',
              color: '#fff',
              fontSize: '14px'
            },
            iconTheme: {
              primary: 'white',
              secondary: 'black'
            }
          })
        }
      },
      onFinish() {
        if (!path.includes('chat/c')) {
          router.push(`chat/c/${id}`)
          router.refresh()
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
          <EmptyScreen setInput={setInput} />
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
