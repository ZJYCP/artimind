import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { auth, signIn, signOut } from '@/lib/auth'
import { User } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function UserAvatar() {
  const session = await auth()
  const t = await getTranslations('common')

  if (session) {
    const user = session.user
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.image} alt="user avatar" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>My Account</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <form
              action={async () => {
                'use server'
                await signOut()
              }}
            >
              <button className="w-full h-full">{t('logout')}</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  } else {
    return (
      <form
        action={async () => {
          'use server'
          await signIn()
        }}
      >
        <Button className="rounded-full">
          <User size={24} />
        </Button>
      </form>
    )
  }
}
