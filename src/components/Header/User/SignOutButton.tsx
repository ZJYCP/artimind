'use client'

import { useTranslations } from 'next-intl'
import { signOut } from 'next-auth/react'

function SignOutButton(props) {
  const t = useTranslations('common')

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    await signOut()
  }
  return (
    <button className="w-full h-full" onClick={handleSignOut}>
      {t('logout')}
    </button>
  )
}

export default SignOutButton
