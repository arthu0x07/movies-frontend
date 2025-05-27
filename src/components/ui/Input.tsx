'use client'

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '@/contexts/ThemeContext'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  multiline?: false
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  multiline: true
}

type CombinedProps = InputProps | TextareaProps

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CombinedProps
>(({ className, label, error, multiline, ...props }, ref) => {
  const { theme } = useTheme()

  const baseClasses = twMerge(
    'min-h-[44px] rounded-[4px] border px-3 py-3 outline-none transition-colors resize-none',
    theme === 'dark'
      ? 'border-mauve-dark-6 bg-mauve-dark-2 text-white placeholder:text-mauve-dark-9'
      : 'border-mauve-3 bg-white text-mauve-dark-1 placeholder:text-mauve-9',
    'focus:border-purple-9',
    error && 'border-red-500',
    className,
  )

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
      {multiline ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={baseClasses}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={baseClasses}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
})

Input.displayName = 'Input'
