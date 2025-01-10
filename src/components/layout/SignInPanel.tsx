'use client'

import { Brain } from 'lucide-react'
import Modal from '../common/Modal'
import { useSignInModal } from '@/hooks/useSignInModal'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/shared/Icons'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Separator } from '../ui/separator'
import SignUpPanel from '@/components/layout/SignUpPanel'
import { useAlert } from '@/components/ui/alertProvider'

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
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [inOrUp, setInOrUp] = useState<'in' | 'up'>('in')
  const { showAlert } = useAlert()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const contentTrigger = (state: 'in' | 'up') => {
    setInOrUp(state)
  }

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

        {/*  Sign In Github*/}
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
        <Separator className="m-y-4"></Separator>
        {/* SIGN IN EMAIL */}
        <div className="p-3">
          <div className=" flex flex-col space-y-4 ">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button
              onClick={async () => {
                setSignInClicked(true)
                const signInRes = await signIn('credentials', {
                  redirect: false,
                  ...formData,
                })

                console.log(signInRes)
                setSignInClicked(false)

                if (!signInRes.error) {
                  showAlert({
                    title: 'Login Successful',
                    description: 'Welcome back!',
                  })
                  signInModal.onClose()
                } else {
                  showAlert({
                    title: 'Login Failed',
                    description: signInRes.error,
                    type: 'destructive',
                  })
                }
              }}
            >
              Sign In
            </Button>
          </div>
          <div className="mt-3">
            <a className="cursor-pointer" onClick={() => contentTrigger('up')}>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    )
  }

  const content =
    inOrUp === 'in' ? (
      <SignInGroup></SignInGroup>
    ) : (
      <SignUpPanel contentTrigger={contentTrigger}></SignUpPanel>
    )

  return withModal ? (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      {content}
    </Modal>
  ) : (
    content
  )
}

export default SignInPanel
