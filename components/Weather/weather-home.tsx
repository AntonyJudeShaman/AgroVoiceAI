'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { cn, formatDateWithDay } from '@/lib/utils'
import WeatherForecastCard from './weather-forecast-card'
import WeatherCardsSkeleton from './weather-card-skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { WeatherLocationNotAvailable } from './weather-location-not-available'
import { ForecastData } from '@/lib/types'
import { Button } from '../ui/button'
import { useLocale } from 'next-intl'
import { tnDistrictsInEnglish, tnDistrictsInTamil } from '@/config/constants'

export default function Weather({ user }: { user: any }) {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<keyof typeof tnDistrictsInEnglish>(
    user?.userDistrict
  )
  const [date, setDate] = useState<string>('')
  const locale = useLocale()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/weather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ location: user?.userDistrict })
        })

        if (!res.ok) {
          throw new Error('Failed to fetch weather data')
        }

        const forecastData = await res.json()
        setForecastData(forecastData)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <WeatherCardsSkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center  h-[95vh] md:w-[60%] md:p-0 p-6 -mt-40 mx-auto">
        <div className="md:p-10 p-6 w-full bg-gray-50 dark:bg-gray-950 border border-red-600/80 text-lg text-white rounded-2xl">
          <p className="md:text-2xl text-center text-lg text-red-600 flex justify-center font-pops">
            {locale === 'en'
              ? 'Some error occurred. Please try again later.'
              : 'சில பிழை ஏற்பட்டுள்ளது. தயவுசெய்து பின்னூட்டம் முயற்சிக்கவும்.'}
          </p>
        </div>
      </div>
    )
  }

  if (!forecastData || !forecastData.list) {
    return (
      <div className="flex items-center justify-center h-[95vh] md:w-[60%] md:p-0 p-6 -mt-40 mx-auto">
        <div className="md:p-10 p-6 w-full bg-gray-50 dark:bg-gray-950 border border-green-600/60 dark:border-green-800/60 text-lg text-white rounded-2xl">
          <p className="md:text-2xl text-center dark:text-white text-black text-lg flex justify-center font-pops pb-10">
            {locale === 'en'
              ? 'No forecast data available. But you can check for other locations.'
              : 'முன்னறிவிப்பு தரவு கிடைக்கவில்லை. ஆனால் நீங்கள் பிற இடங்களைச் சரிபார்க்கலாம்.'}
          </p>
          <div className="flex justify-center">
            <WeatherLocationNotAvailable
              user={user}
              setForecastData={setForecastData}
              setLocation={setLocation as Dispatch<SetStateAction<string>>}
              className="w-full"
            />
          </div>
        </div>
      </div>
    )
  }

  const today = new Date()
  const groupedData: { [key: string]: any[] } = {}
  forecastData.list.forEach(item => {
    const date = item.dt_txt.substring(0, 10)
    const forecastDate = new Date(date)

    const daysDifference = Math.ceil(
      (forecastDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    )
    if (daysDifference >= 0 && daysDifference < 4) {
      const formattedDate = `${('0' + forecastDate.getDate()).slice(-2)}-${('0' + (forecastDate.getMonth() + 1)).slice(-2)}-${forecastDate.getFullYear()}`

      if (!groupedData[formattedDate]) {
        groupedData[formattedDate] = []
      }
      groupedData[formattedDate].push(item)
    }
  })

  const todayDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`

  const district = (
    locale === 'en' ? tnDistrictsInEnglish : tnDistrictsInTamil
  )[location] as string

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[5rem] pb-10">
        <div className="flex items-center justify-center md:justify-between w-3/4 md:flex-row flex-col">
          <p
            className={cn(
              locale === 'ta' && 'pt-1',
              'md:text-5xl 2xl:text-6xl text-5xl pb-4 flex sm:flex-row flex-col text-center justify-center items-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% font-bold font-pops tracking-tighter mb-4'
            )}
          >
            {locale === 'en' ? `Weather in ${district}` : `${district} வானிலை`}
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Info className="size-6 sm:ml-4 hidden sm:block sm:mt-0 mt-4 dark:text-white text-black" />
              </TooltipTrigger>
              <TooltipContent className="text-sm font-pops tracking-normal">
                {locale === 'en'
                  ? `Weather forecast for 4 days in ${location}`
                  : `${district} 4 நாட்கள் வானிலை முன்னறிவிப்பு`}
              </TooltipContent>
            </Tooltip>
          </p>
          <div className="md:pt-[3rem] -pb-[5rem]">
            <WeatherLocationNotAvailable
              user={user}
              setForecastData={setForecastData}
              setLocation={setLocation as Dispatch<SetStateAction<string>>}
              className="w-[18rem] md:mr-0"
            />
          </div>
        </div>
        <Tabs defaultValue={todayDate} className="w-3/4">
          <TabsList className="grid font-pops w-full md:grid-cols-4 md:-mt-[3rem] -mt-[3rem] grid-cols-2 md:h-full h-auto border dark:bg-black bg-white border-gray-500 dark:border-slate-700">
            {Object.keys(groupedData).map((date, index) => {
              return (
                <TabsTrigger key={index} value={date}>
                  {formatDateWithDay(date, locale === 'en' ? 'en-IN' : 'ta-IN')}
                </TabsTrigger>
              )
            })}
          </TabsList>
          {Object.keys(groupedData).map((date, index) => (
            <TabsContent key={index} value={date}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                <React.Fragment key={index}>
                  {groupedData[date].map((forecast, forecastIndex) => (
                    <motion.div
                      key={forecastIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: forecastIndex * 0.15 }}
                    >
                      <WeatherForecastCard
                        key={forecastIndex}
                        forecast={forecast}
                      />
                    </motion.div>
                  ))}
                </React.Fragment>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
