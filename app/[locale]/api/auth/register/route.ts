import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/utils'

export async function POST(req: Request) {
  const { name, pswd } = await req.json()
  const exists = await db.user.findUnique({
    where: {
      userName: name
    }
  })
  if (exists) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  } else {
    let hashedPassword = await hashPassword(pswd as string)
    for (let i = 1; i < 100; i++) {
      hashedPassword = await hashPassword(hashedPassword)
    }
    const user = await db.user.create({
      data: {
        userName: name,
        password: hashedPassword
        // email: name
      }
    })
    return NextResponse.json(user)
  }
}
