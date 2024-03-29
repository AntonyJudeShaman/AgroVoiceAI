import { useLocale, useTranslations } from 'next-intl'
import { locales } from '../config'
import LocaleSwitcherSelect from './local-switcher-select'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {['en', 'ta'].map(cur => (
        <option
          key={cur}
          value={cur}
          className="dark:bg-black bg-white dark:text-white text-black"
        >
          {cur === 'en' ? 'English' : 'தமிழ்'}
        </option>
      ))}
    </LocaleSwitcherSelect>
  )
}
