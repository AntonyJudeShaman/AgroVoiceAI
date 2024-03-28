import { auth } from '@/lib/auth'
import Navbar from '@/components/Home/home-navbar'
import { redirect } from 'next/navigation'
import { Spotlight } from './ui/spotlight'

export default async function NoSessionPageContainer({
  component
}: {
  component: React.ReactNode
}) {
  const session = await auth()

  if (session?.user?.id) {
    redirect('/options')
  }
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
                <Navbar session={session} />
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
