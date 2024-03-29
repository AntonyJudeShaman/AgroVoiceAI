import { features, translations } from '@/config/constants'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export async function BentoGridItem() {
  const t = await getTranslations('Index')

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:min-w-[80rem] container max-w-4xl mx-auto py-10">
      {features.map((feature, i) => (
        <div
          key={i}
          className={cn(
            'md:col-span-1',
            i === 0 || i === 3 || i === 4 ? 'md:col-span-2 md:mt-20' : '',
            i === 4 || i === 5 ? '' : '',
            i === 6 ? 'md:col-span-3 md:mt-10 mx-auto' : ''
          )}
        >
          <div
            key={i}
            className={cn(
              'row-span-1 rounded-xl max-w-1/2 group/bento hover:border hover:dark:border-green-700 hover:border-green-500 duration-500 hover:shadow-xl transition shadow-input dark:shadow-none p-4 dark:bg-zinc-900/40 dark:border-white/[0.2] bg-white border border-gray-300 justify-between flex flex-col space-y-4'
            )}
          >
            {feature.header && <p key={'header'}>{feature.header}</p>}
            <div
              key={'title-' + i}
              className="font-display text-2xl font-bold text-black dark:text-white my-2"
            >
              {t(translations[i].title)}
            </div>
            <div
              key={'description-' + i}
              className="font-sans font-normal text-neutral-600 text-md dark:text-neutral-300"
            >
              {t(translations[i].description)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
