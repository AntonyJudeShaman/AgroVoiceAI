import { auth } from '@/lib/auth'
import WeatherHome from '@/components/Weather/weather-home'
import { getCurrentUser } from '../actions'

export default async function Weather() {
  const user = await getCurrentUser()
  return (
    <div>
      <WeatherHome user={user} />
    </div>
  )
}
