import * as React from 'react'

import { cn } from '@/lib/utils'
import { SettingsHeader } from './settings-header'
import Link from 'next/link'
import { IconLogo } from '../ui/icons'

interface SettingsShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SettingsShell({
  children,
  className,
  ...props
}: SettingsShellProps) {
  return (
    <div className="">
      <div
        className={cn(
          'grid container p-0 xl:pl-4 py-10 items-start gap-8',
          className
        )}
        {...props}
      >
        <div className="flex items-end justify-between">
          <SettingsHeader
            heading="Settings"
            text="Manage account and website settings."
            className="md:mt-10 mt-4 text-5xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%"
          />
          <Link
            className=" hidden items-center font-normal font-pops text-3xl dark:text-white text-black lg:flex"
            href="/"
          >
            AgroVoiceAI <IconLogo className="size-16 ml-3" />
            <span className="sr-only">AgroVoiceAI</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
