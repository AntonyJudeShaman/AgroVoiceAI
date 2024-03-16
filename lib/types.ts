import { type Message } from 'ai'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type NavConfig = {
  mainNav: MainNavItem[]
}

export type Item = {
  name: string
  unit: string
  marketPrice: string
  retailPrice: string
  mallPrice: string
}

export type ForecastData = {
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
