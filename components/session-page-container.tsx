import { auth } from '@/lib/auth'
import Navbar from '@/components/Home/home-navbar'
import { getCurrentUser } from '@/app/actions'
import { redirect } from 'next/navigation'

export default async function SessionPageContainer({
  component
}: {
  component: React.ReactNode
}) {
  const user = await getCurrentUser()
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  if (!user?.pageShown && user) {
    redirect('/onboarding')
  }
  return (
    <>
      {user?.pageShown && session && (
        <div className="min-h-screen w-full items-center justify-center">
          <p className="text-4xl sm:text-7xl min-w-full flex flex-col font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-green-500 to-green-400">
            <div className="min-w-full">
              <Navbar session={session} />
            </div>
          </p>
          <div className="grow mt-20 md:mt-[10%]">{component}</div>
        </div>
      )}
    </>
  )
}
