import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './app-sidebar'

interface AdminPageLayoutProps {
  children: React.ReactNode
}
export default function AdminPageLayout({ children }: AdminPageLayoutProps) {
  return (
    <SidebarProvider>
      <aside>
        <AppSidebar></AppSidebar>
      </aside>
      <main className={'mx-3'}>
        <SidebarTrigger></SidebarTrigger>
        {children}
      </main>
    </SidebarProvider>
  )
}
