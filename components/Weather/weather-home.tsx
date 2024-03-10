'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { formatDateWithDay } from '@/lib/utils'
import WeatherForecastCard from './weather-forecast-card'
import WeatherCardsSkeleton from './weather-card-skeleton'

interface ForecastData {
  list: {
    dt_txt: string
    weather: {
      main: string
      description: string
    }[]
    main: {
      temp: number
      feels_like: number
      humidity: number
      pressure: number
    }
    wind: {
      speed: number
    }
    visibility: number
  }[]
  city: {
    name: string
  }
}

export default function Weather({ user }: { user: any }) {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      <div className="flex items-center justify-center h-screen">
        <p className="p-10 bg-black border border-red-600 text-lg text-white rounded-2xl">
          Some error occurred. Please try again later.
        </p>
      </div>
    )
  }

  if (!forecastData || !forecastData.list) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="p-10 bg-black border border-green-600 text-lg text-white rounded-2xl">
          No forecast data available.
        </p>
      </div>
    )
  }

  const groupedData: { [key: string]: any[] } = {}
  forecastData.list.forEach(item => {
    const date = item.dt_txt.substring(0, 10)
    const today = new Date()
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

  const today = new Date()
  const todayDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`

  return (
    <div className="">
      {/* <Navbar session={user} /> */}
      <div className="flex flex-col items-center justify-center mt-[10rem] space-y-4 pb-10">
        <h2 className="md:text-6xl text-4xl text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% font-bold font-display mb-4">
          Forecast for {user?.userDistrict}
        </h2>
        <Tabs defaultValue={todayDate} className="w-3/4">
          <TabsList className="grid font-pops w-full md:grid-cols-4 grid-cols-2 md:h-full h-20 border dark:bg-black bg-white border-gray-500 dark:border-slate-700">
            {Object.keys(groupedData).map((date, index) => {
              return (
                <TabsTrigger key={index} value={date}>
                  {formatDateWithDay(date)}
                </TabsTrigger>
              )
            })}
          </TabsList>
          {Object.keys(groupedData).map((date, index) => (
            <TabsContent key={index} value={date}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <React.Fragment key={index}>
                  {groupedData[date].map((forecast, forecastIndex) => (
                    <WeatherForecastCard
                      key={forecastIndex}
                      forecast={forecast}
                    />
                  ))}
                </React.Fragment>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
