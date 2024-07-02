'use client'
import { data } from './data'

import ChatInputArea from '../../components/ChatInputArea'
import ChatList from '../../components/ChatList'
export default function ChatPage() {
  return (
    <div className="h-full flex flex-col justify-between bg-white rounded-2xl">
      <section className="flex-1 mt-4">
        <ChatList data={data}></ChatList>
      </section>
      <section className="relative h-[300px] border-t border-t-gray-100">
        <ChatInputArea
          onInput={(val) => {
            console.log(val)
          }}
        ></ChatInputArea>
      </section>
    </div>
  )
}
