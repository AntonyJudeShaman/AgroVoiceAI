import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreateAccount } from '../Settings/sign-up'
import { Account } from '../Home/sign-in'

export function AccountsTab() {
  return (
    <Tabs defaultValue="signin" className="sm:w-[500px] w-full px-4">
      <TabsList className="grid font-pops w-full grid-cols-2 border dark:bg-black bg-white border-gray-500 dark:border-slate-700">
        <TabsTrigger value="signin">Sign in</TabsTrigger>
        <TabsTrigger value="signup">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Account />
      </TabsContent>
      <TabsContent value="signup">
        <CreateAccount />
      </TabsContent>
    </Tabs>
  )
}
