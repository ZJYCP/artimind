// app/chat/layout.js
import GlobalLayout from '../../components/Layout'
import ChatHistoryList from './ChatHistoryList'

export default function ChatLayout({ children }) {
  return (
    <GlobalLayout>
      <ChatHistoryList></ChatHistoryList>
      <div className="flex-1 bg-gray-100">{children}</div>
    </GlobalLayout>
  )
}
