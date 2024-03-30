import { auth } from '@/lib/auth'
import { options, translateOptions } from '@/config/constants'
import { Card, CardFooter, CardHeader } from '../ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'
import { getTranslations } from 'next-intl/server'

export default async function HomeOptions() {
  const session = await auth()
  const t = await getTranslations('Index')

  return (
    <>
      <div className="font-pops bg-cover bg-center h-full flex justify-center items-center z-40">
        <main className="w-full py-6 md:py-12">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h1 className="text-5xl mb-10 font-bold tracking-tighter p-3 bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% sm:text-5xl md:text-6xl 2xl:text-6xl">
                {t('explore.topic')}
              </h1>
              <div className="grid md:grid-cols-3 gap-6">
                {options.map((option, index) => (
                  <Card
                    key={index}
                    className="border-2 border-gray-200 group flex flex-col justify-between h-full dark:border-gray-700 group hover:dark:border-green-900 hover:border-green-300 duration-300"
                  >
                    <CardHeader className="text-gray-500 text-left flex flex-row justify-between items-center duration-300 group-hover:dark:text-white/90 group-hover:text-black md:text-2xl/relaxed lg:text-2xl/relaxed xl:text-2xl/relaxed dark:text-gray-400">
                      <p>{t(translateOptions[index])}</p>
                      <p className="ml-2">{option.icon}</p>
                    </CardHeader>
                    <CardFooter>
                      <Link href={option.url}>
                        <Button className="bg-primary/90 group-hover:bg-primary button-glow">
                          {t('explore.try')}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
