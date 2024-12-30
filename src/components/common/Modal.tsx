import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ModalProps {
  children: React.ReactNode
  className?: string
  showModal: boolean
  setShowModal: (open: boolean) => void
}
const Modal = (props: ModalProps) => {
  const { children, className, showModal, setShowModal } = props
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="w-full overflow-hidden p-0 md:max-w-md ">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
