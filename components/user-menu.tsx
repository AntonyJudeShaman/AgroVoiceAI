'use client'

import Image from 'next/image'
import { type Session } from 'next-auth'
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

export interface UserMenuProps {
  user: Session['user']
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-2">
            {user?.image ? (
              <Image
                className="size-6 transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
                src={user?.image ?? ''}
                alt={user.name ?? 'Avatar'}
                height={48}
                width={48}
              />
            ) : (
              <div className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
                {/* {user?.name ? getUserInitials(user?.name) : null} */}
                {getUserInitials(user?.name || 'User')}
              </div>
            )}
            <span className="ml-2">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
          <DropdownMenuItem className="flex-col items-start flex-wrap">
            {/* <div className="text-xs font-medium">{user?.name}</div> */}
            <div className="text-sm text-zinc-500 ov">{user?.email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push('/settings')}
            className="flex-col text-sm h-8 items-start"
          >
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="flex items-center h-8 justify-between text-sm"
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
            className="text-sm h-8"
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
