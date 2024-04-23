import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  try {
    const { district, item, type } = await req.json()

    console.log('Storing data for district:', district, 'type', type)

    const data = await db.marketStore.findMany({
      where: {
        district: district,
        name: item,
        type: type
      },
      select: {
        createdAt: true,
        name: true,
        marketPrice: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error storing market prices:', error)
    return NextResponse.json({ message: 'Failed to store.' })
  }
}
