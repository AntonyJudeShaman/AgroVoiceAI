import React from 'react'

import { cn } from '@/lib/utils'

export function FooterText({
  className,
  content,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      {content}
    </p>
  )
}
