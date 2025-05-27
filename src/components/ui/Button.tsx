import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '@/contexts/ThemeContext'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary'
}

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const { theme } = useTheme()

  return (
    <button
      className={twMerge(
        'flex min-h-[44px] items-center justify-center rounded-[2px] px-5 py-3 text-base font-normal transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' &&
          'bg-purple-9 text-white hover:bg-purple-10 active:bg-purple-8 disabled:bg-mauve-dark-9',
        variant === 'secondary' &&
          theme === 'dark' &&
          'bg-purple-dark-alpha-8 text-mauve-12 hover:bg-purple-dark-alpha-9 active:bg-purple-dark-alpha-7 disabled:bg-mauve-dark-alpha-3',
        variant === 'secondary' &&
          theme === 'light' &&
          'bg-mauve-3 text-mauve-dark-1 hover:bg-mauve-4 active:bg-mauve-2 disabled:bg-mauve-1',
        className
      )}
      {...props}
    />
  )
}
