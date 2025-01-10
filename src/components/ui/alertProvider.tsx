'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface AlertOptions {
  title?: string
  description: string
  type?: 'destructive' | 'default'
}

interface AlertContextProps {
  showAlert: (options: AlertOptions) => void
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertOptions | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const showAlert = (options: AlertOptions) => {
    setAlert(options)
    setIsVisible(true)
    setTimeout(() => setIsVisible(false), 3000) // 自动隐藏 3 秒后
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {isVisible && alert && (
        <div className="fixed top-4 right-4 z-50 ">
          <Alert variant={alert.type || 'default'} className="bg-white">
            {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
            <AlertDescription>{alert.description}</AlertDescription>
            {/*<Button*/}
            {/*  variant="ghost"*/}
            {/*  className="ml-auto"*/}
            {/*  onClick={() => setIsVisible(false)}*/}
            {/*>*/}
            {/*  Close*/}
            {/*</Button>*/}
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}
