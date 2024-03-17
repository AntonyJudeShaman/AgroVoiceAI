import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CreateAccount } from '@/components/Settings/sign-up'
import NoSessionPageContainer from '@/components/no-session-page-container'

export default async function SignInPage() {
  const session = await auth()
  if (session?.user) {
    redirect('/')
  }

  return <NoSessionPageContainer component={<CreateAccount />} />
}
