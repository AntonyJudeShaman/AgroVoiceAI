import React from 'react'
import Home from './home'
import Navbar from './home-navbar'
import { auth } from '@/lib/auth'
import { getTranslations } from 'next-intl/server'
import { navItems } from '@/config/constants'

export async function DotBackGround() {
  const session = await auth()
  const t = await getTranslations('Index')

  return (
    <div className="min-h-screen w-full dark:bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-green-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,purple)]"></div>

      <div className="text-4xl sm:text-7xl min-w-full flex flex-col font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-green-500 to-green-400">
        <div className="min-w-full">
          <Navbar
            session={session}
            title={t('title')}
            home={t(navItems[0])}
            chat={t(navItems[1])}
            weather={t(navItems[2])}
            market={t(navItems[3])}
            settings={t(navItems[4])}
            signin={t('signin')}
            signup={t('signup')}
          />
        </div>
      </div>
      <div className="flex 2xl:container z-10 flex-col justify-center grow">
        <Home />
      </div>
    </div>
  )
}
