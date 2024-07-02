import { ChatList as LobeChatList, ChatListProps } from '@lobehub/ui'

export default function ChatList(props: ChatListProps) {
  const { data } = props

  return (
    <LobeChatList
      data={data}
      renderMessages={{
        default: ({ id, editableContent }) => (
          <div id={id}>{editableContent}</div>
        ),
      }}
      style={{ width: '100%' }}
    />
  )
}
