'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { signUp } from '@/services/auth'
import { registerFormSchema, RegisterFormData } from '@/schemas/auth'

export function useRegisterForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function handleRegister(data: RegisterFormData) {
    try {
      setError('')
      setSuccess('')

      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      })

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

  const onSubmit = handleSubmit(handleRegister)

  return {
    form,
    error,
    success,
    isSubmitting,
    onSubmit,
  }
}
