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
  price: string
  unit?: string
}

function parseItems(scrapedData: string[]): Item[] {
  const items: Item[] = []
  const regex = /(.*)\s\((.*)\)\s*:\s*(.*)/

  for (const line of scrapedData) {
    const match = line.match(regex)
    if (match && match.length >= 4) {
      const name = match[1].trim()
      const unit = match[2].trim() || '1 Kg'
      const price = match[3].trim()
      items.push({ name, unit, price })
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
      <div className="absolute h-full pointer-events-none inset-0 flex items-center justify-center dark:[background:radial-gradient(ellipse_at_center,black,transparent_60%)] [background:radial-gradient(ellipse_at_center,#c0f0ef,transparent_60%)]"></div>
      {items.length > 0 && (
        <div className="md:w-[50%] z-10 p-6">
          <h1 className="md:text-6xl text-4xl pb-4 flex sm:flex-row flex-col text-center justify-center items-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% font-bold font-pops tracking-tighter mb-4">
            Today's Price in Chennai
            <Tooltip>
              <TooltipTrigger>
                <Info className="size-6 sm:ml-4 hidden sm:block sm:mt-0 mt-4 dark:text-white text-black" />
              </TooltipTrigger>
              <TooltipContent className="text-sm font-pops tracking-normal">
                Daily prices of vegetables in Chennai.
              </TooltipContent>
            </Tooltip>
          </h1>
          <p className="flex justify-center mb-6 -mt-6">
            {new Date().toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
          <div className="border dark:border-green-900 border-green-500 rounded-2xl">
            <Table className=" w-full rounded-2xl font-pops bg-gradient-to-tr dark:from-slate-900/90 dark:to-slate-900/90 to-60% from-zinc-100 to-indigo-50">
              <TableHeader className="">
                <TableRow className="rounded-t-2xl">
                  <TableHead className="p-6 font-bold text-xl text-green-600 d0">
                    Name
                  </TableHead>
                  <TableHead className="p-6 font-bold text-xl text-green-600">
                    Price
                  </TableHead>
                  <TableHead className="p-6 font-bold text-xl text-green-600 d0">
                    Unit
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="p-6">
                      {item.name.substring(2)}
                    </TableCell>
                    <TableCell className="p-6">
                      {item.price.substring(2)}
                    </TableCell>
                    <TableCell className="p-6">{item.unit}</TableCell>{' '}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}
