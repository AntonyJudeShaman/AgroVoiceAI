import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/utils'

export async function POST(req: Request) {
  try {
    const { name, pswd } = await req.json()

    const user = await db.user.findUnique({
      where: {
        userName: name
      }
    })

    let hashedPassword = await hashPassword(pswd as string)
    for (let i = 1; i < 100; i++) {
      hashedPassword = await hashPassword(hashedPassword)
    }
    console.log('user:', hashedPassword, user?.password)

    if (user) {
      if (hashedPassword !== user?.password) {
        return NextResponse.json(
          { error: 'Invalid username or password' },
          { status: 401 }
        )
      } else {
        return NextResponse.json(user)
      }
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error validating user:', error)
    return NextResponse.json('Internal Server Error', { status: 500 })
  }
}
