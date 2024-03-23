import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getStringFromBuffer } from '@/lib/utils'

export async function POST(req: Request) {
  const { email, pswd } = await req.json()
  const exists = await db.user.findUnique({
    where: {
      email: email
    }
  })
  if (exists) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  } else {
    const encoder = new TextEncoder()
    const saltedPassword = encoder.encode(pswd + 10)
    const hashedPasswordBuffer = await crypto.subtle.digest(
      'SHA-512',
      saltedPassword
    )

    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)
    const user = await db.user.create({
      data: {
        email: email,
        password: hashedPassword
      }
    })
    return NextResponse.json(user)
  }
}
