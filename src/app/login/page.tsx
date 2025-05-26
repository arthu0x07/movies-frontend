/* eslint-disable @next/next/no-img-element */
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LoginForm } from '@/app/login/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-mauve-dark-1">
      <div className="absolute inset-x-0 top-[-100px]">
        <div className="relative">
          <div className="h-[564px] w-full">
            <img
              src="/background.svg"
              alt="Background"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-mauve-dark-1/50 via-mauve-dark-1/80 to-mauve-dark-1" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1366px] flex-col">
        <Header />

        <main className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-[382px]">
            <div className="rounded-md bg-mauve-dark-3 p-4">
              <LoginForm />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
