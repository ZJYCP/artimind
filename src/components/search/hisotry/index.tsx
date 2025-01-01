import { History } from 'lucide-react'
import HistoryList from '@/components/search/hisotry/list'
import { cn } from '@/lib/utils'

interface SearchHistoryProps {
  isCollapsed: boolean
  expandSidebar: () => void
}
function SearchHistory(props: SearchHistoryProps) {
  const { isCollapsed, expandSidebar } = props

  return isCollapsed ? (
    <div
      className="p-4 border-t border-gray-700 flex items-start justify-center cursor-pointer hover:bg-gray-700"
      onClick={expandSidebar}
    >
      <History className="w-6 h-6 " />
    </div>
  ) : (
    <HistoryList></HistoryList>
  )
}

export default SearchHistory
