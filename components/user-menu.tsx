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
import { getUser } from '@/app/actions'

export interface UserMenuProps {
  user: Session['user']
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function UserMenu() {
  const [session, setSession] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = await getUser();
        setSession(sessionData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const user = session;
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  return (
    <div className="p-2 mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='p-6'>
          <Button variant="ghost" className="rounded-lg border flex justify-start border-transparent w-full hover:border-gray-700">
            {user?.image ? (
              <Image
                className="size-9 transition-opacity duration-300 rounded-full justify-start select-none hover:opacity-80"
                src={user?.image ?? ''}
                alt={user.name ?? 'Avatar'}
                height={44}
                width={44}
              />
            ) : (
              <div className="flex items-center  justify-center text-xs font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
                {/* {user?.name ? getUserInitials(user?.name) : null} */}
                {getUserInitials(user?.name || 'User')}
              </div>
            )}
            <span className="ml-2">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={16} align="center" className="w">
          <DropdownMenuItem className="flex-col items-start flex-wrap">
            {/* <div className="text-xs font-medium">{user?.name}</div> */}
            <div className="text-sm text-zinc-500 ">{user?.email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push('/settings')}
            className="flex-col text-sm h-8 items-start cursor-pointer"
          >
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="flex items-center h-8 justify-between text-sm cursor-pointer"
          >
            <span> Appearance </span>
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
            className="text-sm h-8 cursor-pointer"
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
