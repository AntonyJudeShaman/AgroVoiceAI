import { cn, nanoid } from '@/lib/utils'
import { Chat } from '@/components/Chat/chat'
import { auth } from '@/lib/auth'
import { DotBackGround } from '@/components/grid-bg'
import { BentoGrid, BentoGridItem } from '@/components/grid-layout'
import HomeFeatures from '@/components/home-features'
import { features } from '@/config/constants'

export default async function IndexPage() {
  const id = nanoid()

  const session = await auth()

  return !session ? (
    <>
      <div className="flex justify-center dark:bg-black flex-col items-center mt-0">
        <DotBackGround />
        <HomeFeatures />
        <BentoGrid className="max-w-4xl mx-auto py-10">
          {features.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={cn(
                i === 0 || i === 3 || i === 4 ? 'md:col-span-2' : '',
                i === 6 ? 'md:col-span-3' : ''
              )}
            />
          ))}
        </BentoGrid>
      </div>
    </>
  ) : (
    <Chat id={id} />
  )
}
