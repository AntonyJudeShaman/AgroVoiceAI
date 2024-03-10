import React from 'react'
import {
  Sun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Cloud,
  Haze,
  Droplet
} from 'lucide-react'
import { formatTime12hr } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '../ui/card'

function getWeatherGradientClass(weatherMain: any) {
  switch (weatherMain) {
    case 'Clear':
      return 'bg-gradient-to-br from-blue-200 to-blue-500 dark:from-blue-900 dark:to-blue-700'
    case 'Rain':
      return 'bg-gradient-to-br from-gray-500 to-gray-700 dark:from-gray-800 dark:to-gray-600'
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
      className={`rounded-lg mt-8 flex justify-center duration-500 dark:text-gray-300 dark:hover:text-white border dark:hover:border-gray-700 dark:border-gray-800 border-gray-200 hover:border-gray-300 shadow-lg p-6 ${getWeatherGradientClass(
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
                <Sun className="size-12 text-yellow-500 dark:text-yellow-300" />
              )}
              {forecast.weather[0].main === 'Rain' && (
                <CloudRain className="size-12 text-gray-500 dark:text-gray-300" />
              )}
              {forecast.weather[0].main === 'Thunderstorm' && (
                <CloudLightning className="size-12 text-yellow-500 dark:text-yellow-300" />
              )}
              {forecast.weather[0].main === 'Snow' && (
                <CloudSnow className="size-12 text-gray-500 dark:text-gray-300" />
              )}
              {forecast.weather[0].main === 'Clouds' && (
                <Cloud className="size-12 text-gray-500 dark:text-gray-300" />
              )}
              {forecast.weather[0].main === 'Mist' && (
                <Droplet className="size-12 text-gray-500 dark:text-gray-300" />
              )}
              {forecast.weather[0].main === 'Haze' && (
                <Haze className="size-12 text-gray-500 dark:text-gray-300" />
              )}
            </span>

            <div>
              <p className="text-3xl font-semibold">
                {forecast.weather[0].main}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="font-pops space-y-2">
            <p className="text-md">
              Temperature: {Math.round(forecast.main.temp - 273.15)}°C
            </p>{' '}
            <p className="text-md">
              Feels like: {Math.round(forecast.main.feels_like - 273.15)}°C
            </p>
            <p className="text-md">Humidity: {forecast.main.humidity}%</p>
            <p className="text-md">Wind Speed: {forecast.wind.speed} m/s</p>
            <p className="text-md">
              Visibility: {Math.round(forecast.visibility / 1000)} km
            </p>
            <p className="text-md">Pressure: {forecast.main.pressure} hPa</p>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default WeatherForecastCard
