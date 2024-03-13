import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { JSDOM } from 'jsdom'
import { NextResponse } from 'next/server'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const websiteUrl: string =
      'https://www.livechennai.com/Vegetable_price_chennai.asp'
    const response = await axios.get(websiteUrl)

    if (response.status === 200) {
      const dom = new JSDOM(response.data)
      const document = dom.window.document

      let scrapedData: string[] = []

      // Select all table elements
      const tables = document.querySelectorAll('table')

      // Loop through each table
      tables.forEach((table: HTMLTableElement) => {
        // Loop through each row in the table
        table.querySelectorAll('tr').forEach((row: HTMLTableRowElement) => {
          // Loop through each cell in the row
          const rowData: string[] = []
          row.querySelectorAll('td').forEach((cell: HTMLTableCellElement) => {
            // Get the text content of each cell and trim it
            rowData.push(cell.textContent?.trim() || '')
          })
          // Join the cell data with a comma and add to scrapedData array
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
