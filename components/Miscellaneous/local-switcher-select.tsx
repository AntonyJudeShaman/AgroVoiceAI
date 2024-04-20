'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { ChangeEvent, ReactNode, useTransition } from 'react'
import { useRouter, usePathname } from '../../navigation'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { useLocale } from 'next-intl'
import { IconChevronUpDown } from '../ui/icons'

type Props = {
  children: ReactNode
  defaultValue: string
}

export default function LocaleSwitcherSelect({
  children,
  defaultValue
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()
  const locale = useLocale()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value
    startTransition(() => {
      router.replace(
        // @ts-expect-error
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }

  return (
    <div className={clsx('relative')}>
      <select
        className="appearance-none cursor-pointer flex w-full mr-4 bg-transparent text-sm font-sans font-medium justify-evenly ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none items-center rounded-md hover:text-accent-foreground hover:bg-accent py-2 px-4 border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <IconChevronUpDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  )
}
