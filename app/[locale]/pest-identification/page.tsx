import { getCurrentUser } from '../../actions'
import PestTest from '@/components/Pest/pest-test'
import SessionPageContainer from '@/components/Miscellaneous/session-page-container'
import { getTranslations } from 'next-intl/server'

export default async function Market() {
  const user = await getCurrentUser()
  const t = await getTranslations('Index')
  return (
    <div className="dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] max-w-full">
      <SessionPageContainer
        component={
          <>
            {/* <PestHome
              user={user}
              title={t('pest.title')}
              description={t('pest.desc')}
              upload={t('pest.upload')}
              remove={t('settings.account.image.remove')}
              save={t('pest.submit')}
              cancel={t('settings.cancel')}
              drag={t('settings.account.image.drag')}
              className="flex flex-col mx-auto text-center md:text-left"
            /> */}
            <PestTest
              user={user}
              title={t('pest.title')}
              description={t('pest.desc')}
              upload={t('pest.upload')}
              remove={t('settings.account.image.remove')}
              save={t('pest.submit')}
              cancel={t('settings.cancel')}
              drag={t('settings.account.image.drag')}
              className="flex flex-col mx-auto text-center md:text-left"
            />
          </>
        }
      />
    </div>
  )
}
