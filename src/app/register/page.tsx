/* eslint-disable @next/next/no-img-element */
'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { RegisterForm } from '@/components/forms/RegisterForm'
import { Background } from '@/components/Background'
import { useTheme } from '@/contexts/ThemeContext'

export default function RegisterPage() {
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
                theme === 'dark'
                  ? 'bg-mauve-dark-3'
                  : 'border border-mauve-4 bg-white shadow-lg'
              }`}
            >
              <div className="mb-6 text-center">
                <h1
                  className={`font-robotoBold text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
                  }`}
                >
                  Criar Conta
                </h1>
                <p
                  className={`font-robotoRegular mt-2 text-sm ${
                    theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
                  }`}
                >
                  Preencha os dados para criar sua conta
                </p>
              </div>
              <RegisterForm />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
