// app/chat/layout.js
import Nav from '../../components/Nav'

export default function ChatLayout({ children }) {
  return (
    <div className="chat-layout">
      <Nav />
      <div className="chat-content">{children}</div>
    </div>
  )
}
