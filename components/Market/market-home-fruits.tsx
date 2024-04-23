'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import {
  fruitsNamesInEnglish,
  fruitsNamesInTamil,
  marketTableHeaderInEnglish,
  marketTableHeaderInTamil,
  tnDistrictsInEnglish,
  tnDistrictsInTamil
} from '@/config/constants'
import { cn, parseItems } from '@/lib/utils'
import { Item, MarketProps } from '@/lib/types'
import { Button } from '../ui/button'
import { MarketLocationNotAvailable } from './market-location-not-available'
import MyToast from '../ui/my-toast'
import { useLocale } from 'next-intl'
import { MarketLocationNotAvailableFruits } from './market-location-not-available-fruits'

export default function MarketHomeFruits({
  user,
  items,
  loading,
  error,
  setItems
}: MarketProps) {
  const [location, setLocation] = useState<keyof typeof tnDistrictsInEnglish>(
    user?.userDistrict
  )

  // setItems(marketItems)

  const locale = useLocale()

  const district = (
    locale === 'en' ? tnDistrictsInEnglish : tnDistrictsInTamil
  )[location] as string

  if (loading) {
    return <MarketTableSkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[95vh] md:w-[60%] md:p-0 p-6 -mt-40 mx-auto">
        <div className="md:p-10 p-6 w-full bg-gray-50 dark:bg-gray-950 border border-red-600/80 text-lg text-white rounded-2xl">
          <p className="md:text-2xl text-center text-lg text-red-600 flex justify-center font-pops">
            {locale === 'en'
              ? 'Data might not be available for your location.'
              : 'உங்கள் இருப்பிடத்திற்கான தரவு கிடைக்கவில்லை.'}
          </p>
        </div>
      </div>
    )
  }
  if (!items || !items.length) {
    return (
      <div className="flex items-center justify-center h-[95vh] md:w-[60%] md:p-0 p-6 -mt-40 mx-auto">
        <div className="md:p-10 p-6 w-full bg-gray-50 dark:bg-gray-950 border border-green-600/60 dark:border-green-800/60 text-lg text-white rounded-2xl">
          <p className="md:text-2xl text-center dark:text-red-500 text-red-600 text-lg flex justify-center font-pops pb-10">
            {locale === 'en'
              ? 'No prices data available. But you can check for other locations.'
              : 'விலை தரவு கிடைக்கவில்லை. ஆனால் மற்ற இருப்பிடங்களைச் பார்க்கலாம்.'}
          </p>
          <div className="flex justify-center">
            <MarketLocationNotAvailableFruits
              user={user}
              setItems={setItems!}
              setLocation={setLocation as Dispatch<SetStateAction<string>>}
              className="w-full"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center md:mt-[5rem] mt-[8rem] pb-10">
        <div className="md:w-[80%] 2xl:w-[70%] z-10">
          <div className="flex items-center justify-center md:justify-between w-full md:flex-row flex-col">
            <p
              className={cn(
                locale === 'ta' && 'pt-1',
                'md:text-5xl text-4xl pb-4 flex sm:flex-row flex-col text-center justify-center items-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% font-bold font-pops tracking-tighter mb-4'
              )}
            >
              {locale === 'en'
                ? `Today's Price in ${district}`
                : `${district} சந்தை விலைகள்`}
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Info className="size-6 sm:ml-4 hidden sm:block sm:mt-0 mt-4 dark:text-white text-black" />
                </TooltipTrigger>
                <TooltipContent className="text-sm font-pops tracking-normal">
                  {locale === 'en'
                    ? `Daily prices of vegetables in ${district}`
                    : `${district} சந்தை இன்று காய்கறிகளின் தினசரி விலை`}
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
          <div className="flex justify-between items-center md:ml-1 ml-2 text-lg md:-mt-10 md:p-0">
            <p className="flex md:justify-start text-md justify-center">
              {new Date().toLocaleDateString(
                `${locale === 'en' ? 'en-IN' : 'ta-IN'}`,
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }
              )}
            </p>
            <MarketLocationNotAvailableFruits
              user={user}
              setItems={setItems!}
              setLocation={setLocation as Dispatch<SetStateAction<string>>}
              className="md:w-[18rem] w-2/3 mt-6  md:mr-0"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 opacity-30 -z-10 min-h-full filter blur-2xl mix-blend-screen"></div>
            <div className="border dark:border-green-900 border-green-500 rounded-2xl overflow-hidden">
              <Table className="w-full rounded-2xl font-pops bg-gradient-to-tr dark:from-slate-900/90 dark:to-slate-900/90 to-60% from-zinc-50 to-teal-50">
                <TableHeader className="">
                  <TableRow className="rounded-t-2xl hover:bg-slate-200 dark:hover:bg-slate-800">
                    {(locale === 'en'
                      ? marketTableHeaderInEnglish
                      : marketTableHeaderInTamil
                    ).map((item, index) => (
                      <TableHead
                        key={index}
                        className="md:p-6 p-3 font-bold font-bricol md:text-2xl text-green-600"
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
                      <TableCell className="md:p-6 p-3 md:text-md text-xs">
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {locale === 'en'
                            ? fruitsNamesInEnglish[
                                item.name as keyof typeof fruitsNamesInEnglish
                              ]
                            : fruitsNamesInTamil[
                                item.name as keyof typeof fruitsNamesInTamil
                              ]}
                        </motion.div>
                      </TableCell>
                      <TableCell className="md:p-6 p-3 md:text-md text-xs">
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {locale === 'en' ? 'Kg / Pcs' : 'கிலோ / பீஸ்'}
                        </motion.div>
                      </TableCell>
                      <TableCell className="md:p-6 p-3 md:text-md text-xs">
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {item.marketPrice.substring(2)}
                        </motion.div>
                      </TableCell>
                      <TableCell className="md:p-6 p-3 md:text-md text-xs">
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
        <p className="text-3xl tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%">
          {locale === 'en'
            ? 'View price in other locations'
            : 'பிற இடங்களில் விலையைக் காண'}
        </p>
        <MarketLocationNotAvailableFruits
          user={user}
          setItems={setItems!}
          setLocation={setLocation as Dispatch<SetStateAction<string>>}
          className="w-full"
        />
      </div>
    </>
  )
}
