import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'
import { Item } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const chatid = customAlphabet('0123456789abcdef', 32)

export async function getWeatherData(location: string) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    { next: { revalidate: 60 } }
  ).then(res => res.json())
}

export const nanoid = () => {
  const nanoidString = chatid()
  return `${nanoidString.slice(0, 8)}-${nanoidString.slice(8, 12)}-${nanoidString.slice(12, 16)}-${nanoidString.slice(16, 20)}-${nanoidString.slice(20)}`
}

export function speak(text: string, locale: string) {
  const utterance = new SpeechSynthesisUtterance(text)

  // Get available voices
  const voices = window.speechSynthesis.getVoices()

  // Select a default voice (for example, the first available voice)
  const defaultVoice = voices.find(voice => voice.lang === locale)

  if (defaultVoice) {
    utterance.voice = defaultVoice
  } else {
    console.error('No default voice available.')
  }

  window.speechSynthesis.speak(utterance)
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

export const formatDateFromMS = (milliseconds: number): string => {
  const date = new Date(milliseconds)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

export function formatDateWithDay(date: any, locale: string): string {
  const [day, month, year] = date!.split('-')
  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day))

  const dayOfWeek = parsedDate.toLocaleDateString(locale, { weekday: 'long' })

  return `${dayOfWeek}, ${date!.substring(0, 2)}`
}

export function formatTime12hr(time: string): string {
  const [hour, minute] = time.split(':')
  let hour12: number = parseInt(hour, 10)
  const suffix: string = hour12 >= 12 ? 'PM' : 'AM'
  hour12 = hour12 % 12 || 12
  return `${hour12}:${minute} ${suffix}`
}

export function parseItems(scrapedData: string[]): Item[] {
  const items: Item[] = []

  for (const entry of scrapedData) {
    if (entry.trim() !== '') {
      const parts = entry.split(',')
      const name = parts.slice(0, -4).join(',').trim()
      const unit = parts[parts.length - 4].trim()
      const marketPrice = parts[parts.length - 3].trim()
      const retailPrice = parts[parts.length - 2].trim()
      const mallPrice = parts[parts.length - 1].trim()

      items.push({
        name,
        unit,
        marketPrice,
        retailPrice,
        mallPrice
      })
    }
  }

  return items
}

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

export const hashPassword = async (pswd: string) => {
  const encoder = new TextEncoder()
  const saltedPassword = encoder.encode(pswd + process.env.SALT)
  const hashedPasswordBuffer = await crypto.subtle.digest(
    'SHA-512',
    saltedPassword
  )
  return getStringFromBuffer(hashedPasswordBuffer)
}

export const getPathFromUrl = (url: string) => {
  const parts = url.split('/')
  const path = parts.pop()
  return path
}
