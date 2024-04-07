import { db } from '@/lib/db'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, imageURL } = await req.json()

  const userimageURL = await db.user.update({
    where: {
      id: userId
    },
    data: {
      pestImage: imageURL
    }
  })
  revalidateTag('user')
  return NextResponse.json(userimageURL)
}
