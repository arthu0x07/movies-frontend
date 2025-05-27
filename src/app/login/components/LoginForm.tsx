'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/contexts/ThemeContext'

const loginFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const { theme } = useTheme()
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
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
