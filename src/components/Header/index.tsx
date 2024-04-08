import { Link } from "../../i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./User";

export default function Header(

) {
  return <header className="container mx-auto px-4 py-6 flex justify-between items-center">
    <Link href={'/'}>
      <div className="text-2xl font-bold cursor-pointer">Artimind</div>
    </Link>
    <div className="flex items-center space-x-4">
      <LocaleSwitcher></LocaleSwitcher>
      <ThemeToggle></ThemeToggle>
      <UserAvatar></UserAvatar>
    </div>

  </header>

}