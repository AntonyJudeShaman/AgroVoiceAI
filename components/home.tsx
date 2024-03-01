import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from './header'

export default function Home() {
  return (
    <>
      <div className="bg-gray-50/9 font-pops bg-cover bg-center h-full flex justify-center items-center">
        <main className="w-full py-6 md:py-12">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h1 className="text-5xl font-bold tracking-tighter p-3 bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% sm:text-5xl md:text-6xl 2xl:text-7xl">
                AgroVoiceAI
              </h1>
              <p className="mx-auto z-40 max-w-1/2 text-gray-500 md:text-2xl/relaxed lg:text-2xl/relaxed xl:text-2xl/relaxed dark:text-gray-400">
                Meet AgroVoiceAI: Your virtual agronomy expert, revolutionizing
                farming with AI-driven insights and personalized guidance,
                ensuring every crop conversation yields success.
              </p>
            </div>
            <div className="flex gap-4 md:flex-row flex-col">
              <Link href="/sign-in">
                <Button size="lg" variant="default">Start Chatting</Button>
              </Link>
              <Link href="#">
                <Button
                  size="lg"
                  className="dark:bg-black dark:hover:bg-gray-900 bg-white dark:text-white text-black"
                  variant="outline"
                >
                  Download Our App
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
