import { useLocale } from 'next-intl'
import LocaleSwitcherSelect from './local-switcher-select'

export default function LocaleSwitcher() {
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect defaultValue={locale}>
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
