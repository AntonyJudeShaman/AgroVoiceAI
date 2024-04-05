import {
  exampleMessagesEnglish,
  exampleMessagesTamil
} from '@/config/constants'
import { useLocale } from 'next-intl'
import React from 'react'

export default function ChatExampleMessages({ messages, append, id }: any) {
  const locale = useLocale()
  return (
    <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
      {messages.length === 0 &&
        (locale === 'en' ? exampleMessagesEnglish : exampleMessagesTamil).map(
          (example, index) => (
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
              <div className="text-sm dark:text-gray-400 font-bricol text-gray-600">
                {example.subheading}
              </div>
            </div>
          )
        )}
    </div>
  )
}
