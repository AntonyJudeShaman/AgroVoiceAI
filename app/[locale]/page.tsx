import { cn } from '@/lib/utils'
import { DotBackGround } from '@/components/Home/grid-bg'
import { BentoGrid, BentoGridItem } from '@/components/Home/bento-grid-layout'
import HomeFeatures from '@/components/Home/home-features'
import { features } from '@/config/constants'
import { getTranslations } from 'next-intl/server'

export default async function IndexPage() {
  return (
    <>
      <div className="flex justify-center dark:bg-black bg-green-100/20 flex-col items-center mt-0">
        <DotBackGround />
        <HomeFeatures />
        <BentoGridItem />
      </div>
    </>
  )
}
