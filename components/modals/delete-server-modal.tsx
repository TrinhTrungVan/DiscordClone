'use client'

import {useState} from 'react'
import axios from 'axios'

import {useModal} from '@/hooks/use-modal-store'
import {useRouter} from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'

const DeleteServerModal = () => {
  const router = useRouter()
  const {isOpen, onClose, type, data} = useModal()
  const isModalOpen = isOpen && type === 'deleteServer'
  const {server} = data

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/servers/${server?.id}`)

      onClose()
      router.refresh()
      router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button
              disabled={isLoading}
              onClick={() => onClose()}
              variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} variant="primary" onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteServerModal
