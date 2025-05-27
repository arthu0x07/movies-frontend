'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '@/contexts/ThemeContext'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    const { theme } = useTheme()

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
        <input
          ref={ref}
          className={twMerge(
            'min-h-[44px] rounded-[4px] border px-3 py-3 outline-none transition-colors',
            theme === 'dark'
              ? 'border-mauve-dark-6 bg-mauve-dark-2 text-mauve-12 placeholder:text-mauve-dark-9'
              : 'border-mauve-3 bg-white text-mauve-dark-1 placeholder:text-mauve-9',
            'focus:border-purple-9',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
