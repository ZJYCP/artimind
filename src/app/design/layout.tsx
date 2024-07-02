// app/design/layout.js
import Nav from '../../components/Nav'

export default function DesignLayout({ children }) {
  return (
    <div className="flex flex-row h-[100vh]">
      <Nav />
      <div className="chat-content">{children}</div>
    </div>
  )
}
