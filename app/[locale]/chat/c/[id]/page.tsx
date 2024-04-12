import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { getChat } from '@/app/actions'
import { Chat } from '@/components/Chat/chat'
import NotFound from '@/app/[locale]/not-found'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await auth()

  if (!session?.user) {
    return {}
  }

  const chat = await getChat(params.id, session.user.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()

  // if (!session?.user) {
  //   redirect(`/sign-in?next=/chat/c/${params.id}`)
  // }

  const chat = await getChat(params.id, session?.user.id || '')

  if (!chat) {
    return <NotFound />
  }

  if (chat?.userId !== session?.user?.id) {
    return <NotFound />
  }

  return (
    <>
      <Chat id={chat.id} initialMessages={chat.messages} session={session} />
    </>
  )
}
