'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/contexts/ThemeContext'
import { signUp } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AxiosError } from 'axios'
import Link from 'next/link'

const registerFormSchema = z
  .object({
    name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirmação de senha obrigatória')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  })

type RegisterFormData = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const { theme } = useTheme()
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  async function handleRegister(data: RegisterFormData) {
    try {
      console.log('Tentando registrar usuário:', data)
      setError('')
      setSuccess('')

      await signUp({
        name: data.name,
        email: data.email,
        password: data.password
      })

      console.log('Registro bem sucedido!')
      setSuccess('Conta criada com sucesso! Redirecionando para o login...')

      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      console.error('Erro no registro:', err)
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          setError('E-mail já está em uso')
        } else if (err.response?.status === 400) {
          setError('Dados inválidos. Verifique as informações.')
        } else {
          setError('Erro ao criar conta. Tente novamente.')
        }
      } else {
        setError('Erro ao criar conta. Tente novamente.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
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
