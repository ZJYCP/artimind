import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Home, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sideBarItems = [
  {
    title: 'Dashboard',
    url: 'dashboard',
    icon: Home,
  },
  {
    title: 'Settings',
    url: 'settings',
    icon: Settings,
  },
]
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroupLabel>后台管理</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {sideBarItems.map((item) => {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  )
}
