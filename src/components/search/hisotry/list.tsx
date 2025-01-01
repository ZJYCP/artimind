'use client'
import { useSearchStore } from '@/store/SearchStore'
import HistoryItem from '@/components/search/hisotry/item'

function HistoryList(props) {
  const searches = useSearchStore((state) => state.searches)
  return (
    <div className="flex flex-col flex-1 overflow-y-auto pl-4 border-t border-gray-700">
      <div className="text-lg font-semibold">搜索历史</div>
      <ul className="mt-2 space-y-2 overflow-y-auto   ">
        {searches.map((search, index) => (
          <HistoryItem key={search.id} item={search}></HistoryItem>
        ))}
      </ul>
    </div>
  )
}

export default HistoryList
