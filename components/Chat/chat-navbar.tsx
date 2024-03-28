'use client'
import { Button } from '@/components/ui/button'
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import Link from 'next/link'
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { IconLogo, IconMenu } from '../ui/icons'
import { ThemeToggle } from '../Theme/theme-toggle'
import { DownloadIcon } from 'lucide-react'
import { BottomGradient } from '../ui/bottom-gradient'
import { navConfig } from '@/config/constants'

export default function ChatNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  return (
    <nav
      className={`flex dark:text-white text-black h-20 max-w-full justify- items-center px-4 md:px-6 ${scrolled ? ' right-0 backdrop-blur-lg duration-1000 shadow-md z-50' : ''}`}
    >
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <div className="flex font-p items-center">
              {navConfig &&
                navConfig.mainNav.map((item, index) => (
                  <>
                    <Link
                      key={index}
                      aria-label={item.title}
                      href={item.href}
                      className={cn(
                        '2xl:text-md text-sm dark:hover:text-white items-center overflow-hidden mr-4 dark:text-zinc-300 text-zinc-900 rounded-md p-2 font-pops'
                      )}
                    >
                      <p className="flex items-center">
                        {item.icon}{' '}
                        <span className="text-[0.95rem]">{item.title}</span>
                      </p>
                    </Link>
                  </>
                ))}
            </div>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeToggle />
      <div className="ml-2 gap-2 flex-row md:block hidden">
        <Link href="#">
          <Button
            size="lg"
            className=" relative group/btn dark:bg-zinc-950/70 bg-white hover:bg-white dark:hover:bg-zinc-950 flex space-x-2 items-center py-5 justify-center px-6 w-full  rounded-md h-10 font-medium shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            variant="outline"
          >
            <DownloadIcon className="size-5 mr-2" /> Download Our App
            <BottomGradient />
          </Button>
        </Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="lg:hidden dark:text-white ml-3 text-black font-pops"
            size="icon"
            variant="outline"
          >
            <IconMenu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <IconLogo className="size-20" />
          <p className="text-2xl pt-8 font-pops font-bold">
            AgroVoiceAI
            <span className="sr-only">Agrovoiceai</span>
          </p>
          <div className="grid gap-2 py-6">
            {navConfig &&
              navConfig.mainNav.map((item, index) => (
                <Link
                  key={index}
                  className="flex w-full font-pops items-center py-2 text-lg"
                  href={item.href}
                  aria-label={item.title}
                >
                  {item.title}
                </Link>
              ))}
          </div>
          <Link href="#">
            <Button
              size="lg"
              className=" relative group/btn dark:bg-zinc-950/70 bg-white hover:bg-white dark:hover:bg-zinc-950 flex space-x-2 items-center py-5 justify-center px-6 w-full  rounded-md h-10 font-medium shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              variant="outline"
            >
              <DownloadIcon className="size-5 mr-2" /> Download Our App
              <BottomGradient />
            </Button>
          </Link>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
