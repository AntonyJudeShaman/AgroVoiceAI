'use client'

import Image from 'next/image'
import { User, type Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IconExternalLink } from '@/components/ui/icons'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from './Theme/theme-toggle'
import React, { useEffect, useState } from 'react'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import { getUser } from '@/app/actions'
import { LogOut, Settings, SunMoon } from 'lucide-react'

export interface UserMenuProps {
  user: Session['user']
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function UserMenu() {
  const [session, setSession] = useState<User | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = await getUser()
        setSession(sessionData as unknown as User | undefined)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()

    return () => {}
  }, [])

  const LoadingFallback = () => (
    <>
      <div className="rounded-lg border flex justify-start size-9 bg-slate-700 border-transparent w-full animate-pulse hover:border-gray-700" />
      <span className="ml-2 bg-slate-700 animate-pulse size-7" />
    </>
  )

  const user = session
  const { setTheme, theme } = useTheme()
  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <div className="p-2 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="px-4 py-7">
            <Button
              variant="ghost"
              className="rounded-2xl hover:border-none flex justify-start hover:dark:bg-teal-950/30 hover:bg-green-200/50 w-full"
            >
              {user?.image?.length ? (
                <Image
                  className="size-9 transition-opacity duration-300 rounded-full my-4 justify-start select-none hover:opacity-80"
                  src={user?.image ?? ''}
                  alt={user.name ?? 'Avatar'}
                  height={44}
                  width={44}
                />
              ) : (
                <div className="flex items-center  justify-center text-xs font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
                  {/* {user?.name ? getUserInitials(user?.name) : null} */}
                  {getUserInitials(user?.name || '')}
                </div>
              )}
              <span className="ml-2">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={16}
            align="center"
            className="bg-gradient-to-tr dark:from-slate-800 dark:to-slate-900/90 to-60% from-zinc-300 to-indigo-100/30"
          >
            <DropdownMenuItem className="flex-col items-start flex-wrap">
              {/* <div className="text-xs font-medium">{user?.name}</div> */}
              <div className="text-sm text-zinc-500 ">{user?.email}</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/settings">
              <DropdownMenuItem className="flex text-sm h-8 items-center cursor-pointer">
                <Settings className="size-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="flex items-center h-8 justify-between text-sm cursor-pointer"
            >
              <span className="flex items-center">
                {' '}
                <SunMoon className="size-4 mr-2" /> Appearance{' '}
              </span>
              <span>
                <ThemeToggle />
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                signOut({
                  callbackUrl: '/'
                })
              }
              className="text-sm h-8 flex items-center cursor-pointer"
            >
              <LogOut className="size-4 mr-2" /> Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </React.Suspense>
  )
}
