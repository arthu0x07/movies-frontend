'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/contexts/ThemeContext'
import { signIn } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AxiosError } from 'axios'

const loginFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const { theme } = useTheme()
  const router = useRouter()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function handleLogin(data: LoginFormData) {
    try {
      console.log('Tentando fazer login com:', data)
      setError('')
      await signIn(data)
      console.log('Login bem sucedido!')
      router.push('/movies')
    } catch (err) {
      console.error('Erro no login:', err)
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setError('E-mail ou senha incorretos')
        } else {
          setError('Erro ao fazer login. Tente novamente.')
        }
      } else {
        setError('Erro ao fazer login. Tente novamente.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
    </form>
  )
}
