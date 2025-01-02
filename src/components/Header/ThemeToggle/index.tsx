'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslations } from 'next-intl'
import Cookies from 'js-cookie'

export default function ThemeToggle() {
  const { setTheme } = useTheme()
  const t = useTranslations('common')

  const onThemeChange = (theme: string) => {
    setTheme(theme)
    Cookies.set('theme', theme, { expires: 365 * 100 })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t('toggle-theme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onThemeChange('light')}>
          {t('light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onThemeChange('dark')}>
          {t('dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onThemeChange('system')}>
          {t('system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
