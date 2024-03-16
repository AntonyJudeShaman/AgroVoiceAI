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
import { motion } from 'framer-motion'
import { tableHeader } from '@/config/constants'
import { parseItems } from '@/lib/utils'
import { Item } from '@/lib/types'

export default function MarketHome2({ user }: { user: User }) {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ location: user.userDistrict })
        })

        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setItems(parseItems(data.scrapedData))
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
          Data might not be available for your location.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center md:mt-[4rem] mt-[6rem] pb-10">
      <div className="md:w-[60%] 2xl:w-[50%] z-10 md:p-6 p-3 ">
        <h1 className="md:text-5xl text-4xl pb-4 flex sm:flex-row flex-col text-center justify-center items-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% font-bold font-pops tracking-tighter mb-4">
          Today&apos;s Price in {user.userDistrict}
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
                  {tableHeader.map((item, index) => (
                    <TableHead
                      key={index}
                      className="md:p-6 p-3 font-bold md:text-xl text-green-600"
                    >
                      {item.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="md:p-6 p-3 md:text-md text-sm">
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.name}
                      </motion.div>
                    </TableCell>
                    <TableCell className="md:p-6 p-3 md:text-md text-sm">
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.unit}
                      </motion.div>
                    </TableCell>
                    <TableCell className="md:p-6 p-3 md:text-md text-sm">
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.marketPrice.substring(2)}
                      </motion.div>
                    </TableCell>
                    <TableCell className="md:p-6 p-3 md:text-md text-sm">
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.retailPrice.substring(2)}
                      </motion.div>
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
