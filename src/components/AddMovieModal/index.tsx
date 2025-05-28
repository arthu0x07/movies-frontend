'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { FileUpload } from '@/components/ui/FileUpload'
import { useTheme } from '@/contexts/ThemeContext'
import { useGenres } from '@/contexts/GenresContext'
import {
  createMovie,
  uploadFile,
  subscribeToMovieNotification
} from '@/services/api'
import { CreateMovieData } from '@/@types/movie'

interface AddMovieModalProps {
  isOpen: boolean
  onClose: () => void
  onMovieAdded: () => void
}

interface FormData {
  title: string
  originalTitle: string
  description: string
  tagline: string
  releaseDate: string
  duration: string
  status: 'RELEASED' | 'IN_PRODUCTION' | 'PLANNED' | 'CANCELLED' | ''
  language: 'PT' | 'EN' | 'ES' | ''
  budget: string
  revenue: string
  popularity: string
  votes: string
  ratingPercentage: string
  genreIds: string[]
}

export function AddMovieModal({
  isOpen,
  onClose,
  onMovieAdded
}: AddMovieModalProps) {
  const { theme } = useTheme()
  const { genres } = useGenres()
  const [formData, setFormData] = useState<FormData>({
    title: '',
    originalTitle: '',
    description: '',
    tagline: '',
    releaseDate: '',
    duration: '',
    status: '',
    language: '',
    budget: '',
    revenue: '',
    popularity: '',
    votes: '',
    ratingPercentage: '',
    genreIds: []
  })

  const [selectedPosterFile, setSelectedPosterFile] = useState<File | null>(
    null
  )
  const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(
    null
  )
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen])

  const resetForm = () => {
    setFormData({
      title: '',
      originalTitle: '',
      description: '',
      tagline: '',
      releaseDate: '',
      duration: '',
      status: '',
      language: '',
      budget: '',
      revenue: '',
      popularity: '',
      votes: '',
      ratingPercentage: '',
      genreIds: []
    })
    setSelectedPosterFile(null)
    setSelectedBannerFile(null)
    setErrors({})
    setIsUploading(false)
    setUploadProgress(0)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleGenreToggle = (genreId: string) => {
    const currentGenres = formData.genreIds
    const newGenres = currentGenres.includes(genreId)
      ? currentGenres.filter((id) => id !== genreId)
      : [...currentGenres, genreId]

    setFormData((prev) => ({ ...prev, genreIds: newGenres }))
    if (errors.genreIds) {
      setErrors((prev) => ({ ...prev, genreIds: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Título é obrigatório'
    if (!formData.originalTitle.trim())
      newErrors.originalTitle = 'Título original é obrigatório'
    if (!formData.description.trim())
      newErrors.description = 'Descrição é obrigatória'
    if (formData.description.length < 10)
      newErrors.description = 'Descrição deve ter pelo menos 10 caracteres'
    if (!formData.tagline.trim()) newErrors.tagline = 'Tagline é obrigatória'
    if (!formData.releaseDate)
      newErrors.releaseDate = 'Data de lançamento é obrigatória'
    if (!formData.duration || Number(formData.duration) <= 0)
      newErrors.duration = 'Duração deve ser maior que 0'
    if (!formData.status) newErrors.status = 'Status é obrigatório'
    if (!formData.language) newErrors.language = 'Idioma é obrigatório'
    if (!formData.budget || Number(formData.budget) < 0)
      newErrors.budget = 'Orçamento deve ser maior ou igual a 0'
    if (!formData.revenue || Number(formData.revenue) < 0)
      newErrors.revenue = 'Receita deve ser maior ou igual a 0'
    if (
      !formData.popularity ||
      Number(formData.popularity) < 0 ||
      Number(formData.popularity) > 10
    ) {
      newErrors.popularity = 'Popularidade deve estar entre 0 e 10'
    }
    if (!formData.votes || Number(formData.votes) < 0)
      newErrors.votes = 'Votos deve ser maior ou igual a 0'
    if (
      !formData.ratingPercentage ||
      Number(formData.ratingPercentage) < 0 ||
      Number(formData.ratingPercentage) > 100
    ) {
      newErrors.ratingPercentage = 'Avaliação deve estar entre 0 e 100'
    }
    if (formData.genreIds.length === 0)
      newErrors.genreIds = 'Selecione pelo menos um gênero'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileSelect = (file: File) => {
    setSelectedPosterFile(file)
    if (errors.file) {
      setErrors((prev) => ({ ...prev, file: '' }))
    }
  }

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

  const handleFileRemove = () => {
    setSelectedPosterFile(null)
    setSelectedBannerFile(null)
  }

  const handlePosterFileRemove = () => {
    setSelectedPosterFile(null)
  }

  const handleBannerFileRemove = () => {
    setSelectedBannerFile(null)
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      let posterFileId: string | undefined
      let bannerFileId: string | undefined

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

      const movieData: CreateMovieData = {
        title: formData.title,
        originalTitle: formData.originalTitle,
        description: formData.description,
        tagline: formData.tagline,
        releaseDate: formData.releaseDate,
        duration: Number(formData.duration),
        status: formData.status as
          | 'RELEASED'
          | 'IN_PRODUCTION'
          | 'PLANNED'
          | 'CANCELLED',
        language: formData.language as 'PT' | 'EN' | 'ES',
        budget: Number(formData.budget),
        revenue: Number(formData.revenue),
        popularity: Number(formData.popularity),
        votes: Number(formData.votes),
        ratingPercentage: Number(formData.ratingPercentage),
        genresIds: formData.genreIds,
        posterFileId,
        bannerFileId
      }

      const createdMovie = await createMovie(movieData)

      // Check if release date is in the future and subscribe to notifications
      const releaseDate = new Date(formData.releaseDate + 'T00:00:00.000Z')
      const today = new Date()
      const todayUTC = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )

      if (releaseDate > todayUTC) {
        try {
          await subscribeToMovieNotification(createdMovie.id)
        } catch (error) {
          console.error('Erro ao inscrever usuário na notificação:', error)
        }
      }

      onMovieAdded()
      onClose()
    } catch (error: any) {
      console.error('Erro ao criar filme:', error)
      setErrors({
        submit: error.response?.data?.message || 'Erro ao criar filme'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const statusOptions = [
    { value: '', label: 'Selecione o status' },
    { value: 'RELEASED', label: 'Lançado' },
    { value: 'IN_PRODUCTION', label: 'Em Produção' },
    { value: 'PLANNED', label: 'Planejado' },
    { value: 'CANCELLED', label: 'Cancelado' }
  ]

  const languageOptions = [
    { value: '', label: 'Selecione o idioma' },
    { value: 'PT', label: 'Português' },
    { value: 'EN', label: 'Inglês' },
    { value: 'ES', label: 'Espanhol' }
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adicionar Filme"
      position="right"
    >
      <div className="space-y-6">
        <div>
          <label
            className={`font-robotoBold text-lg font-bold ${
              theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
            }`}
          >
            Poster do Filme
          </label>
          <div className="mt-2">
            <FileUpload
              onFileSelect={handlePosterFileSelect}
              onFileRemove={handlePosterFileRemove}
              selectedFile={selectedPosterFile || undefined}
              isUploading={isUploading && !!selectedPosterFile}
              uploadProgress={selectedPosterFile ? uploadProgress : 0}
              error={errors.posterFile}
              label=""
            />
          </div>
        </div>

        <div>
          <label
            className={`font-robotoBold text-lg font-bold ${
              theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
            }`}
          >
            Banner do Filme
          </label>
          <div className="mt-2">
            <FileUpload
              onFileSelect={handleBannerFileSelect}
              onFileRemove={handleBannerFileRemove}
              selectedFile={selectedBannerFile || undefined}
              isUploading={isUploading && !!selectedBannerFile}
              uploadProgress={selectedBannerFile ? uploadProgress : 0}
              error={errors.bannerFile}
              label=""
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Título *"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={errors.title}
            placeholder="Ex: Oppenheimer"
          />
          <Input
            label="Título Original *"
            value={formData.originalTitle}
            onChange={(e) => handleInputChange('originalTitle', e.target.value)}
            error={errors.originalTitle}
            placeholder="Ex: Oppenheimer"
          />
        </div>

        <Input
          label="Descrição *"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          error={errors.description}
          placeholder="Sinopse ou descrição detalhada do filme"
          multiline
          rows={3}
        />

        <Input
          label="Tagline *"
          value={formData.tagline}
          onChange={(e) => handleInputChange('tagline', e.target.value)}
          error={errors.tagline}
          placeholder="Ex: O mundo mudou para sempre"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Data de Lançamento *"
            type="date"
            value={formData.releaseDate}
            onChange={(e) => handleInputChange('releaseDate', e.target.value)}
            error={errors.releaseDate}
          />
          <Input
            label="Duração (minutos) *"
            type="number"
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            error={errors.duration}
            placeholder="Ex: 180"
            min="1"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Status *"
            value={formData.status}
            options={statusOptions}
            onChange={(e) => handleInputChange('status', e.target.value)}
            error={errors.status}
          />
          <Select
            label="Idioma *"
            value={formData.language}
            options={languageOptions}
            onChange={(e) => handleInputChange('language', e.target.value)}
            error={errors.language}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Orçamento (USD) *"
            type="number"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            error={errors.budget}
            placeholder="Ex: 100000000"
            min="0"
          />
          <Input
            label="Receita (USD) *"
            type="number"
            value={formData.revenue}
            onChange={(e) => handleInputChange('revenue', e.target.value)}
            error={errors.revenue}
            placeholder="Ex: 950000000"
            min="0"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            label="Popularidade (0-10) *"
            type="number"
            value={formData.popularity}
            onChange={(e) => handleInputChange('popularity', e.target.value)}
            error={errors.popularity}
            placeholder="Ex: 8.5"
            min="0"
            max="10"
            step="0.1"
          />
          <Input
            label="Votos *"
            type="number"
            value={formData.votes}
            onChange={(e) => handleInputChange('votes', e.target.value)}
            error={errors.votes}
            placeholder="Ex: 50000"
            min="0"
          />
          <Input
            label="Avaliação (%) *"
            type="number"
            value={formData.ratingPercentage}
            onChange={(e) =>
              handleInputChange('ratingPercentage', e.target.value)
            }
            error={errors.ratingPercentage}
            placeholder="Ex: 92"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label
            className={`font-robotoBold text-lg font-bold ${
              theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
            }`}
          >
            Gêneros *
          </label>

          <div className="mt-2 grid max-h-32 grid-cols-2 gap-2 overflow-y-auto">
            {genres.map((genre) => (
              <label
                key={genre.id}
                className={`flex cursor-pointer items-center gap-2 rounded p-2 transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-mauve-dark-alpha-3'
                    : 'hover:bg-mauve-3'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.genreIds.includes(genre.id)}
                  onChange={() => handleGenreToggle(genre.id)}
                  className="rounded"
                />
                <span
                  className={`text-sm ${
                    theme === 'dark' ? 'text-mauve-11' : 'text-mauve-dark-1'
                  }`}
                >
                  {genre.name}
                </span>
              </label>
            ))}
          </div>

          {errors.genreIds && (
            <span className="mt-1 text-sm text-red-500">{errors.genreIds}</span>
          )}
        </div>

        {errors.submit && (
          <div className="rounded bg-red-50 p-3 text-red-700">
            {errors.submit}
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
            disabled={isSubmitting || isUploading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting ? 'Criando...' : 'Criar Filme'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
