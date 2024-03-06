'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { useAtTop } from '@/lib/hooks/use-at-top'

export function ButtonScrollToTop({ className, ...props }: ButtonProps) {
  const isAtTop = useAtTop()

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'absolute right-4 bottom-36 z-40 dark:bg-white dark:text-gray-800 bg-black text-white transition-opacity duration-300 sm:right-8 md:top-14',
        isAtTop ? 'opacity-0' : 'opacity-100',
        className
      )}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      {...props}
    >
      <ArrowUp className="size-4" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  )
}
