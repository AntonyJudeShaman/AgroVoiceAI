import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, email } = await req.json()

  try {
    const userEmail = await db.user.update({
      where: {
        id: userId
      },
      data: {
        email: email
      }
    })

    if (userEmail) {
      return NextResponse.json({ success: true }, { status: 200 })
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to update email number' },
        { status: 400 }
      )
    }
  } catch (error) {
    // console.error("Error updating email number:", error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
