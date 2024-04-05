import { getCurrentUser } from '../../actions'
import PestHome from '@/components/Pest/pest-home'
import SessionPageContainer from '@/components/session-page-container'
import { getTranslations } from 'next-intl/server'

export default async function Market() {
  const user = await getCurrentUser()
  const t = await getTranslations('Index')
  return (
    <SessionPageContainer
      component={
        <PestHome
          user={user}
          title={t('settings.account.image.title')}
          description={t('settings.account.image.desc')}
          upload={t('settings.account.image.upload')}
          remove={t('settings.account.image.remove')}
          save={t('settings.save')}
          cancel={t('settings.cancel')}
          drag={t('settings.account.image.drag')}
          className="flex flex-col mx-auto text-center md:text-left"
        />
      }
    />
  )
}
