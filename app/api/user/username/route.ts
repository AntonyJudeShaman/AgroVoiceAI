import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, userName } = await req.json()

  const name = await db.user.update({
    where: {
      id: userId
    },
    data: {
      userName: userName
    }
  })
  return NextResponse.json(name)
}

export async function GET(req: Request) {
  const { userId } = await req.json()

  const userName = await db.user.findFirst({
    where: {
      id: userId
    },
    select: {
      userName: true
    }
  })
  return NextResponse.json(userName)
}
