import { getCurrentUser } from '../../actions'
import SessionPageContainer from '@/components/Miscellaneous/session-page-container'
import SoilTest from '@/components/Soil/soil-test-home'

export default async function Weather() {
  const user = await getCurrentUser()
  return (
    <>
      <SessionPageContainer component={<SoilTest user={user} />} />
    </>
  )
}
