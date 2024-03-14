'use client'
import { User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import MarketTableSkeleton from './market-table-skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Info } from 'lucide-react'

interface Item {
  name: string
  unit: string
  marketPrice: string
  retailPrice: string
  mallPrice: string
}

// function parseItems(scrapedData: string[]): Item[] {
//   const items: Item[] = []
//   const regex = /(.*)\s\((.*)\)\s*:\s*(.*)/

//   for (const line of scrapedData) {
//     const match = line.match(regex)
//     if (match && match.length >= 4) {
//       const name = match[1].trim()
//       const unit = match[2].trim() || '1 Kg'
//       const price = match[3].trim()
//       items.push({ name, unit, price })
//     }
//   }

//   return items
// }
function parseItems(scrapedData: string[]): Item[] {
  const items: Item[] = []

  for (const entry of scrapedData) {
    if (entry.trim() !== '') {
      const parts = entry.split(',')
      const name = parts.slice(0, -4).join(',').trim()
      const unit = parts[parts.length - 4].trim()
      const marketPrice = parts[parts.length - 3].trim()
      const retailPrice = parts[parts.length - 2].trim()
      const mallPrice = parts[parts.length - 1].trim()

      items.push({
        name,
        unit,
        marketPrice,
        retailPrice,
        mallPrice
      })
    }
  }

  return items
}

export default function MarketHome({ user }: { user: User }) {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/scrape', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          console.log(data)
          const parsedItems = parseItems(data.scrapedData)
          setItems(parsedItems)
        } else {
          setError('Failed to fetch prices: ' + response.statusText)
        }
      } catch (error: any) {
        setError('Error fetching prices: ' + error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <MarketTableSkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="p-10 bg-black border border-red-600 text-xl text-white rounded-2xl">
          Some error occurred. Please try again later.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center md:mt-[4rem] mt-[6rem] pb-10">
      <div className="md:w-[50%] z-10 md:p-6 p-3 ">
        <h1 className="md:text-6xl text-4xl pb-4 flex sm:flex-row flex-col text-center justify-center items-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% font-bold font-pops tracking-tighter mb-4">
          Today&apos;s Price in Chennai
          <Tooltip>
            <TooltipTrigger>
              <Info className="size-6 sm:ml-4 hidden sm:block sm:mt-0 mt-4 dark:text-white text-black" />
            </TooltipTrigger>
            <TooltipContent className="text-sm font-pops tracking-normal">
              Daily prices of vegetables in Chennai.
            </TooltipContent>
          </Tooltip>
        </h1>
        <p className="flex justify-center mb-6 text-lg -mt-6">
          {new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </p>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 opacity-30 -z-10 min-h-full filter blur-2xl mix-blend-screen"></div>
          <div className="border dark:border-green-900 border-green-500 rounded-2xl overflow-hidden">
            <Table className="w-full rounded-2xl font-pops bg-gradient-to-tr dark:from-slate-900/90 dark:to-slate-900/90 to-60% from-zinc-50 to-teal-50">
              <TableHeader className="">
                <TableRow className="rounded-t-2xl">
                  <TableHead className="md:p-6 p-3 font-bold md:text-xl text-green-600">
                    Name
                  </TableHead>
                  <TableHead className="md:p-6 p-3 font-bold md:text-xl text-green-600">
                    Unit
                  </TableHead>
                  <TableHead className="md:p-6 p-3 font-bold md:text-xl text-green-600">
                    Market Price
                  </TableHead>
                  <TableHead className="md:p-6 p-3 font-bold md:text-xl text-green-600">
                    Retail Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="md:p-6 p-3 md:text-md text-sm">
                      {item.name}
                    </TableCell>
                    <TableCell className="md:p-6 p-3 md:text-md text-sm">
                      {item.unit}
                    </TableCell>
                    <TableCell className="md:p-6 p-3 md:text-md text-sm">
                      {item.marketPrice.substring(2)}
                    </TableCell>
                    <TableCell className="md:p-6 p-3 md:text-md text-sm">
                      {item.retailPrice.substring(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
