'use client'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { useSignInModal } from '@/hooks/useSignInModal'

function SignInButton(props) {
  const signInModal = useSignInModal()

  return (
    <Button
      className="rounded-full"
      onClick={() => {
        signInModal.onOpen()
      }}
    >
      <User size={24} />
    </Button>
  )
}

export default SignInButton
