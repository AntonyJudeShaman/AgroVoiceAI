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
          'grid container p-0 xl:pl-4 items-start gap-8',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
