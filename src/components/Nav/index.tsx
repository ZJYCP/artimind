// app/components/Nav.js
import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/chat">Chat</Link>
        </li>
        <li>
          <Link href="/design">Design</Link>
        </li>
      </ul>
    </nav>
  )
}
