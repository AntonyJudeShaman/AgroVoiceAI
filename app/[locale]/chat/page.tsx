import { Chat } from '@/components/Chat/chat'
import { auth } from '@/lib/auth'
import { nanoid } from '@/lib/utils'
import React from 'react'

async function page() {
  const id = nanoid()
  const session = await auth()

  // if (!session) {
  //   redirect('/sign-in')
  // }

  return (
    <>
      <Chat id={id} session={session} />{' '}
    </>
  )
}

export default page
