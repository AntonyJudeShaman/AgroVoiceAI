import { getCurrentUser, getUserId } from '@/app/actions'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const userId = await getCurrentUser()

  // const userName = await db.user.findFirst({
  //   where: {
  //     id: userId
  //   },
  //   select: {
  //     id: true
  //   }
  // })
  console.log(userId)
  if (userId) {
    return NextResponse.json({ id: userId })
  } else {
    return NextResponse.json({ id: null })
  }
}
