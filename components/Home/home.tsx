import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DownloadIcon } from 'lucide-react'
import { BottomGradient } from '../ui/bottom-gradient'
import { auth } from '@/lib/auth'
import { getTranslations } from 'next-intl/server'

export default async function Home() {
  const session = await auth()
  const t = await getTranslations('Index')
  return (
    <>
      <div className="bg-gray-50/9 font-pops bg-cover bg-center h-full flex justify-center items-center">
        <main className="w-full py-6 md:py-12">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter p-3 bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% sm:text-5xl md:text-6xl 2xl:text-7xl">
                {t('title')}
              </h1>
              <p className="mx-auto z-40 max-w-1/2 text-gray-500 text-md md:text-2xl/relaxed lg:text-2xl/relaxed xl:text-2xl/relaxed dark:text-gray-400">
                {t('desc')}
              </p>
            </div>
            <div className="flex gap-4 md:flex-row flex-col">
              <Link href={session ? '/chat' : '/sign-in'}>
                <Button
                  size="lg"
                  className=" relative group/btn flex space-x-2 items-center justify-center px-6 py-5 w-full  rounded-md h-10 font-medium shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  variant="default"
                >
                  {t('chat')}
                </Button>
              </Link>
              <Link href="#">
                <Button
                  size="lg"
                  className=" relative group/btn dark:bg-zinc-950/70 bg-white hover:bg-white dark:hover:bg-zinc-950 flex space-x-2 items-center py-5 justify-center px-6 w-full  rounded-md h-10 font-medium shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  variant="outline"
                >
                  <DownloadIcon className="size-5 mr-2" />
                  {t('app')}
                  <BottomGradient />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
