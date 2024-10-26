import { routing } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcherSelect from './LocaleSwitcherSelect'

export default function LocaleSwitcher() {
  const t = useTranslations('common')
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label={t('localeSwitch')}
      options={routing.locales}
    ></LocaleSwitcherSelect>
  )
}
