/* eslint-disable @next/next/no-img-element */
'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Background } from '@/components/Background'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const { theme } = useTheme()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/movies')
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) {
    return null
  }

  return (
    !isAuthenticated && (
      <div
        className={`min-h-screen w-full ${
          theme === 'dark' ? 'bg-mauve-dark-1' : 'bg-white'
        }`}
      >
        <Background />
        <div className="relative z-10 mx-auto flex min-h-screen flex-col">
          <Header />

          <main className="flex flex-1 items-center justify-center px-4">
            <div className="w-full max-w-[500px] text-center">
              <div
                className={`rounded-md p-8 ${
                  theme === 'dark'
                    ? 'bg-mauve-dark-3'
                    : 'border border-mauve-4 bg-white shadow-lg'
                }`}
              >
                <div className="mb-8">
                  <h1
                    className={`font-robotoBold text-4xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
                    }`}
                  >
                    Cubos Movies
                  </h1>
                  <p
                    className={`font-robotoRegular mt-4 text-lg ${
                      theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
                    }`}
                  >
                    Sua plataforma de filmes favorita
                  </p>
                  <p
                    className={`font-robotoRegular mt-2 text-base ${
                      theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
                    }`}
                  >
                    Descubra, organize e compartilhe seus filmes preferidos
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <Link href="/login" className="flex-1">
                    <Button
                      className={`font-robotoRegular min-h-[44px] w-full px-6 py-3 ${
                        theme === 'dark'
                          ? 'bg-purple-dark-9 hover:bg-purple-dark-10'
                          : 'bg-purple-9 hover:bg-purple-10'
                      }`}
                    >
                      Fazer Login
                    </Button>
                  </Link>

                  <Link href="/register" className="flex-1">
                    <Button
                      variant="secondary"
                      className={`font-robotoRegular min-h-[44px] w-full px-6 py-3 ${
                        theme === 'dark'
                          ? 'border-purple-dark-9 text-purple-dark-11 hover:bg-purple-dark-alpha-3'
                          : 'border-purple-9 text-purple-9 hover:bg-purple-alpha-3'
                      }`}
                    >
                      Criar Conta
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    )
  )
}
