import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label className="font-robotoBold text-lg font-bold text-mauve-dark-12">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(
            'min-h-[44px] rounded-[4px] border border-mauve-dark-6 bg-mauve-dark-2 px-3 py-3 text-mauve-dark-12 transition-colors placeholder:text-mauve-dark-9 focus:border-purple-9 focus:outline-none',
            error && 'border-red-500',
            className,
          )}
          {...props}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    )
  },
)

Input.displayName = 'Input'
