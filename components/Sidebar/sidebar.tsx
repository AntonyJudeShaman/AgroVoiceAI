'use client'

import * as React from 'react'

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useLocale } from 'next-intl'

export interface SidebarProps extends React.ComponentProps<'div'> {
  session?: any
}

export function Sidebar({ className, children, session }: SidebarProps) {
  const { isSidebarOpen, isLoading } = useSidebar()
  const locale = useLocale()

  return (
    <div
      data-state={isSidebarOpen && !isLoading ? 'open' : 'closed'}
      className={cn(
        className,
        'h-full fixed dark:to-emerald-950/70 bg-gradient-to-tr dark:from-background from-60%'
      )}
    >
      {session ? (
        <>{children}</>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col font-pops size-full p-2 justify-center items-center text-center">
            <p className="text-5xl text-primary font-bold mb-4">
              {' '}
              {locale === 'en' ? 'Welcome' : 'நல்வரவு'}
            </p>
            <p>
              {locale === 'en'
                ? 'Please signin or signup to save your chat history and unlock more features.'
                : 'உங்கள்  உரையாடல்களை சேமிக்க மற்றும் மேலும் அம்சங்களை விரிவாக்க தயவுசெய்து உள்நுழையவும்.'}
            </p>
            <div className="flex flex-col w-full space-y-2 px-6 pt-8">
              <Link href="/sign-in">
                <Button className="w-full rounded-sm">
                  {locale === 'en' ? 'Sign in' : 'உள்நுழைக'}
                </Button>
              </Link>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm uppercase">
                  <span className="bg-accent dark:bg-background px-2 text-muted-foreground">
                    {locale === 'en' ? 'or' : 'அல்லது'}
                  </span>
                </div>
              </div>{' '}
              <Link href="/sign-up">
                <Button className="w-full rounded-sm">
                  {locale === 'en' ? 'Sign up' : 'பதிவு செய்க'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
