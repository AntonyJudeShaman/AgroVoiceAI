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
  icon?: React.ReactNode
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

export type AccountProps = {
  title: string
  details: string
  placeholder1: string
  placeholder2: string
  register?: string
  signin?: string
  username: string
  pswd: string
  forgot?: string
}

export type NavbarProps = {
  session?: any
  title?: string
  home: string
  chat: string
  weather: string
  market: string
  settings: string
  pest: string
  signin?: string
  signup?: string
  logout?: string
  explore?: string
  download?: string
}

export type SettingsProps = {
  user?: any
  title: string
  description: string
  save: string
  upload?: string
  remove?: string
  cancel?: string
  drag?: string
  subDescription?: string
  deleteButton?: string
  confirm?: string
  placeholder?: string
  className?: string
}

export type OnboardingFormProps = {
  user?: any
  className?: string
  welcome?: string
  title?: string
  description?: string
  upload?: string
  remove?: string
  save?: string
  cancel?: string
  drag?: string
  saveName?: string
  nameText?: string
  changeLater?: string
  back?: string
  placeholder?: string
}

export type MarketProps = {
  user: any
  items: Item[]
  loading: boolean
  error: string | null
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
}
