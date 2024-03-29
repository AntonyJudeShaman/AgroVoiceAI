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
    const hashedPassword = await hashPassword(pswd)
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
