'use client'
import Link from 'next/link'
import Logo from '@img/common/Logo.svg'
import { WechatWorkOutlined, CodepenOutlined } from '@ant-design/icons'

const MenuItemClass = 'flex flex-col justify-center items-center my-4'
export default function Nav() {
  return (
    <aside className="w-[80px] h-full flex flex-col  items-center bg-gray-100 border-r-2 border-r-gray-200">
      <div className="flex flex-col items-center justify-center w-full">
        <Logo className="my-4"></Logo>
        <div className="bg-gray-300 h-[2px] w-3/4"></div>
      </div>
      <nav>
        <ul className="flex flex-col ">
          <Link href="/chat" className={MenuItemClass}>
            <WechatWorkOutlined
              style={{ fontSize: '30px' }}
            ></WechatWorkOutlined>
            Chat
          </Link>
          <Link href="/design" className={MenuItemClass}>
            <CodepenOutlined style={{ fontSize: '30px' }}></CodepenOutlined>
            Design
          </Link>
        </ul>
      </nav>
    </aside>
  )
}
