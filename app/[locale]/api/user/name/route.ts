import { getUserId } from '@/app/actions'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, name } = await req.json()

  const userName = await db.user.update({
    where: {
      id: userId
    },
    data: {
      name: name
    }
  })
  return NextResponse.json(userName)
}

export async function GET(req: Request) {
  const userId = await auth()
  console.log(userId?.user.id)

  const userName = await db.user.findFirst({
    where: {
      id: userId?.user.id
    },
    select: {
      name: true
    }
  })
  return NextResponse.json(userName)
}
