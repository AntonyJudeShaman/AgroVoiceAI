import { Chat } from '@/components/Chat/chat'
import { auth } from '@/lib/auth'
import { nanoid } from '@/lib/utils'
import React from 'react'
import NotFound from '../not-found'
import { redirect } from 'next/navigation'

async function page() {
  const id = nanoid()
  const session = await auth()

  if (!session) {
    redirect('/sign-in')
  }

  return <>{session ? <Chat id={id} /> : <NotFound />}</>
}

export default page
