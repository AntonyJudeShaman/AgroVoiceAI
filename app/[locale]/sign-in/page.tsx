import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AccountsTab } from '@/components/Form/auth-tab'
import { Spotlight } from '@/components/ui/spotlight'
import SessionPageContainer from '@/components/no-session-page-container'

export default async function SignInPage() {
  const session = await auth()
  if (session?.user) {
    redirect('/')
  }

  return <SessionPageContainer component={<AccountsTab />} />
}
