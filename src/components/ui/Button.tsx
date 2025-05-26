import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary'
}

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'flex min-h-[44px] items-center justify-center rounded-[2px] px-5 py-3 text-base font-normal transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' &&
          'bg-purple-9 text-white hover:bg-purple-10 active:bg-purple-8 disabled:bg-mauve-dark-9',
        variant === 'secondary' &&
          'bg-purple-dark-alpha-2 text-mauve-dark-12 hover:bg-purple-dark-alpha-3 active:bg-purple-dark-alpha-1 disabled:bg-mauve-dark-alpha-3',
        className,
      )}
      {...props}
    />
  )
}
