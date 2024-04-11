import { getCurrentUser, getUserId } from '@/app/actions'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: any) {
  const userId = await auth(req)
  console.log('inside get user id', await auth())
  if (userId) {
    return NextResponse.json({ id: await getCurrentUser() })
  } else {
    return NextResponse.json({ id: null })
  }
}
