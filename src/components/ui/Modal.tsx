'use client'

import { ReactNode, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  position?: 'center' | 'right'
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  position = 'center',
}: ModalProps) {
  const { theme } = useTheme()

  // prevents the user from scrolling the page when the modal is open :)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-md p-6 shadow-lg ${
          theme === 'dark' ? 'bg-mauve-dark-3' : 'bg-white'
        } ${
          position === 'right'
            ? 'max-md:max-w-none md:ml-auto md:mr-4 md:max-w-[600px]'
            : 'max-w-lg'
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-mauve-1' : 'text-mauve-dark-1'
            }`}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`rounded p-1 transition-colors ${
              theme === 'dark'
                ? 'text-mauve-11 hover:bg-mauve-dark-alpha-3 hover:text-mauve-12'
                : 'text-mauve-9 hover:bg-mauve-3 hover:text-mauve-dark-1'
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}
