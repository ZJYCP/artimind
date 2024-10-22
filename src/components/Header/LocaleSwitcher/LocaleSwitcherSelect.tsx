'use client'
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { Dropdown, MenuProps } from "antd";
import { useTranslations } from "next-intl";
import { PropsWithChildren, useCallback, useMemo, useTransition } from "react";

type Props = PropsWithChildren<{
  defaultValue: string,
  label: string
  options: readonly Locale[]
}>
export default function LocaleSwitcherSelect({ children, defaultValue, label, options }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const t = useTranslations('common');


  const onSelectChange = useCallback((nextLocale: Locale) => {
    startTransition(() => {
      router.replace(
        pathname,
        { locale: nextLocale }
      );
    });
  }, [])


  const items: MenuProps['items'] = useMemo(() => {
    return options.map(item => ({
      key: item,
      label: <a className="cursor-pointer" onClick={() => onSelectChange(item)}>{t(item)}</a>
    }))
  }, [options])

  return (
    <Dropdown menu={{ items: items }} disabled={isPending} className={isPending && "cursor-not-allowed"} arrow>
      <a className="cursor-pointer">{t(defaultValue)}</a>
    </Dropdown>
  )
}