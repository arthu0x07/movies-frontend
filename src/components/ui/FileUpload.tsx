'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from './Button'
import { getImageUrl } from '@/utils/imageUrl'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileRemove: () => void
  selectedFile?: File
  isUploading?: boolean
  uploadProgress?: number
  accept?: string
  label?: string
  error?: string
  currentFileUrl?: string
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  selectedFile,
  isUploading = false,
  uploadProgress = 0,
  accept = 'image/jpeg,image/png,image/jpg,image/webp',
  label = 'Arquivo do Filme',
  error,
  currentFileUrl
}: FileUploadProps) {
  const { theme } = useTheme()
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          className={`font-robotoBold text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
          }`}
        >
          {label}
        </label>
      )}

      <div
        className={`relative min-h-[120px] w-full cursor-pointer rounded-[4px] border-2 border-dashed p-4 transition-colors ${
          isDragOver
            ? theme === 'dark'
              ? 'border-purple-dark-9 bg-purple-dark-alpha-3'
              : 'border-purple-9 bg-purple-alpha-3'
            : theme === 'dark'
              ? 'border-mauve-dark-6 bg-mauve-dark-2'
              : 'border-mauve-6 bg-mauve-2'
        } ${
          error
            ? 'border-red-500'
            : 'focus-within:border-purple-9 hover:border-purple-9'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {selectedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded ${
                  theme === 'dark' ? 'bg-mauve-dark-4' : 'bg-mauve-4'
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
                  }
                >
                  <path
                    d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <p
                  className={`text-sm font-montserratMedium ${
                    theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
                  }`}
                >
                  {selectedFile.name}
                </p>
                <p
                  className={`text-xs ${
                    theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
                  }`}
                >
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onFileRemove()
              }}
              className="h-8 w-8 p-0"
            >
              <svg
                width="16"
                height="16"
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
            </Button>
          </div>
        ) : currentFileUrl ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded">
                <img
                  src={getImageUrl(currentFileUrl)}
                  alt="Arquivo atual"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p
                  className={`text-sm font-montserratMedium ${
                    theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
                  }`}
                >
                  Arquivo atual
                </p>
                <p
                  className={`text-xs ${
                    theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
                  }`}
                >
                  Clique para alterar
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`mb-2 ${
                theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
              }`}
            >
              <path
                d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 15.01L8.01 15L12 11L16 15.01"
                fill="currentColor"
              />
            </svg>
            <p
              className={`text-lg font-montserratMedium ${
                theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
              }`}
            >
              Clique ou arraste um arquivo aqui
            </p>
            <p
              className={`text-xs ${
                theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
              }`}
            >
              JPG, PNG ou PDF até 10MB
            </p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded bg-black/50">
            <div className="text-center">
              <div
                className={`mb-2 h-2 w-32 rounded-full ${
                  theme === 'dark' ? 'bg-mauve-dark-6' : 'bg-mauve-6'
                }`}
              >
                <div
                  className="h-full rounded-full bg-purple-9 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-white">
                Enviando... {Math.round(uploadProgress)}%
              </p>
            </div>
          </div>
        )}
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
