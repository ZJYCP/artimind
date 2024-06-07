// app/design/layout.js
import Nav from '../../components/Nav'

export default function DesignLayout({ children }) {
  return (
    <div className="design-layout">
      <Nav />
      <div className="design-content">{children}</div>
    </div>
  )
}
