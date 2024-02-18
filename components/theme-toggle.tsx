'use client'
import { useTheme } from 'next-themes'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { IoSunny } from 'react-icons/io5'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <IoSunny className="size-6 dark:hidden" />
      <BsFillMoonStarsFill className="hidden size-6 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
