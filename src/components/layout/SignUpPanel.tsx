'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface SignUpPanelProps {
  contentTrigger: (status: 'in' | 'up') => void
}
function SignUpPanel(props: SignUpPanelProps) {
  const { contentTrigger } = props
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async () => {
    // 处理表单提交逻辑
    console.log('Form submitted:', formData)
    const res = await fetch('/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    console.log(res)
  }
  return (
    <div className="space-y-4 flex flex-col p-3">
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
      <Button onClick={handleSubmit}>Sign Up</Button>
      <div className="mt-3">
        <a className="cursor-pointer" onClick={() => contentTrigger('in')}>
          Sign In
        </a>
      </div>
    </div>
  )
}

export default SignUpPanel
