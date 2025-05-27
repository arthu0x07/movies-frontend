'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Button } from './Button'
import { Modal } from './Modal'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isLoading = false
}: ConfirmDialogProps) {
  const { theme } = useTheme()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p
          className={`text-base ${
            theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
          }`}
        >
          {message}
        </p>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? 'Excluindo...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
