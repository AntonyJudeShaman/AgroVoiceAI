import axios from 'axios'
import { JSDOM } from 'jsdom'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { location } = await req.json()
    const websiteUrl: string = `https://market.todaypricerates.com/${location}-vegetables-price-in-Tamil-Nadu`
    // 'https://market.todaypricerates.com/${location}-vegetables-price-in-Tamil-Nadu'
    const response = await axios.get(websiteUrl)

    if (response.status === 200) {
      const dom = new JSDOM(response.data)
      const document = dom.window.document
      let scrapedData: string[] = []

      const tables = document.querySelectorAll('table')

      tables.forEach((table: HTMLTableElement) => {
        table.querySelectorAll('tr').forEach((row: HTMLTableRowElement) => {
          const rowData: string[] = []
          row.querySelectorAll('td').forEach((cell: HTMLTableCellElement) => {
            rowData.push(cell.textContent?.trim() || '')
          })
          scrapedData.push(rowData.join(', '))
        })
      })

      return NextResponse.json({ scrapedData })
    } else {
      return NextResponse.json({ message: 'Failed to retrieve the webpage.' })
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message })
  }
}
