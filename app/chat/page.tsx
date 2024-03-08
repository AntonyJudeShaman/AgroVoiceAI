import { Chat } from '@/components/Chat/chat'
import { auth } from '@/lib/auth'
import { nanoid } from '@/lib/utils'
import React from 'react'
import NotFound from '../not-found'

async function page() {
  const id = nanoid()
  const session = await auth()
  return <>{session ? <Chat id={id} /> : <NotFound />}</>
}

export default page
