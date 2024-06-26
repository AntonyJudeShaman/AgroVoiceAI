import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DownloadIcon } from 'lucide-react'
import { BottomGradient } from '../ui/bottom-gradient'
import { auth } from '@/lib/auth'
import { getLocale, getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import DownloadButton from './download-button'

export default async function Home() {
  const session = await auth()
  const t = await getTranslations('Index')
  const locale = await getLocale()
  return (
    <>
      <div className="bg-gray-50/9 font-pops bg-cover bg-center h-full flex justify-center items-center">
        <main className="w-full py-6 md:py-12">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h1
                className={cn(
                  locale === 'en'
                    ? 'text-6xl md:text-8xl xl:text-8xl 2xl:text-8xl'
                    : 'text-4xl sm:text-5xl md:text-6xl xl:text-7xl',
                  'font-bold tracking-tighter p-3 bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60%'
                )}
              >
                {t('title')}
              </h1>
              <p
                className={cn(
                  locale === 'en'
                    ? 'text-md md:text-2xl/relaxed lg:text-2xl/relaxed xl:text-2xl/relaxed'
                    : 'text-sm md:text-lg/relaxed lg:text-xl/relaxed xl:text-xl/relaxed',
                  'mx-auto font-bricol z-40 max-w-1/2 text-gray-500  dark:text-gray-400'
                )}
              >
                {t('desc')}
              </p>
            </div>
            <div className="flex gap-4 md:flex-row flex-col">
              <Link href={'/chat'}>
                <Button
                  size="lg"
                  className="relative group/btn flex space-x-2 items-center justify-center px-6 py-5 w-full  rounded-md h-10 font-medium shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  variant="default"
                >
                  {t('chat')}
                </Button>
              </Link>
              <DownloadButton app={t('app')} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
