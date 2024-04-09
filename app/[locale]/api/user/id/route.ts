import { getUserId } from '@/app/actions'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const userId = await getUserId()

  const userName = await db.user.findFirst({
    where: {
      id: userId
    },
    select: {
      id: true
    }
  })
  return NextResponse.json(userName)
}
