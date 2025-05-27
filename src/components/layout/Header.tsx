/* eslint-disable @next/next/no-img-element */
'use client'

import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '../ui/Button'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated, signOut } = useAuth()

  return (
    <header
      className={`border-b px-4 py-3 backdrop-blur-sm ${
        theme === 'dark'
          ? 'border-mauve-dark-alpha-6'
          : 'border-mauve-3 bg-white'
      }`}
    >
      <div className="mx-auto flex max-w-[1366px] items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={theme === 'dark' ? '/logo.svg' : '/logo-dark.svg'}
            alt="Cubos Movies"
            width={160}
            height={36}
            className="h-auto w-auto"
            priority
          />
          <span
            className={`text-xl font-bold ${
              theme === 'dark' ? 'text-mauve-1' : 'text-mauve-dark-1'
            }`}
          >
            Movies
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <Image
                src="/sun.svg"
                alt="Toggle to light theme"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src="/moon.svg"
                alt="Toggle to dark theme"
                width={24}
                height={24}
              />
            )}
          </Button>

          {isAuthenticated && <Button onClick={signOut}>Logout</Button>}
        </div>
      </div>
    </header>
  )
}
