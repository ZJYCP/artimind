import {
  ActionIcon,
  ChatInputActionBar,
  ChatSendButton,
  TokenTag,
  ChatInputArea as LobeChatInputArea,
} from '@lobehub/ui'
import styles from './index.module.scss'
import { Eraser, Languages } from 'lucide-react'
import { ChatInputAreaProps } from './interface'
export default function ChatInputArea(props: ChatInputAreaProps) {
  const { onInput } = props
  const inputChangeHandler = (input: string) => {
    onInput(input)
  }
  return (
    <LobeChatInputArea
      bottomAddons={<ChatSendButton />}
      className={styles.bgWhite}
      onInput={inputChangeHandler}
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
