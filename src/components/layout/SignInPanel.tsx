'use client'

import { Brain } from 'lucide-react'
import Modal from '../common/Modal'
import { useSignInModal } from '@/hooks/useSignInModal'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/shared/Icons'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

interface SignInPanelProps {
  withModal?: boolean
}

/**
 * 登录面板
 * @param props
 * @constructor
 */
function SignInPanel(props: SignInPanelProps) {
  const signInModal = useSignInModal()
  const [signInClicked, setSignInClicked] = useState(false)
  const { withModal = true } = props

  function SignInGroup() {
    return (
      <div className="w-full">
        {/*Describtion*/}
        <div className="flex flex-col items-center justify-center space-y-3 bg-background py-6 text-center md:px-16">
          <a href={''}>
            <Brain className="size-10 text-primary"></Brain>
          </a>
          <h3 className="font-urban text-2xl font-bold">Artimind</h3>
          <p className="text-md font-medium">Sign in to unlock more featur</p>
        </div>

        {/*  Sign In Buttons*/}
        <div className="flex flex-col space-y-3 p-4">
          <Button
            variant="outline"
            disabled={signInClicked}
            onClick={() => {
              setSignInClicked(true)
              signIn('github', { callbackUrl: '/' }).then(() => {
                setSignInClicked(false)
              })
            }}
          >
            {signInClicked ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 size-4" />
            )}
            Sign In with Github
          </Button>
        </div>
      </div>
    )
  }

  return withModal ? (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <SignInGroup></SignInGroup>
    </Modal>
  ) : (
    <SignInGroup></SignInGroup>
  )
}

export default SignInPanel
