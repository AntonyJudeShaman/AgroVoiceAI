import { auth } from '@/lib/auth'
import Navbar from '@/components/Home/home-navbar'
import { redirect } from 'next/navigation'
import { Spotlight } from './ui/spotlight'
import { getTranslations } from 'next-intl/server'
import { navItems } from '@/config/constants'

export default async function NoSessionPageContainer({
  component
}: {
  component: React.ReactNode
}) {
  const session = await auth()

  if (session?.user?.id) {
    redirect('/options')
  }

  const t = await getTranslations('Index')

  return (
    <>
      {!session && (
        <div className="min-h-screen w-full dark:bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center">
          <div className="absolute pointer-events-none inset-0 items-center justify-center dark:bg-black bg-teal-50 hidden sm:block [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="purple"
          />
          <div className="min-h-screen w-full items-center justify-center">
            <div className="text-4xl sm:text-7xl min-w-full flex flex-col font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-green-500 to-green-400">
              <div>
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
            <div className="grow mt-[13rem] flex justify-center items-center">
              {component}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
