import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from '../Sidebar/sidebar-mobile'
import { SidebarToggle } from '../Sidebar/sidebar-toggle'
import { ChatHistory } from './chat-history'
import { MovingButton } from '../ui/moving-border'
import { ThemeToggle } from '../Theme/theme-toggle'

async function UserOrLogin() {
  const session = await auth()
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/" target="_blank" rel="nofollow">
          <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
          <IconNextChat className="hidden size-6 mr-2 dark:block" />
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}

export function Header() {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-start">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex justify-center flex-1">
        <div className="p-2 mt-2 flex flex-row rounded-full">
          {navItems.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className="gap-5 py-2 px-3 relative overflow-hidden after:relative after:flex after:items-center after:content-'' after:w-0 after:h-[2px] dark:after:bg-teal-400 after:bg-teal-700 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full after:mt-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-8">
        {/* <ThemeToggle /> */}
        <MovingButton className="">Download App</MovingButton>
      </div>
    </header>
  )
}
