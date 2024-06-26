import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { location } = await req.json()
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    { next: { tags: ['weather'] }, cache: 'force-cache' }
  )
  const data = await response.json()

  return NextResponse.json(data)
}

export async function GET(req: Request) {
  const { location } = await req.json()
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    { next: { tags: ['weather'] }, cache: 'force-cache' }
  )
  const data = await response.json()

  return NextResponse.json(data)
}
