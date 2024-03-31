'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { User, Session } from 'next-auth'
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
import { Settings, SunMoon, LogOut } from 'lucide-react'
import Link from 'next/link'
import { getCurrentUser, getUser } from '@/app/actions'
import { ThemeToggle } from './Theme/theme-toggle'

export interface UserMenuProps {
  user?: Session['user']
  settings: string
  appearance: string
  logout: string
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function UserMenu({ settings, appearance, logout }: UserMenuProps) {
  const [session, setSession] = useState<User | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = await getCurrentUser()
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

  return (
    <div className="w-full">
      <div className="p-2 mb-6" onMouseEnter={() => setOpen(true)}>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild className="px-4 py-7">
            <Button
              variant="ghost"
              className="rounded-2xl hover:border-none flex justify-start hover:dark:bg-teal-950/30 hover:bg-green-200/50 w-full"
              onMouseEnter={() => setOpen(true)}
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
                <div className="flex items-center  justify-center text-xs font-medium dark:bg-teal-600 dark:text-white bg-teal-300 text-black uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
                  {getUserInitials(user?.name || '')}
                </div>
              )}
              <span className="ml-2">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <div className="w-full">
            <DropdownMenuContent
              sideOffset={16}
              align="center"
              className="bg-gradient-to-tr dark:from-slate-800 dark:to-slate-900/90 to-60% from-zinc-300 w-[250px] lg:w-[220px] xl:w-[250px]  to-indigo-100/30"
              onMouseLeave={() => setOpen(false)}
            >
              {/* <DropdownMenuItem className="flex-col items-start flex-wrap rounded-lg">
              <div className="text-sm text-zinc-500">{user?.name}</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
              <Link href="/settings">
                <DropdownMenuItem className="flex text-sm h-8 rounded-lg items-center cursor-pointer">
                  <Settings className="size-4 mr-2" />
                  {settings}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="flex items-center h-8 justify-between rounded-lg text-sm cursor-pointer"
              >
                <span className="flex items-center">
                  <SunMoon className="size-4 mr-2" /> {appearance}{' '}
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
                className="text-sm h-8 flex items-center rounded-lg cursor-pointer"
              >
                <LogOut className="size-4 mr-2" /> {logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
      </div>
    </div>
  )
}
