'use client'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/contexts/ThemeContext'
import { useLoginForm } from '@/hooks/auth/useLoginForm'
import Link from 'next/link'

export function LoginForm() {
  const { theme } = useTheme()
  const { form, error, isSubmitting, onSubmit } = useLoginForm()

  const {
    register,
    formState: { errors },
  } = form

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div className="rounded border border-red-500 bg-red-500/10 p-2 text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Nome/E-mail"
          type="email"
          placeholder="Digite seu nome/E-mail"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <a
          href="#"
          className={`font-robotoRegular text-base underline transition-colors ${
            theme === 'dark'
              ? 'text-purple-11 hover:text-purple-12'
              : 'text-purple-9 hover:text-purple-10'
          }`}
        >
          Esqueci minha senha
        </a>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`font-robotoRegular min-h-[44px] px-5 py-3 ${
            theme === 'dark'
              ? 'bg-purple-dark-9 hover:bg-purple-dark-10'
              : 'bg-purple-9 hover:bg-purple-10'
          }`}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </div>

      <div className="mt-4 text-center">
        <span
          className={`font-robotoRegular mr-1 text-md ${
            theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
          }`}
        >
          Não tem uma conta? 
        </span>
        <Link
          href="/register"
          className={`font-robotoRegular text-lg underline transition-colors ${
            theme === 'dark'
              ? 'text-purple-11 hover:text-purple-12'
              : 'text-purple-9 hover:text-purple-10'
          }`}
        >
          Criar conta
        </Link>
      </div>
    </form>
  )
}
