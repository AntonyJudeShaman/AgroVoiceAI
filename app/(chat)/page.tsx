import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/Chat/chat'
import { auth } from '@/lib/auth'
import { DotBackGround } from '@/components/grid-bg'

export default async function IndexPage() {
  const id = nanoid()

  const session = await auth()

  return !session ? (
    <div className='flex justify-center flex-col items-center mt-0'>
    <DotBackGround/>
    </div>
  ) : (
    <Chat id={id} />
  )
}
