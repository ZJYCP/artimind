import Nav from '../Nav'

export default function GlobalLayout({ children }) {
  return (
    <div className="flex flex-row h-[100vh]">
      <Nav />
      <div className="flex-1 flex flex-row">{children}</div>
    </div>
  )
}
