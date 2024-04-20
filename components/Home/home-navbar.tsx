'use client'
import { Button } from '@/components/ui/button'
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import Link from 'next/link'
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu
} from '@/components/ui/navigation-menu'
import { IconLogo, IconMenu } from '../ui/icons'
import { ThemeToggle } from '../Theme/theme-toggle'
import { cn } from '@/lib/utils'
import { useState, useEffect, use } from 'react'
import { ArrowRight, DownloadIcon } from 'lucide-react'
import { BottomGradient } from '../ui/bottom-gradient'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { navConfig } from '@/config/constants'
import LocaleSwitcher from '../Miscellaneous/locale-switcher'
import { NavbarProps } from '@/lib/types'
import toast from 'react-hot-toast'
import { useLocale } from 'next-intl'
import MyToast from '../ui/my-toast'
import { useTheme } from 'next-themes'

export default function Navbar({
  session,
  title,
  home,
  chat,
  weather,
  market,
  settings,
  pest,
  signin,
  signup,
  logout,
  explore
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const path = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const { setTheme, theme } = useTheme()

  const navItems = [home, chat, weather, market, settings, pest]

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
      className={`flex dark:text-white text-black h-20 fixed duration-300 w-full mx-auto justify-center items-center px-4 md:px-6 ${scrolled ? ' backdrop-blur-lg shadow-md dark:shadow-green-900 shadow-green-100 z-50' : ''}`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="xl:hidden dark:text-white text-black font-pops"
            size="icon"
            variant="outline"
          >
            <IconMenu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="text-2xl pt-8 font-pops font-bold">
            <IconLogo className="size-28 mb-4 mr-3" /> {title}
            <span className="sr-only">Agrovoiceai</span>
          </div>
          <div className="grid gap-2 py-6">
            {navConfig &&
              navConfig.mainNav.map((item, index) => (
                <Link
                  key={index}
                  className="flex w-full font-pops items-center py-2 text-lg"
                  href={item.href}
                  aria-label={item.title}
                >
                  {item.icon} {navItems[index]}
                </Link>
              ))}
          </div>
          <div className="mb-4">
            <LocaleSwitcher />
          </div>
          <Link href="#">
            <Button
              size="lg"
              className="relative group/btn dark:bg-zinc-950/70 bg-white hover:bg-white dark:hover:bg-zinc-950 flex space-x-2 items-center py-5 justify-center px-6 w-full  rounded-md h-10 font-medium shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              variant="outline"
            >
              <DownloadIcon className="size-5 mr-2" /> Download Our App
              <BottomGradient />
            </Button>
          </Link>
        </SheetContent>
      </Sheet>
      <Link
        className="mr-4 hidden font-normal items-center font-pops text-2xl dark:text-white text-black xl:flex"
        href="/"
      >
        <IconLogo className="size-12 mr-3" /> {title}
        <span className="sr-only">AgroVoiceAI</span>
      </Link>
      <NavigationMenu className="hidden xl:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <div className="flex font-pops items-center">
              {navConfig &&
                navConfig.mainNav.map((item, index) => (
                  <Link
                    key={index}
                    aria-label={item.title}
                    href={item.href}
                    className={cn(
                      'group relative flex flex-col justify-center text-right text-sm dark:hover:text-white items-center overflow-hidden mr-4 dark:text-gray-400 text-zinc-700 hover:text-black md:inline-block rounded-md p-2 font-medium',
                      scrolled
                        ? 'dark:hover:text-gray-600 dark:text-zinc-200 text-black hover:text-zinc-700'
                        : ''
                    )}
                  >
                    <Button
                      variant="link"
                      className="flex items-center text-[0.85rem] px-0 after:bg-current shadow-none"
                    >
                      {item.icon}
                      {navItems[index]}
                    </Button>
                  </Link>
                ))}
            </div>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      {!session ? (
        <div className="ml-auto flex gap-2 items-center">
          <div className="hidden md:flex">
            <LocaleSwitcher />
          </div>
          <ThemeToggle />
          <Button variant="outline" onClick={() => router.push('/sign-in')}>
            {signin}
          </Button>
          <Button
            onClick={() => router.push('/sign-up')}
            className="hover:bg-primary/80"
          >
            <div className="md:text-[1.6vh] z-10 flex items-center h-11 px-8 bg-primary text-primary-foreground shadow-md rounded-2xl border-gray-500 border">
              {signup}
            </div>
          </Button>
        </div>
      ) : path.includes('/options') ? (
        <div className="ml-auto flex gap-2 items-center">
          <div className="hidden md:flex">
            <LocaleSwitcher />
          </div>
          <ThemeToggle />
          <Button
            onClick={() => {
              toast.loading(
                locale === 'en' ? 'Signing out...' : 'வெளியேறுகிறது',
                {
                  style: {
                    borderRadius: '10px',
                    background: theme === 'light' ? '#333' : '#d83030',
                    color: '#fff',
                    fontSize: '14px'
                  },
                  iconTheme: {
                    primary: theme === 'light' ? 'lightgreen' : 'white',
                    secondary: 'black'
                  },
                  className: 'font-pops'
                }
              )
              signOut({
                callbackUrl: '/'
              })
            }}
            variant="outline"
            className="rounded-2xl md:text-md border-gray-500 border"
            size="lg"
          >
            {logout}
          </Button>
        </div>
      ) : (
        <div className="ml-auto flex gap-2 items-center">
          <div className="hidden md:flex">
            <LocaleSwitcher />
          </div>
          <ThemeToggle />
          <Button
            onClick={() => {
              toast.loading(
                locale === 'en' ? 'Signing out...' : 'வெளியேறுகிறது',
                {
                  style: {
                    borderRadius: '10px',
                    background: theme === 'light' ? '#333' : '#d83030',
                    color: '#fff',
                    fontSize: '14px'
                  },
                  iconTheme: {
                    primary: theme === 'light' ? 'lightgreen' : 'white',
                    secondary: 'black'
                  },
                  className: 'font-pops'
                }
              )
              signOut({
                callbackUrl: '/'
              })
            }}
            className=""
            variant="outline"
          >
            {logout}
          </Button>
          <Button
            onClick={() => router.push('/options')}
            className="hover:bg-primary/80"
          >
            <div className="md:text-md z-10 flex items-center h-11 px-8 bg-primary text-primary-foreground shadow-md rounded-2xl border-gray-500 border">
              {explore}
              <ArrowRight className="size-4 ml-2 hidden md:block" />
            </div>
          </Button>
        </div>
      )}
    </nav>
  )
}
