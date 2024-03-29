import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, pref } = await req.json()

  const userName = await db.user.update({
    where: {
      id: userId
    },
    data: {
      chatbotPreference: pref
    }
  })
  return NextResponse.json(userName)
}
