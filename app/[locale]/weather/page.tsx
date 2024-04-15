import WeatherHome from '@/components/Weather/weather-home'
import { getCurrentUser } from '../../actions'
import SessionPageContainer from '@/components/Miscellaneous/session-page-container'

export default async function Weather() {
  const user = await getCurrentUser()
  return (
    <>
      <SessionPageContainer component={<WeatherHome user={user} />} />
    </>
  )
}
