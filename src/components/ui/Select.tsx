'use client'

import { SelectHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '@/contexts/ThemeContext'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
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
        <div className="relative">
          <select
            ref={ref}
            className={twMerge(
              'min-h-[44px] w-full appearance-none rounded-[4px] border px-3 py-3 pr-10 outline-none transition-colors',
              theme === 'dark'
                ? 'border-mauve-dark-6 bg-mauve-dark-2 text-white'
                : 'border-mauve-3 bg-white text-mauve-dark-1',
              'focus:border-purple-9',
              error && 'border-red-500',
              className,
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className={`h-5 w-5 ${
                theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    )
  },
)

Select.displayName = 'Select'
