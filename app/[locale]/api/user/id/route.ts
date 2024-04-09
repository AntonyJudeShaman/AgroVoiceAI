import { getCurrentUser, getUserId } from '@/app/actions'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const userId = await getUserId()

  return NextResponse.json(userId)
}
