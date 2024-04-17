import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const latitude = req.geo?.latitude
  const longitude = req.geo?.longitude

  return NextResponse.json({ latitude, longitude })
}
