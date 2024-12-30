import SignInPanel from '@/components/layout/SignInPanel'

function LoginPage(props) {
  return (
    <div className="mx-auto max-w-sm my-4">
      <SignInPanel withModal={false}></SignInPanel>
    </div>
  )
}

export default LoginPage
