import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '@/contexts/ThemeContext'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const { theme } = useTheme()

  return (
    <button
      className={twMerge(
        'font-robotoRegular flex items-center justify-center rounded-[2px] text-base transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' && 'min-h-[32px] px-3 py-2 text-sm',
        size === 'md' && 'min-h-[44px] px-5 py-3 text-base',
        size === 'lg' && 'min-h-[52px] px-6 py-4 text-lg',
        variant === 'primary' &&
          'bg-purple-9 text-white hover:bg-purple-10 active:bg-purple-8 disabled:bg-mauve-dark-9',

        variant === 'secondary' &&
          theme === 'dark' &&
          'bg-purple-dark-alpha-13 text-custom-purple-1 hover:bg-purple-dark-alpha-9 active:bg-purple-dark-alpha-7 disabled:bg-mauve-dark-alpha-3',

        variant === 'secondary' &&
          theme === 'light' &&
          'bg-mauve-3 text-mauve-dark-1 hover:bg-mauve-4 active:bg-mauve-2 disabled:bg-mauve-1',
        className,
      )}
      {...props}
    />
  )
}
