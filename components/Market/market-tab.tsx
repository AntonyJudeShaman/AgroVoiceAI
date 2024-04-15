import { getCurrentUser } from '@/app/actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getTranslations } from 'next-intl/server'
import MarketHome2 from './market-home-api-2'
import MarketHomeFruits from './market-home-fruits'

export async function MarketsTab() {
  const t = await getTranslations('Index')
  const user = await getCurrentUser()
  
  return (
    <Tabs defaultValue="vegetables" className="w-full px-4">
      <TabsList className="grid font-pops md:w-[80%] 2xl:w-[70%] mx-auto grid-cols-3 border dark:bg-black bg-white border-gray-500 dark:border-slate-700">
        <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
        <TabsTrigger value="fruits">Fruits</TabsTrigger>
        <TabsTrigger value="graph">Graph</TabsTrigger>
      </TabsList>
      <TabsContent value="vegetables">
        <MarketHome2 user={user}/>
      </TabsContent>
      <TabsContent value="fruits">
      <MarketHomeFruits user={user}/>
      </TabsContent>
      <TabsContent value="graph">
      <MarketHomeFruits user={user}/>
      </TabsContent>
    </Tabs>
  )
}
