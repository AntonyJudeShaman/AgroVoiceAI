import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreateAccount } from './sign-up'
import { Account } from './sign-in'
import { getTranslations } from 'next-intl/server'

export async function AccountsTab() {
  const t = await getTranslations('Index')

  return (
    <Tabs defaultValue="signin" className="sm:w-[500px] w-full px-4">
      <TabsList className="grid font-pops w-full grid-cols-2 border dark:bg-black bg-white border-gray-500 dark:border-slate-700">
        <TabsTrigger value="signin">Sign in</TabsTrigger>
        <TabsTrigger value="signup">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Account
          title={t('Signin.account')}
          details={t('Signin.details')}
          placeholder1={t('Signin.placeholder1')}
          placeholder2={t('Signin.placeholder2')}
          signin={t('Signin.signin')}
          username={t('Signin.username')}
          pswd={t('Signin.password')}
          forgot={t('Signin.forgot')}
        />
      </TabsContent>
      <TabsContent value="signup">
        <CreateAccount
          title={t('Signup.account')}
          details={t('Signup.details')}
          placeholder1={t('Signup.placeholder1')}
          placeholder2={t('Signup.placeholder2')}
          register={t('Signup.register')}
          username={t('Signup.username')}
          pswd={t('Signup.password')}
          forgot={t('Signup.forgot')}
        />
      </TabsContent>
    </Tabs>
  )
}
