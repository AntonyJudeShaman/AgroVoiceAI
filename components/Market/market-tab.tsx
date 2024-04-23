'use client'
import React, { useState, useEffect } from 'react'
import { getCurrentUser } from '@/app/actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getTranslations } from 'next-intl/server'
import MarketHomeFruits from './market-home-fruits'
import MarketHomeVegetables from './market-home-vegetables'
import { useLocale } from 'next-intl'
import { Item } from '@/lib/types'
import { tnDistrictsInEnglish } from '@/config/constants'
import { parseItems } from '@/lib/utils'
import MyToast from '../ui/my-toast'
import MarketHomeFruitsGraph from './Market-dashboard'

export const MarketsTab = ({ user }: { user: any }): JSX.Element => {
  const [vegetablesData, setVegetablesData] = useState<Item[]>([])
  const [fruitsData, setFruitsData] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [vegetablesError, setVegetablesError] = useState<string | null>(null)
  const [fruitsError, setFruitsError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const locale = useLocale()

  useEffect(() => {
    async function fetchData() {
      try {
        const vegetablesResponse = await fetch('/api/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ location: user?.userDistrict })
        })

        const fruitsResponse = await fetch('/api/scrape/fruits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ location: user?.userDistrict })
        })

        if (vegetablesResponse) {
          const vegetablesRes = await vegetablesResponse.json()
          // console.log('after fetch', vegetablesRes)
          setVegetablesData(parseItems(vegetablesRes.scrapedData))
        } else {
          MyToast({
            message:
              locale === 'en'
                ? 'Failed to fetch prices. Please try again later.'
                : 'விலைகளைப் பெற முடியவில்லை. பின்னர் முயற்சிக்கவும்.',
            type: 'error'
          })
        }
        if (fruitsResponse) {
          const fruitsRes = await fruitsResponse.json()
          // console.log('after fetch fruits', fruitsRes)
          setFruitsData(parseItems(fruitsRes.scrapedData))
        } else {
          MyToast({
            message:
              locale === 'en'
                ? 'Failed to fetch prices. Please try again later.'
                : 'விலைகளைப் பெற முடியவில்லை. பின்னர் முயற்சிக்கவும்.',
            type: 'error'
          })
        }
      } catch (error) {
        MyToast({
          message:
            locale === 'en'
              ? 'Failed to fetch prices. Please try again later.'
              : 'விலைகளைப் பெற முடியவில்லை. பின்னர் முயற்சிக்கவும்.',
          type: 'error'
        })
        setError('aa')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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

  // console.log('vdata', vegetablesData)
  // console.log('fdata', fruitsData)

  return (
    <>
      <Tabs defaultValue="vegetables" className="w-full px-4">
        <TabsList className="grid font-pops md:w-[80%] 2xl:w-[70%] mx-auto grid-cols-3 border dark:bg-black bg-white border-gray-500 dark:border-slate-700">
          <TabsTrigger value="vegetables">
            {locale === 'en' ? 'Vegetables' : 'காய்கறிகள்'}
          </TabsTrigger>
          <TabsTrigger value="fruits">
            {locale === 'en' ? 'Fruits' : 'பழங்கள்'}
          </TabsTrigger>
          <TabsTrigger value="graph">
            {locale === 'en' ? 'Insights' : 'நுண்ணறிவு'}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="vegetables">
          <MarketHomeVegetables
            user={user}
            error={vegetablesError}
            items={vegetablesData}
            loading={loading}
            setItems={setVegetablesData}
          />
        </TabsContent>
        <TabsContent value="fruits">
          <MarketHomeFruits
            user={user}
            error={fruitsError}
            items={fruitsData}
            loading={loading}
            setItems={setFruitsData}
          />
        </TabsContent>
        <TabsContent value="graph">
          {' '}
          <MarketHomeFruitsGraph
            user={user}
            fruitsData={fruitsData}
            vegetablesData={vegetablesData}
            loading={loading}
            fruitsError={fruitsError}
            vegetablesError={vegetablesError}
            setFruitsData={setFruitsData}
            setVegetablesData={setVegetablesData}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}
