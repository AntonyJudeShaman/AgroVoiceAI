import MarketsData from '@/components/Miscellaneous/push-data'

export default async function MarketDataPushPage() {
  const password: string = process.env.PASSWORD!
  console.log(password)

  return <MarketsData originalPassword={password} />
}
