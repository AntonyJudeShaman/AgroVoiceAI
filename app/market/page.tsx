import WeatherHome from '@/components/Weather/weather-home'
import { getCurrentUser } from '../actions'
import { auth } from '@/lib/auth'
import Navbar from '@/components/Home/home-navbar'
import MarketHome from '@/components/Market/market-home'

export default async function Market() {
  const user = await getCurrentUser()
  const session = await auth()
  return (
    <>
      {user?.pageShown && (
        <div className="min-h-screen w-full items-center justify-center">
          <p className="text-4xl sm:text-7xl min-w-full flex flex-col font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-green-500 to-green-400">
            <div className="min-w-full">
              <Navbar session={session} />
            </div>
          </p>
          <div className="grow -mt-20 md:mt-0">
            <MarketHome user={user} />
          </div>
        </div>
      )}
    </>
  )
}
