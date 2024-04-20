'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip as RechartsTooltip
} from 'recharts'
import MarketTableSkeleton from './market-table-skeleton'
import { useLocale } from 'next-intl'
import { Button } from '../ui/button'
import { Info } from 'lucide-react'
import { Item, MarketProps } from '@/lib/types'
import { TooltipContent, Tooltip, TooltipTrigger } from '../ui/tooltip'
import {
  tnDistrictsInEnglish,
  tnDistrictsInTamil,
  vegetableNamesInEnglish,
  vegetableNamesInTamil,
  fruitsNamesInEnglish,
  fruitsNamesInTamil
} from '@/config/constants'
import { MarketLocationNotAvailableFruits } from './market-location-not-available-fruits'
import { cn } from '@/lib/utils'

function MarketHomeFruitsGraph({
  user,
  loading,
  fruitsData,
  vegetablesData,
  fruitsError,
  vegetablesError,
  setFruitsData,
  setVegetablesData
}: MarketProps & {
  fruitsData: Item[]
  vegetablesData: Item[]
  fruitsError: string | null
  vegetablesError: string | null
  setFruitsData: Dispatch<SetStateAction<Item[]>>
  setVegetablesData: Dispatch<SetStateAction<Item[]>>
}) {
  const [location, setLocation] = useState<keyof typeof tnDistrictsInEnglish>(
    user?.userDistrict
  )
  const [chartData, setChartData] = useState<any[]>([])
  const [dummyData, setDummyData] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('vegetables')
  const [selectedItem, setSelectedItem] = useState<string>('')
  const isMobile = window.innerWidth <= 768
  const locale = useLocale()
  const district = (
    locale === 'en' ? tnDistrictsInEnglish : tnDistrictsInTamil
  )[location] as string
  const marketPrice = locale === 'en' ? 'Market Price' : 'சந்தை விலை'

  useEffect(() => {
    console.log('chartData:', chartData)
  }, [chartData])

  useEffect(() => {
    const fetchData = () => {
      const newData = generateDummyData(selectedCategory, selectedItem)
      console.log('dummyData: ', newData)
      setDummyData(newData)
    }
    fetchData()
  }, [selectedCategory, selectedItem])

  useEffect(() => {
    if (dummyData && dummyData.length) {
      const dataForChart = dummyData.map(item => ({
        name: item.date,
        [marketPrice]: item.marketPrice
      }))
      setChartData(dataForChart)
    }
  }, [dummyData, marketPrice])

  const generateDummyData = (category: string, selectedItem: string) => {
    const data = category === 'vegetables' ? vegetablesData : fruitsData

    const filteredData = data.filter(item => item.name === selectedItem)

    const today = new Date()
    const dates = []
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      dates.push(date.toLocaleDateString())
    }

    const formattedData = dates.map(date => {
      const dummyItem = filteredData.length
        ? filteredData[0]
        : { name: selectedItem, marketPrice: '0' }
      const randomPrice = Math.random() * (10 - 1) + 1
      return {
        date,
        name:
          locale === 'en'
            ? vegetableNamesInEnglish[
                dummyItem.name as keyof typeof vegetableNamesInEnglish
              ] ||
              fruitsNamesInEnglish[
                dummyItem.name as keyof typeof fruitsNamesInEnglish
              ]
            : vegetableNamesInTamil[
                dummyItem.name as keyof typeof vegetableNamesInTamil
              ] ||
              fruitsNamesInTamil[
                dummyItem.name as keyof typeof fruitsNamesInTamil
              ],
        marketPrice: parseFloat(randomPrice.toFixed(2))
      }
    })

    return formattedData
  }

  if (loading) {
    return <MarketTableSkeleton />
  }

  if (fruitsError || vegetablesError) {
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

  const fruitsOptions = fruitsData.map(item => ({
    label:
      locale === 'en'
        ? fruitsNamesInEnglish[item.name as keyof typeof fruitsNamesInEnglish]
        : fruitsNamesInTamil[item.name as keyof typeof fruitsNamesInTamil],
    value: item.name
  }))

  const vegetablesOptions = vegetablesData.map(item => ({
    label:
      locale === 'en'
        ? vegetableNamesInEnglish[
            item.name as keyof typeof vegetableNamesInEnglish
          ]
        : vegetableNamesInTamil[
            item.name as keyof typeof vegetableNamesInTamil
          ],
    value: item.name
  }))

  return (
    <>
      <div className="flex flex-col items-center justify-center md:mt-[5rem] mt-[8rem] pb-10">
        <div className="md:w-[80%] 2xl:w-[70%] z-10">
          <div className="flex items-center justify-center md:justify-between w-full md:flex-row flex-col">
            <div className="flex flex-row items-center">
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
                      ? `Daily prices of ${selectedCategory === 'vegetables' ? 'vegetables' : 'fruits'} in ${district}`
                      : `${district} சந்தை இன்று காய்கறிகளின் தினசரி விலை`}
                  </TooltipContent>
                </Tooltip>
              </p>
            </div>
          </div>
          <div className="flex justify-between md:ml-1 ml-2 mb-6 text-lg md:-mt-4 md:p-0 px-1">
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
            <Button
              variant="link"
              className="text-red-600 shadow-none dark:text-red-600/90 cursor-pointer font-pops -mt-[2px] text-lg justify-end px-0 mr-2 md:mr-0 after:bg-current"
              onClick={() =>
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: 'smooth'
                })
              }
            >
              {locale === 'en' ? 'View other locations' : 'பிற இடங்களைக் காண'}
            </Button>
          </div>
        </div>
      </div>

      <div className=" mx-auto w-[82%] lg:w-[70%] flex  text-center">
        <div className="flex flex-col md:flex-row relative">
          <select
            className="p-2 rounded-md shadow-md focus:outline-none bg-background border border-gray-300 mr-4 mb-4"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <>
              <option value="vegetables">
                {locale === 'en' ? 'Vegetables' : 'காய்கறிகள்'}
              </option>
              <option value="fruits">
                {locale === 'en' ? 'Fruits' : 'பழங்கள்'}
              </option>
            </>
          </select>
          <select
            className="p-2 rounded-md shadow-md focus:outline-none bg-background border border-gray-300 mb-4"
            value={selectedItem}
            onChange={e => setSelectedItem(e.target.value)}
          >
            <option value="">
              {locale === 'en' ? 'Select Item' : 'பொருளைத் தேர்ந்தெடுக்கவும்'}
            </option>
            {selectedCategory === 'vegetables'
              ? vegetablesOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              : fruitsOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
          </select>
        </div>
      </div>

      <div className="flexl items-center justify-center md:p-0 p-6 mx-auto">
        <div className="flex justify-center mt-10 mx-auto">
          <LineChart
            width={isMobile ? 300 : 800}
            height={isMobile ? 200 : 400}
            data={chartData}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <RechartsTooltip
              content={({ label, payload }) => {
                if (payload && payload.length) {
                  return (
                    <div
                      style={{
                        backgroundColor: '#fff',
                        padding: '10px',
                        border: '1px solid #ccc'
                      }}
                    >
                      <p style={{ color: '#8884d8' }}> {label}</p>
                      {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                          {entry.name}: {entry.value}
                        </p>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={marketPrice}
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{
                stroke: '#82ca9d',
                strokeWidth: 2,
                r: 5
              }}
            />
          </LineChart>
        </div>
      </div>

      <div className="mt-12 mx-auto w-[82%] lg:w-[70%] flex justify-start flex-col text-center">
        <p className="text-3xl tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%">
          {locale === 'en' ? 'View in other locations' : 'பிற இடங்களில் காண'}
        </p>
        <MarketLocationNotAvailableFruits
          user={user}
          setItems={setFruitsData}
          setLocation={setLocation as Dispatch<SetStateAction<string>>}
          className="w-full"
        />
      </div>
    </>
  )
}

export default MarketHomeFruitsGraph
