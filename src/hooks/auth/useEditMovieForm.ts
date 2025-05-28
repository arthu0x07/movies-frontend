'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { updateMovie, uploadFile, subscribeToMovieNotification } from '@/services/api'
import { Movie, UpdateMovieData } from '@/@types/movie'
import { useGenres } from '@/contexts/GenresContext'
import { z } from 'zod'

const editMovieFormSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  originalTitle: z.string().min(1, 'Título original é obrigatório'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  tagline: z.string().min(1, 'Tagline é obrigatória'),
  releaseDate: z.string().min(1, 'Data de lançamento é obrigatória'),
  duration: z.string().min(1, 'Duração é obrigatória'),
  status: z.enum(['RELEASED', 'IN_PRODUCTION', 'PLANNED', 'CANCELLED']),
  language: z.enum(['PT', 'EN', 'ES']),
  budget: z.string().min(1, 'Orçamento é obrigatório'),
  revenue: z.string().min(1, 'Receita é obrigatória'),
  popularity: z.string().min(1, 'Popularidade é obrigatória'),
  votes: z.string().min(1, 'Votos é obrigatório'),
  ratingPercentage: z.string().min(1, 'Avaliação é obrigatória'),
  genreIds: z.array(z.string()).min(1, 'Selecione pelo menos um gênero'),
})

type EditMovieFormData = z.infer<typeof editMovieFormSchema>

interface UseEditMovieFormProps {
  movie: Movie
  onSuccess: () => void
  onClose: () => void
}

export function useEditMovieForm({ movie, onSuccess, onClose }: UseEditMovieFormProps) {
  const [selectedPosterFile, setSelectedPosterFile] = useState<File | null>(null)
  const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { genres: contextGenres } = useGenres()

  const form = useForm<EditMovieFormData>({
    resolver: zodResolver(editMovieFormSchema),
    defaultValues: {
      title: movie.title,
      originalTitle: movie.originalTitle,
      description: movie.description,
      tagline: movie.tagline,
      releaseDate: movie.releaseDate.split('T')[0], // Convert to YYYY-MM-DD format
      duration: movie.duration.toString(),
      status: movie.status,
      language: movie.language,
      budget: movie.budget.toString(),
      revenue: movie.revenue.toString(),
      popularity: movie.popularity.toString(),
      votes: movie.votes.toString(),
      ratingPercentage: movie.ratingPercentage.toString(),
      genreIds: movie.genres.map(genre => genre.id),
    },
  })

  const { handleSubmit, formState: { isValid } } = form

  const handlePosterFileSelect = (file: File) => {
    setSelectedPosterFile(file)
    if (errors.posterFile) {
      setErrors((prev) => ({ ...prev, posterFile: '' }))
    }
  }

  const handleBannerFileSelect = (file: File) => {
    setSelectedBannerFile(file)
    if (errors.bannerFile) {
      setErrors((prev) => ({ ...prev, bannerFile: '' }))
    }
  }

  const handlePosterFileRemove = () => {
    setSelectedPosterFile(null)
  }

  const handleBannerFileRemove = () => {
    setSelectedBannerFile(null)
  }

  const handleGenreToggle = (genreId: string) => {
    const currentGenres = form.getValues('genreIds')
    const newGenres = currentGenres.includes(genreId)
      ? currentGenres.filter((id) => id !== genreId)
      : [...currentGenres, genreId]

    form.setValue('genreIds', newGenres)
    if (errors.genreIds) {
      setErrors((prev) => ({ ...prev, genreIds: '' }))
    }
  }

  async function handleEditMovie(data: EditMovieFormData) {
    try {
      setIsSubmitting(true)
      setErrors({})

      let posterFileId: string | undefined = movie.posterFileId
      let bannerFileId: string | undefined = movie.bannerFileId

      // Upload poster file if selected
      if (selectedPosterFile) {
        setIsUploading(true)
        setUploadProgress(0)

        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 45) {
              clearInterval(progressInterval)
              return 45
            }
            return prev + 5
          })
        }, 100)

        try {
          const uploadResult = await uploadFile(selectedPosterFile)
          posterFileId = uploadResult.fileId
          setUploadProgress(50)
          clearInterval(progressInterval)
        } catch (error) {
          clearInterval(progressInterval)
          throw new Error('Erro ao fazer upload do poster')
        }
      }

      // Upload banner file if selected
      if (selectedBannerFile) {
        if (!selectedPosterFile) {
          setIsUploading(true)
          setUploadProgress(0)
        }

        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 5
          })
        }, 100)

        try {
          const uploadResult = await uploadFile(selectedBannerFile)
          bannerFileId = uploadResult.fileId
          setUploadProgress(100)
          clearInterval(progressInterval)
        } catch (error) {
          clearInterval(progressInterval)
          throw new Error('Erro ao fazer upload do banner')
        } finally {
          setIsUploading(false)
        }
      } else if (selectedPosterFile) {
        setIsUploading(false)
      }

      // Update the movie
      const movieData: UpdateMovieData = {
        title: data.title,
        originalTitle: data.originalTitle,
        description: data.description,
        tagline: data.tagline,
        releaseDate: data.releaseDate,
        duration: Number(data.duration),
        status: data.status,
        language: data.language,
        budget: Number(data.budget),
        revenue: Number(data.revenue),
        popularity: Number(data.popularity),
        votes: Number(data.votes),
        ratingPercentage: Number(data.ratingPercentage),
        genresIds: data.genreIds,
        posterFileId,
        bannerFileId,
      }

      await updateMovie(movie.id, movieData)
      
      const newReleaseDate = new Date(data.releaseDate + 'T00:00:00.000Z')
      const originalReleaseDate = new Date(movie.releaseDate)
      const today = new Date()
      const todayUTC = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      
      if (newReleaseDate > todayUTC && newReleaseDate.getTime() !== originalReleaseDate.getTime()) {
        try {
          await subscribeToMovieNotification(movie.id)
       
        } catch (error) {
          console.error('Falha ao inscrever usuário na notificação:', {
            movieId: movie.id,
            movieTitle: data.title,
            error: error instanceof Error ? error.message : String(error),
          })
        }
      }
      
      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('Erro ao editar filme:', error)
      setErrors({
        submit: error.response?.data?.message || error.message || 'Erro ao editar filme'
      })
    } finally {
      setIsSubmitting(false)
      setIsUploading(false)
    }
  }

  const onSubmit = handleSubmit(handleEditMovie)

  return {
    form,
    errors,
    isSubmitting,
    isUploading,
    uploadProgress,
    genres: contextGenres,
    selectedPosterFile,
    selectedBannerFile,
    onSubmit,
    handlePosterFileSelect,
    handleBannerFileSelect,
    handlePosterFileRemove,
    handleBannerFileRemove,
    handleGenreToggle,
  }
} 