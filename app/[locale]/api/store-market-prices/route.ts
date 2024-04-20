import { db } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { district, items, type } = await req.json()

    console.log('Storing data for district:', district)

    for (const item of items) {
      await db.marketStore.create({
        data: {
          district,
          name: item.name,
          unit: item.unit,
          marketPrice: parseFloat(item.marketPrice.replace('₹', '').trim()),
          retailPrice: item.retailPrice,
          mallPrice: item.mallPrice || null,
          type: type
        }
      })
    }

    return NextResponse.json({ message: 'Data stored successfully.' })
  } catch (error) {
    console.error('Error storing market prices:', error)
    return NextResponse.json({ message: 'Failed to store.' })
  }
}
