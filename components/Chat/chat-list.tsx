"use client"
import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/Chat/chat-message'
import { getCurrentUser, getUser } from '@/app/actions'
import { useEffect, useState } from 'react'
import { User } from 'next-auth'

export interface ChatList {
  messages: Message[]
}

export function ChatList({ messages }: ChatList) {

  const [session, setSession] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = await getCurrentUser();
        setSession(sessionData as User);
      } catch (error) {
        // console.error('Error fetching user data:', error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  if (!messages.length) {
    return null;
  }
  
  return (
    <div className="relative mx-auto max-w-2xl md:mb-[28%] xl:mb-[14%] -mb-[10%] px-4">
      {messages.map((message, index) => (
        <div key={index} className=''>
          <ChatMessage message={message} userImage={session?.image} userName={session?.name}/>
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  )
}
