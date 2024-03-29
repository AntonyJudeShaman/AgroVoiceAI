import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, district } = await req.json()

  const userDistrict = await db.user.update({
    where: {
      id: userId
    },
    data: {
      userDistrict: district
    }
  })
  return NextResponse.json(userDistrict)
}
