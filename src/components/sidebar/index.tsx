'use client'
import { useState } from 'react'
import { ChevronRight, ChevronLeft, User, Search, History } from 'lucide-react'
import SearchHistory from '@/components/search/hisotry'
import { useRouter } from '@/i18n/routing'
import { useSession } from 'next-auth/react'
import { useSignInModal } from '@/hooks/useSignInModal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  const signInModel = useSignInModal()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const expandSidebar = () => {
    if (isCollapsed) {
      setIsCollapsed(false)
    }
  }

  const loginClick = () => {
    if (!session?.user?.id) {
      signInModel.onOpen()
    }
  }

  const navigateToNewSearch = () => {
    router.push('/search')
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`flex flex-col transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b ">
          {!isCollapsed && <h1 className="text-xl font-bold"> </h1>}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            {isCollapsed ? (
              <ChevronRight className="w-6 h-6" />
            ) : (
              <ChevronLeft className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={loginClick}
          className="p-4 flex hover:bg-amber-50 dark:hover:bg-gray-500 items-center"
        >
          {session?.user?.id ? (
            <Avatar className="h-9 w-9">
              <AvatarImage src={session?.user.image} alt="user avatar" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          ) : isCollapsed ? (
            <User className="w-6 h-6 mr-2" />
          ) : (
            <span className="sidebar-text">登录</span>
          )}
        </button>

        {/* Add Search Button */}
        <button
          onClick={navigateToNewSearch}
          className="p-4 hover:bg-amber-50 dark:hover:bg-gray-500  flex items-center"
        >
          <Search className="w-6 h-6 mr-2" />
          {!isCollapsed && <span className="sidebar-text">新增搜索</span>}
        </button>

        {/* Search History */}
        <SearchHistory
          expandSidebar={expandSidebar}
          isCollapsed={isCollapsed}
        ></SearchHistory>
      </div>
    </div>
  )
}

export default Sidebar
