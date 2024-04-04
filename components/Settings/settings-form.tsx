import { cn } from '@/lib/utils'
import { DeleteAccount } from '../Form/delete-account-form'
import { SettingsNameForm } from '../Form/settings-name-form'
import { SettingsImageForm } from '../Form/settings-image-form'
import { SettingsUsernameForm } from '../Form/settings-username-form'
import { SettingsEmailForm } from '../Form/settings-email-form'
import { SettingsDistrictForm } from '../Form/settings-district-form'
import { getTranslations } from 'next-intl/server'

export async function SettingsForm({
  user,
  className
}: {
  user: any
  className?: string
}) {
  const t = await getTranslations('Index')
  return (
    <>
      <div
        className={cn(
          className,
          'flex flex-col md:space-x-4 md:space-y-0 space-y-4 space-x-0 md:flex-row'
        )}
      >
        <SettingsNameForm
          user={user}
          title={t('settings.account.name.title')}
          description={t('settings.account.name.desc')}
          save={t('settings.save')}
        />
        <SettingsImageForm
          user={user}
          title={t('settings.account.image.title')}
          description={t('settings.account.image.desc')}
          upload={t('settings.account.image.upload')}
          remove={t('settings.account.image.remove')}
          save={t('settings.save')}
          cancel={t('settings.cancel')}
          drag={t('settings.account.image.drag')}
          className="flex md:flex-row flex-col mx-auto text-center md:text-left"
        />
      </div>
      <SettingsUsernameForm
        user={user}
        title={t('settings.account.username.title')}
        description={t('settings.account.username.desc')}
        subDescription={t('settings.account.username.sub_desc')}
        save={t('settings.save')}
      />
      <div className="flex md:flex-row flex-col md:space-x-4 space-x-0 md:space-y-0 space-y-4">
        <SettingsDistrictForm
          user={user}
          title={t('settings.account.district.title')}
          description={t('settings.account.district.desc')}
          save={t('settings.save')}
        />
        <SettingsEmailForm
          user={user}
          title={t('settings.account.email.title')}
          description={t('settings.account.email.desc')}
          save={t('settings.save')}
        />
      </div>
      <DeleteAccount
        title={t('settings.account.delete.title')}
        description={t('settings.account.delete.desc')}
        subDescription={t('settings.account.delete.sub_desc')}
        save={t('settings.save')}
        cancel={t('settings.cancel')}
        deleteButton={t('settings.account.delete.delete')}
        confirm={t('settings.account.delete.confirm')}
      />
    </>
  )
}
