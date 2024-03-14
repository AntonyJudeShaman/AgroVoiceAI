import React from 'react'
import {
  Sun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Cloud,
  Haze,
  Droplet,
  ThermometerSun,
  SunSnow,
  Droplets,
  Wind,
  GaugeCircle
} from 'lucide-react'
import { formatTime12hr } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '../ui/card'

function getWeatherGradientClass(weatherMain: any) {
  switch (weatherMain) {
    case 'Clear':
      return 'bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-900 dark:to-blue-700'
    case 'Rain':
      return 'bg-gradient-to-br from-green-300 to-green-500 dark:from-green-800 dark:to-green-600'
    case 'Thunderstorm':
      return 'bg-gradient-to-br from-gray-200 to-brown-500 dark:from-gray-700 dark:to-brown-300'
    case 'Snow':
      return 'bg-gradient-to-br from-white to-white/80 dark:from-gray-700 dark:to-gray-500'
    case 'Haze':
      return 'bg-gradient-to-br from-yellow-300 to-yellow-500 dark:from-yellow-600 dark:to-yellow-800'
    case 'Mist':
      return 'bg-gradient-to-br from-purple-200 to-purple-400 dark:from-purple-400 dark:to-purple-800'
    default:
      return 'bg-gradient-to-br dark:from-slate-800 dark:to-slate-900/90 to-60% from-zinc-300 to-indigo-100/30'
  }
}

function WeatherForecastCard({ forecast, forecastIndex }: any) {
  return (
    <Card
      className={`rounded-lg mt-8 flex justify-center duration-500 dark:text-gray-300 dark:hover:text-white border dark:hover:border-green-200 dark:border-gray-800 border-gray-200 hover:border-green-900 shadow-lg lg:p-4 p-3 ${getWeatherGradientClass(
        forecast.weather[0].main
      )}`}
      key={forecastIndex}
    >
      <div className="gap-8">
        <CardHeader>
          <p className="text-sm">
            {formatTime12hr(forecast.dt_txt.substring(11, 16))}
          </p>
          <div className="flex items-center">
            <span className="mr-4">
              {forecast.weather[0].main === 'Clear' && (
                <Sun className="size-12 text-yellow-400 dark:text-yellow-400" />
              )}
              {forecast.weather[0].main === 'Rain' && (
                <CloudRain className="size-12 text-green-900 dark:text-green-400" />
              )}
              {forecast.weather[0].main === 'Thunderstorm' && (
                <CloudLightning className="size-12 text-yellow-500 dark:text-yellow-300" />
              )}
              {forecast.weather[0].main === 'Snow' && (
                <CloudSnow className="size-12 text-gray-500 dark:text-gray-300" />
              )}
              {forecast.weather[0].main === 'Clouds' && (
                <Cloud className="size-12 text-blue-700 dark:text-blue-500" />
              )}
              {forecast.weather[0].main === 'Mist' && (
                <Droplet className="size-12 text-gray-500 dark:text-gray-300" />
              )}
              {forecast.weather[0].main === 'Haze' && (
                <Haze className="size-12 text-gray-500 dark:text-gray-300" />
              )}
            </span>

            <div>
              <p className="flex flex-col">
                <span className="text-3xl font-semibold">
                  {forecast.weather[0].main}
                </span>
                <span className="text-sm pl-1">
                  {' '}
                  {forecast.weather[0].description}
                </span>{' '}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="font-pops space-y-2">
            <p className="text-md flex items-center">
              <ThermometerSun className="size-5 mr-2" /> Temperature:{' '}
              {Math.round(forecast.main.temp - 273.15)}°C
            </p>{' '}
            <p className="text-md flex items-center">
              <SunSnow className="size-5 mr-2" /> Feels like:{' '}
              {Math.round(forecast.main.feels_like - 273.15)}°C
            </p>
            <p className="text-md flex items-center">
              <Droplets className="size-5 mr-2" /> Humidity:{' '}
              {forecast.main.humidity}%
            </p>
            <p className="text-md flex items-center">
              <Wind className="size-5 mr-2" /> Wind Speed: {forecast.wind.speed}{' '}
              m/s
            </p>
            <p className="text-md flex items-center">
              <GaugeCircle className="size-5 mr-2" /> Pressure:{' '}
              {forecast.main.pressure} hPa
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default WeatherForecastCard
