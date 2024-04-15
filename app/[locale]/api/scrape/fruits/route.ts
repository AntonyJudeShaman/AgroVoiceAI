import { getUserId } from '@/app/actions'
import { db } from '@/lib/db'
import axios from 'axios'
import { JSDOM } from 'jsdom'
import { NextRequest, NextResponse } from 'next/server'


function scrapeDataFromTables(response:any) {
  const dom = new JSDOM(response.data);
  const document = dom.window.document;
  let scrapedData: string[] = []

  const tables = document.querySelectorAll('table');
  tables.forEach((table) => {
    table.querySelectorAll('tr').forEach((row) => {
      const rowData: string[] = []
      row.querySelectorAll('td').forEach((cell) => {
        rowData.push(cell.textContent?.trim() || '');
      });
      scrapedData.push(rowData.join(', '));
    });
  });

  return scrapedData;
}


export async function POST(req: NextRequest) {
  try {
    const { location } = await req.json()
    const websiteUrl: string = `https://market.todaypricerates.com/${location}-fruits-price-in-Tamil-Nadu`
    // 'https://market.todaypricerates.com/${location}-vegetables-price-in-Tamil-Nadu'
    // 'https://market.todaypricerates.com/fruits-daily-price'
    const response = await axios.get(websiteUrl)

    if (response.status === 200) {
      const scrapedData = scrapeDataFromTables(response)

      return NextResponse.json({ scrapedData })
    } else {
      return NextResponse.json({ message: 'Failed to retrieve the webpage.' })
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message })
  }
}

export async function GET(req: NextRequest) {
  const user = await getUserId()
  const location = await db.user.findFirst({
    where: {
      id: user
    },
    select: {
      userDistrict: true
    }
  })
  try{
    
    const websiteUrl: string = `https://market.todaypricerates.com/${location?.userDistrict}-fruits-price-in-Tamil-Nadu`
    
    const response = await axios.get(websiteUrl)
    
    if (response.status === 200) {
      const dom = new JSDOM(response.data)
      const document = dom.window.document

      const scrapedData = scrapeDataFromTables(response)
      return NextResponse.json({ scrapedData })
    } else {
      return NextResponse.json({ message: 'Failed to retrieve the webpage.' })
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message })
  }
  // return NextResponse.json({location:location})
}