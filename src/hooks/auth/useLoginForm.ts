'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { useAuth } from '@/contexts/AuthContext'
import { signIn } from '@/services/auth'
import { loginFormSchema, LoginFormData } from '@/schemas/auth'

export function useLoginForm() {
  const { checkAuth } = useAuth()
  const router = useRouter()
  const [error, setError] = useState('')

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, formState: { isSubmitting } } = form

  async function handleLogin(data: LoginFormData) {
    try {
      console.log('Tentando fazer login com:', data)
      setError('')
      await signIn(data)
      console.log('Login bem sucedido!')
      checkAuth()
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

  const onSubmit = handleSubmit(handleLogin)

  return {
    form,
    error,
    isSubmitting,
    onSubmit,
  }
} 