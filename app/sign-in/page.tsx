import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AccountsTab } from '@/components/Form/Sign-in'
import Navbar from '@/components/navbar'

export default async function SignInPage() {
  const session = await auth()
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }

  return (
    <>
      <div className="min-h-screen w-full dark:bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-teal-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="text-4xl sm:text-7xl w-full 2xl:w-2/3 flex flex-col font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-green-500 to-green-400">
          <div className="min-w-full">
            <Navbar />
          </div>
        </p>
        <div className="flex flex-col justify-center grow -mt-20">
          <AccountsTab />
        </div>
      </div>
    </>
  )
}
