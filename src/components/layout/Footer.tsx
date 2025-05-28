'use client'

import { useTheme } from '@/contexts/ThemeContext'

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer
      className={`border-t px-5 py-6 text-center ${
        theme === 'dark'
          ? 'border-mauve-dark-alpha-6 bg-transparent'
          : 'border-mauve-4 bg-white/95 shadow-sm'
      }`}
    >
      <div className="mx-auto max-w-[1440px]">
        <p
          className={`text-base font-montserratRegular ${
            theme === 'dark' ? 'text-mauve-11' : 'text-mauve-dark-1'
          }`}
        >
          2025 © Todos os direitos reservados a{' '}
          <strong className="font-montserratSemibold">Cubos Movies</strong>
        </p>
      </div>
    </footer>
  )
}
