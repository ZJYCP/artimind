import Sidebar from '@/components/sidebar'

export default async function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex-1 w-full h-[calc(100%-4rem)]  flex">
      <Sidebar></Sidebar>
      {children}
    </div>
  )
}
