import { getCurrentUser } from '../../actions'
import MarketHome2 from '@/components/Market/market-home-vegetables'
import { MarketsTab } from '@/components/Market/market-tab'
import SessionPageContainer from '@/components/Miscellaneous/session-page-container'

export default async function Market() {
  const user = await getCurrentUser()
  return (
    <>
      <SessionPageContainer component={<MarketsTab user={user} />} />
    </>
  )
}
