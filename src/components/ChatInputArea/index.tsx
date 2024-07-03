import {
  ActionIcon,
  ChatInputActionBar,
  ChatSendButton,
  ChatInputArea as LobeChatInputArea,
  TokenTag,
} from '@lobehub/ui'
import { Eraser, Languages } from 'lucide-react'
import styles from './index.module.scss'
import { ChatInputAreaProps } from './interface'
export default function ChatInputArea(props: ChatInputAreaProps) {
  const { onInput, onSend } = props
  const inputChangeHandler = (input: string) => {
    onInput(input)
  }

  const sendHandler = () => {
    onSend()
  }
  return (
    <LobeChatInputArea
      bottomAddons={<ChatSendButton onSend={sendHandler} />}
      className={styles.bgWhite}
      onInput={inputChangeHandler}
      onSend={sendHandler}
      topAddons={
        <ChatInputActionBar
          leftAddons={
            <>
              <ActionIcon icon={Languages} />
              <ActionIcon icon={Eraser} />
              <TokenTag maxValue={5000} value={1000} />
            </>
          }
        />
      }
    />
  )
}
