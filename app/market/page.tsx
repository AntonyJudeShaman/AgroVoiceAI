import { getCurrentUser } from '../actions'
import MarketHome2 from '@/components/Market/market-home-api-2'
import SessionPageContainer from '@/components/session-page-container'

export default async function Market() {
  const user = await getCurrentUser()
  return (
    <>
      <SessionPageContainer component={<MarketHome2 user={user} />} />
    </>
  )
}
