/* eslint-disable @next/next/no-img-element */
'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LoginForm } from '@/app/login/components/LoginForm'
import { Background } from '@/components/Background'
import { useTheme } from '@/contexts/ThemeContext'

export default function LoginPage() {
  const { theme } = useTheme()

  return (
    <div
      className={`min-h-screen w-full ${
        theme === 'dark' ? 'bg-mauve-dark-1' : 'bg-white'
      }`}
    >
      <Background />
      <div className="relative z-10 mx-auto flex min-h-screen flex-col">
        <Header />

        <main className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-[382px]">
            <div
              className={`rounded-md p-4 ${
                theme === 'dark' ? 'bg-mauve-dark-3' : 'bg-mauve-3'
              }`}
            >
              <LoginForm />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
