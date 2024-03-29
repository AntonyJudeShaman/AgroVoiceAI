import { DotBackGround } from '@/components/Home/grid-bg'
import { BentoGridItem } from '@/components/Home/bento-grid-layout'
import HomeFeatures from '@/components/Home/home-features'

export default async function IndexPage() {
  return (
    <div className="flex justify-center dark:bg-black bg-green-100/20 flex-col items-center mt-0">
      <DotBackGround />
      <HomeFeatures />
      <BentoGridItem />
    </div>
  )
}
