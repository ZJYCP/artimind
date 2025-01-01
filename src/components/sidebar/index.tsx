'use client'
import { useState } from 'react'
import { ChevronRight, ChevronLeft, User, Search, History } from 'lucide-react'
import SearchHistory from '@/components/search/hisotry'
import { useRouter } from '@/i18n/routing'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const expandSidebar = () => {
    if (isCollapsed) {
      setIsCollapsed(false)
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
          {!isCollapsed && <h1 className="text-xl font-bold">Logo</h1>}
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
        <button onClick={expandSidebar} className="p-4 flex items-center">
          <User className="w-6 h-6 mr-2" />
          {!isCollapsed && <span className="sidebar-text">登录</span>}
        </button>

        {/* Add Search Button */}
        <button
          onClick={expandSidebar}
          className="p-4 hover:bg-amber-100  flex items-center"
        >
          <Search className="w-6 h-6 mr-2" onClick={navigateToNewSearch} />
          {!isCollapsed && (
            <span className="sidebar-text" onClick={navigateToNewSearch}>
              新增搜索
            </span>
          )}
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
