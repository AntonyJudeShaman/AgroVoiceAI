import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CreateAccount } from "../sign-up"
import { Account } from "../sign-in"

export function AccountsTab() {
  return (
    <Tabs defaultValue="signin" className="md:w-[500px]">
      <TabsList className="grid font-pops w-full grid-cols-2 border border-gray-500 dark:border-slate-700">
        <TabsTrigger value="signin">Sign in</TabsTrigger>
        <TabsTrigger value="signup">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Account/>
      </TabsContent>
      <TabsContent value="signup">
        <CreateAccount/>
      </TabsContent>
    </Tabs>
  )
}
