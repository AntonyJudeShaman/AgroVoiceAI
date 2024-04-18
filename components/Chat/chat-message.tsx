import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn, speak } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/Miscellaneous/markdown'
import { IconLogo, IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/Chat/chat-message-actions'
import { useLocale } from 'next-intl'

export interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  const locale = useLocale()
  // {
  //   message.role !== 'user' && speak(message.content, locale)
  // }
  return (
    <div
      className={cn('group font-mon relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <div
        className={cn(
          'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
          message.role === 'user' ? 'bg-background' : ' text-primary-foreground'
        )}
      >
        {message.role === 'user' ? (
          <IconUser />
        ) : (
          <IconLogo className="size-7" />
        )}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert font-bricol prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0 flex flex-col">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>
    </div>
  )
}
