'use client'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/contexts/ThemeContext'
import { useRegisterForm } from '@/hooks/auth/useRegisterForm'
import Link from 'next/link'

export function RegisterForm() {
  const { theme } = useTheme()
  const { form, error, success, isSubmitting, onSubmit } = useRegisterForm()

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

      {success && (
        <div className="rounded border border-green-500 bg-green-500/10 p-2 text-sm text-green-500">
          {success}
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Nome"
          type="text"
          placeholder="Digite seu nome completo"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
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

        <Input
          label="Confirmar Senha"
          type="password"
          placeholder="Confirme sua senha"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`font-robotoRegular min-h-[44px] px-5 py-3 ${
            theme === 'dark'
              ? 'bg-purple-dark-9 hover:bg-purple-dark-10'
              : 'bg-purple-9 hover:bg-purple-10'
          }`}
        >
          {isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </Button>

        <div className="text-center">
          <span
            className={`font-robotoRegular text-sm ${
              theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'
            }`}
          >
            Já tem uma conta?{' '}
          </span>
          <Link
            href="/login"
            className={`font-robotoRegular text-sm underline transition-colors ${
              theme === 'dark'
                ? 'text-purple-11 hover:text-purple-12'
                : 'text-purple-9 hover:text-purple-10'
            }`}
          >
            Faça login
          </Link>
        </div>
      </div>
    </form>
  )
}
