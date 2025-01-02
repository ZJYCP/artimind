import { Link } from '@/i18n/routing'
import LocaleSwitcher from './LocaleSwitcher'
import ThemeToggle from './ThemeToggle'
import UserAvatar from './User'

export default function Header() {
  return (
    <header className="w-full mx-auto px-8  py-6 flex justify-between items-center h-16 border-b border-amber-100">
      <Link href={'/'}>
        <div className="text-2xl font-bold cursor-pointer">Artimind</div>
      </Link>
      <div className="flex items-center space-x-4">
        <LocaleSwitcher></LocaleSwitcher>
        <ThemeToggle></ThemeToggle>
        <UserAvatar></UserAvatar>
      </div>
    </header>
  )
}
