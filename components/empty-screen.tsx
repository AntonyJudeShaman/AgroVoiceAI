import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight, IconOpenAI } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Explain technical concepts',
    message: `What is a "serverless function"?`
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for a 2nd grader: \n'
  },
  {
    heading: 'Draft an email',
    message: `Draft an email to my boss about the following: \n`
  },
  {
    heading: 'Draft an email',
    message: `Draft an email to my boss about the following: \n`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <IconOpenAI className="size-16 mx-auto" />
      <p className="mx-auto font-display flex justify-center pt-4 text-3xl font-semibold">
        AgroVoiceAI
      </p>

      <div className="mt grid grid-cols-2 mx-auto mt-10 justify-center gap-6 flex-wrap">
        {exampleMessages.map((message, index) => (
          <Button
            key={index}
            className="p-4 text-blue-500 text-md hover:bg-background/60 flex justify-start h-auto hover:text-blue-500/90 bg-background border rounded-md"
            onClick={() => setInput(message.message)}
          >
            {message.heading}
          </Button>
        ))}
      </div>
    </div>
  )
}
