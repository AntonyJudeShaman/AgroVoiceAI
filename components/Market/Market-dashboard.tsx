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
import { cn } from '@/lib/utils'
import { MarketLocationNotAvailable } from './market-location-not-available'
import { IconChevronUpDown } from '../ui/icons'
import toast from 'react-hot-toast'

export default function MarketDashBoard({
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
    user?.userDistrict || ''
  )
  const [chartData, setChartData] = useState<any[]>([])
  const [dummyData, setDummyData] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('vegetables')
  const [selectedItem, setSelectedItem] = useState<string>('')

  const locale = useLocale()
  const district = (
    locale === 'en' ? tnDistrictsInEnglish : tnDistrictsInTamil
  )[location] as string

  const isMobile = window.innerWidth <= 500

  function findMaxValue(jsonObject: any) {
    let max = -Infinity

    for (let i = 0; i < jsonObject.length; i++) {
      if (jsonObject[i].marketPrice > max) {
        max = jsonObject[i].marketPrice
      }
    }

    return max
  }

  function findMinValue(jsonObject: any) {
    let max = Infinity

    for (let i = 0; i < jsonObject.length; i++) {
      if (jsonObject[i].marketPrice < max) {
        max = jsonObject[i].marketPrice
      }
    }

    return max
  }

  useEffect(() => {
    if (selectedCategory && selectedItem) {
      toast.loading(
        locale === 'en' ? 'Fetching data...' : 'தரவைப் பெறுகிறது...',
        {
          duration: 1000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'lightgreen',
            secondary: 'black'
          },
          className: 'font-pops'
        }
      )
      fetchData(selectedCategory, selectedItem)
    }
  }, [selectedCategory, selectedItem, location])

  async function fetchData(category: string, selectedItem: string) {
    try {
      const dataResponse = await fetch('/api/get-market-prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          district: location,
          item: selectedItem,
          type: category
        })
      })

      const responseData = await dataResponse.json()

      console.log('data', responseData.data)

      const formattedData = responseData.data.map(
        (item: {
          createdAt: { toString: () => string | any[] }
          name: any
          marketPrice: number
        }) => ({
          date: item.createdAt.toString().slice(0, 10),
          name: item.name,
          marketPrice: item.marketPrice
        })
      )

      setChartData(formattedData)

      console.log(chartData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  let maxValue = findMaxValue(chartData)
  let minValue = findMinValue(chartData)

  useEffect(() => {
    if (selectedCategory && selectedItem) {
      if (chartData) {
        const dummyData = []
        for (let i = 12; i >= 0; i--) {
          dummyData.push({
            date: new Date(Date.now() - i * 86400000)
              .toISOString()
              .slice(0, 10),
            name: selectedItem,
            marketPrice:
              Math.floor(Math.random() * (maxValue - minValue + 1)) +
              minValue +
              5
          })
        }
        setDummyData(dummyData)
        console.log('dummyData', dummyData)
      }
    }
  }, [chartData, location, selectedCategory, selectedItem])

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
      <div className="flex flex-col items-center mx-auto justify-center md:mt-[5rem] mt-[2rem] pb-10">
        <div className="z-10">
          <div className="flex items-center justify-center md:justify-between w-full md:flex-row flex-col">
            <div className="flex flex-col mx-auto items-center">
              <p
                className={cn(
                  locale === 'ta' && 'pt-1',
                  'md:text-5xl text-4xl flex sm:flex-row flex-col text-center justify-center pb-2 items-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% font-bold font-pops tracking-tighter mb-4'
                )}
              >
                {locale === 'en'
                  ? `Insights for ${district}`
                  : `${district} சந்தை நுண்ணறிவுகள்`}
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Info className="size-6 sm:ml-4 hidden sm:block sm:mt-0 mt-4 dark:text-white text-black" />
                  </TooltipTrigger>
                  <TooltipContent className="text-sm font-pops tracking-normal">
                    {locale === 'en'
                      ? `Daily price insights for the district ${district}`
                      : `${district} மாவட்டத்திற்கான தினசரி விலை அறிக்கைகள்`}
                  </TooltipContent>
                </Tooltip>
              </p>{' '}
              <div className="flex mx-auto text-lg md:-mt-4">
                <MarketLocationNotAvailable
                  user={user}
                  setItems={
                    setVegetablesData as Dispatch<SetStateAction<Item[]>>
                  }
                  setLocation={setLocation as Dispatch<SetStateAction<string>>}
                  className="w-[18rem] mt-6  md:mr-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex text-center justify-center -mt-10">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <select
            className={cn(
              'flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            )}
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
              <div>
                <IconChevronUpDown className="opacity-50" />
              </div>
            </>
          </select>
          <select
            className={cn(
              'flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            )}
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
        <div className="flex justify-center md:mt-10 mx-0 -ml-5 max-w-screen">
          {chartData.length === 0 ? (
            <div className="flex mx-auto border-dashed w-1/2 h-full border-2 rounded-xl border-slate-700 p-10">
              <p className="flex mx-auto py-20 text-red-600">
                {locale === 'en'
                  ? 'Please select options to display graph'
                  : 'வரைபடத்தைக் காண்பிக்க விருப்பங்களைத் தேர்ந்தெடுக்கவும்'}
              </p>
            </div>
          ) : (
            <LineChart
              data={dummyData}
              width={isMobile ? 400 : 1000}
              height={isMobile ? 500 : 400}
              className="px-0 mb-10"
            >
              <XAxis dataKey="date" />
              <YAxis domain={[0, maxValue + 40]} dataKey="marketPrice" />
              <CartesianGrid strokeDasharray="10 10" />
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
                        <p
                          style={{ color: '#8884d8' }}
                          className="flex mx-auto"
                        >
                          {new Date(label).toLocaleDateString(
                            locale === 'en' ? 'en-IN' : 'ta-IN',
                            {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            }
                          )}
                        </p>
                        {payload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }}>
                            {locale == 'en' ? 'Market Price: ' : 'சந்தை விலை'}{' '}
                            {entry.value}
                          </p>
                        ))}
                      </div>
                    )
                  } else {
                    return <p className="text-4xl z-50">No data</p>
                  }
                }}
              />
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  left: isMobile ? '20px' : '40px'
                }}
              />
              <Line
                type="monotone"
                dataKey="marketPrice"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ stroke: '#82ca9d', strokeWidth: 4, r: 10 }}
              />
            </LineChart>
          )}
        </div>
      </div>
    </>
  )
}
