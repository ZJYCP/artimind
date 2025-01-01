import { Search } from '@/lib/bizTypes'
import { useRouter } from '@/i18n/routing'

interface HistoryItemProps {
  item: Search
}
function HistoryItem(props: HistoryItemProps) {
  const { item } = props
  const router = useRouter()

  const routerToDetail = () => {
    router.push(`/search/${item.id}`)
  }
  return (
    <li
      className="p-2 rounded cursor-pointer text-ellipsis"
      onClick={routerToDetail}
    >
      {item.title}
    </li>
  )
}

export default HistoryItem
