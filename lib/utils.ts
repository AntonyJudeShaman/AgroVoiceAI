import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const chatid = customAlphabet('0123456789abcdef', 32)

export const nanoid = () => {
  const nanoidString = chatid()
  return `${nanoidString.slice(0, 8)}-${nanoidString.slice(8, 12)}-${nanoidString.slice(12, 16)}-${nanoidString.slice(16, 20)}-${nanoidString.slice(20)}`
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function formatDateWithDay(date: string | undefined): string {
  const [day, month, year] = date!.split('-')
  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day))

  const dayOfWeek = parsedDate.toLocaleDateString('en-US', { weekday: 'long' })

  return `${dayOfWeek}, ${date!.substring(0, 2)}`
}

export function formatTime12hr(time: string): string {
  const [hour, minute] = time.split(':')
  let hour12: number = parseInt(hour, 10)
  const suffix: string = hour12 >= 12 ? 'PM' : 'AM'
  hour12 = hour12 % 12 || 12
  return `${hour12}:${minute} ${suffix}`
}

export function getWeatherGradientClass(weatherMain: any) {
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
