'use client'
import { Button } from '@/components/ui/button'
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import Link from 'next/link'
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu
} from '@/components/ui/navigation-menu'
import { IconMenu } from './ui/icons'
import { ThemeToggle } from './Theme/theme-toggle'
import { navConfig } from 'config/site'
import { cn } from '@/lib/utils'

export default function Navbar() {
  return (
    <header className="flex dark:text-white text-black h-20 min-w-full justify-between items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="lg:hidden dark:text-white text-black font-pops"
            size="icon"
            variant="outline"
          >
            <IconMenu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <p className="text-2xl pt-8 font-pops font-bold">
            AgroVoiceAI
            <span className="sr-only">Agrovoiceai</span>
          </p>
          <div className="grid gap-2 py-6">
            {navConfig &&
              navConfig.mainNav.map((item, index) => (
                <Link
                  className="flex w-full font-pops items-center py-2 text-lg"
                  href={item.href}
                  aria-label={item.title}
                >
                  {item.title}
                </Link>
              ))}
          </div>
        </SheetContent>
      </Sheet>
      <Link
        className="mr-6 hidden font-normal font-pops text-2xl dark:text-white text-black lg:flex"
        href="/"
      >
        AgroVoiceAI
        <span className="sr-only">Acme Inc</span>
      </Link>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <div className="flex font-pops items-center">
              {navConfig &&
                navConfig.mainNav.map((item, index) => (
                  <>
                    <Link
                      key={index}
                      aria-label={item.title}
                      href={item.href}
                      className={cn(
                        'group relative flex flex-col justify-center text-right text-sm dark:hover:text-white items-center overflow-hidden mr-4 dark:text-zinc-300 text-zinc-900 md:inline-block rounded-md p-2 font-medium'
                      )}
                    >
                      <span className="">{item.title}</span>
                    </Link>
                  </>
                ))}
            </div>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto flex gap-2">
        <ThemeToggle /> 
        <Link href="/sign-in" className="flex items-center">
          <Button variant="outline" >
            Sign in
          </Button>
        </Link>
        <Button>
          <Link href="/sign-up">
            <Button
              className="md:text-[1.6vh] rounded-2xl border-gray-500 border"
              size="lg"
            >
              Sign Up
            </Button>
          </Link>
        </Button>
      </div>
    </header>
  )
}
