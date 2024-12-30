import Sidebar from '@/components/sidebar'

export default async function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full h-full flex">
      <div className="h-full w-1/4 bg-amber-300">
        <Sidebar></Sidebar>
      </div>
      <div className="h-full flex-1">{children}</div>
    </div>
  )
}
