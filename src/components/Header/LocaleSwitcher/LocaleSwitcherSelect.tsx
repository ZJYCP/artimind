'use client'
import { Locale, usePathname, useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { PropsWithChildren, useCallback, useMemo, useTransition } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = PropsWithChildren<{
  defaultValue: string
  label: string
  options: readonly Locale[]
}>
export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
  options,
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const t = useTranslations('common')

  const onSelectChange = useCallback((nextLocale: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }, [])

  const items = useMemo(() => {
    return options.map((item) => ({
      key: item,
      label: (
        <a className="cursor-pointer" onClick={() => onSelectChange(item)}>
          {t(item)}
        </a>
      ),
    }))
  }, [options])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <a className="cursor-pointer">{t(defaultValue)}</a>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => {
          return (
            <DropdownMenuItem key={item.key}>{item.label}</DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  // return (
  //   <Dropdown
  //     menu={{ items: items }}
  //     disabled={isPending}
  //     className={isPending && 'cursor-not-allowed'}
  //     arrow
  //   ></Dropdown>
  // )
}
