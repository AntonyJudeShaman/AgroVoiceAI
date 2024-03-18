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
import { Button } from '../ui/button'
import { MarketLocationNotAvailable } from './market-location-not-available'

export default function MarketHome2({ user }: { user: any }) {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [location, setLocation] = useState(user?.userDistrict)

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
      <div className="flex items-center justify-center h-screen md:w-[60%] md:p-0 p-6 -mt-40 mx-auto">
        <div className="md:p-10 p-6 w-full bg-gray-50 dark:bg-gray-950 border border-red-600/80 text-lg text-white rounded-2xl">
          <p className="md:text-2xl text-center text-lg text-red-600 flex justify-center font-pops">
            Data might not be available for your location.
          </p>
        </div>
      </div>
    )
  }
  if (!items || !items.length) {
    return (
      <div className="flex items-center justify-center h-screen md:w-[60%] md:p-0 p-6 -mt-40 mx-auto">
        <div className="md:p-10 p-6 w-full bg-gray-50 dark:bg-gray-950 border border-green-600/60 dark:border-green-800/60 text-lg text-white rounded-2xl">
          <p className="md:text-2xl text-center dark:text-white text-black text-lg flex justify-center font-pops pb-10">
            No prices data available. But you can check for other locations.
          </p>
          <div className="flex justify-center">
            <MarketLocationNotAvailable
              user={user}
              setItems={setItems}
              setLocation={setLocation}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center md:mt-[5rem] mt-[8rem] pb-10">
        <div className="md:w-[80%] 2xl:w-[70%] z-10 md:p-6 p-3 ">
          <div className="flex items-center justify-center md:justify-between w-full md:flex-row flex-col">
            <p className="md:text-5xl text-4xl pb-4 flex sm:flex-row flex-col text-center justify-center items-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% font-bold font-pops tracking-tighter mb-4">
              Today&apos;s Price in {location}
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Info className="size-6 sm:ml-4 hidden sm:block sm:mt-0 mt-4 dark:text-white text-black" />
                </TooltipTrigger>
                <TooltipContent className="text-sm font-pops tracking-normal">
                  Daily prices of vegetables in {location}.
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
          <div className="flex justify-between md:ml-2 mb-6 text-lg md:-mt-4 md:p-0 px-1">
            <p className="flex md:justify-start text-md justify-center">
              {new Date().toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
            <Button
              variant="link"
              className="text-red-600 dark:text-red-600/90 cursor-pointer font-pops -mt-[2px] text-lg justify-end"
              onClick={() =>
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: 'smooth'
                })
              }
            >
              View other location
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 opacity-30 -z-10 min-h-full filter blur-2xl mix-blend-screen"></div>
            <div className="border dark:border-green-900 border-green-500 rounded-2xl overflow-hidden">
              <Table className="w-full rounded-2xl font-pops bg-gradient-to-tr dark:from-slate-900/90 dark:to-slate-900/90 to-60% from-zinc-50 to-teal-50">
                <TableHeader className="">
                  <TableRow className="rounded-t-2xl hover:bg-slate-200 dark:hover:bg-slate-800">
                    {tableHeader.map((item, index) => (
                      <TableHead
                        key={index}
                        className="md:p-6 p-3 font-bold md:text-2xl text-green-600"
                      >
                        {item.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-slate-200 dark:hover:bg-slate-800"
                    >
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
      <div className="mt-12 mx-auto w-[82%] lg:w-[70%] flex justify-start flex-col text-center">
        <p className="text-3xl tracking-tighter font-pops mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%">
          View price in other locations
        </p>
        <MarketLocationNotAvailable
          user={user}
          setItems={setItems}
          setLocation={setLocation}
        />
      </div>
    </>
  )
}
