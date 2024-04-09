import { getCurrentUser, getUserId } from '@/app/actions'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ id: await getUserId() })
}
