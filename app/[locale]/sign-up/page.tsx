import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CreateAccount } from '@/components/Form/sign-up'
import NoSessionPageContainer from '@/components/no-session-page-container'
import { getTranslations } from 'next-intl/server'

export default async function SignInPage() {
  const session = await auth()
  if (session?.user) {
    redirect('/options')
  }

  const t = await getTranslations('Index')

  return (
    <NoSessionPageContainer
      component={
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
      }
    />
  )
}
