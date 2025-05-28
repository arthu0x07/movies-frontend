'use client'

import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { FileUpload } from '@/components/ui/FileUpload'
import { useTheme } from '@/contexts/ThemeContext'
import { useEditMovieForm } from '@/hooks/auth/useEditMovieForm'
import { Movie } from '@/@types/movie'

interface EditMovieModalProps {
  isOpen: boolean
  onClose: () => void
  onMovieUpdated: () => void
  movie: Movie
}

export function EditMovieModal({
  isOpen,
  onClose,
  onMovieUpdated,
  movie
}: EditMovieModalProps) {
  const { theme } = useTheme()

  const {
    form,
    errors,
    isSubmitting,
    isUploading,
    uploadProgress,
    genres,
    loadingGenres,
    selectedPosterFile,
    selectedBannerFile,
    onSubmit,
    handlePosterFileSelect,
    handleBannerFileSelect,
    handlePosterFileRemove,
    handleBannerFileRemove,
    handleGenreToggle
  } = useEditMovieForm({
    movie,
    onSuccess: onMovieUpdated,
    onClose
  })

  const {
    register,
    formState: { errors: formErrors },
    watch
  } = form

  const watchedGenreIds = watch('genreIds')

  const statusOptions = [
    { value: 'RELEASED', label: 'Lançado' },
    { value: 'IN_PRODUCTION', label: 'Em Produção' },
    { value: 'PLANNED', label: 'Planejado' },
    { value: 'CANCELLED', label: 'Cancelado' }
  ]

  const languageOptions = [
    { value: 'PT', label: 'Português' },
    { value: 'EN', label: 'Inglês' },
    { value: 'ES', label: 'Espanhol' }
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Filme"
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
              currentFileUrl={movie.posterFile?.url}
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
              currentFileUrl={movie.bannerFile?.url}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Título *"
            error={formErrors.title?.message}
            placeholder="Ex: Oppenheimer"
            {...register('title')}
          />
          <Input
            label="Título Original *"
            error={formErrors.originalTitle?.message}
            placeholder="Ex: Oppenheimer"
            {...register('originalTitle')}
          />
        </div>

        <Input
          label="Descrição *"
          error={formErrors.description?.message}
          placeholder="Sinopse ou descrição detalhada do filme"
          multiline
          rows={3}
          {...register('description')}
        />

        <Input
          label="Tagline *"
          error={formErrors.tagline?.message}
          placeholder="Ex: O mundo mudou para sempre"
          {...register('tagline')}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Data de Lançamento *"
            type="date"
            error={formErrors.releaseDate?.message}
            {...register('releaseDate')}
          />
          <Input
            label="Duração (minutos) *"
            type="number"
            error={formErrors.duration?.message}
            placeholder="Ex: 180"
            min="1"
            {...register('duration')}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Status *"
            options={statusOptions}
            error={formErrors.status?.message}
            {...register('status')}
          />
          <Select
            label="Idioma *"
            options={languageOptions}
            error={formErrors.language?.message}
            {...register('language')}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Orçamento (USD) *"
            type="number"
            error={formErrors.budget?.message}
            placeholder="Ex: 100000000"
            min="0"
            {...register('budget')}
          />
          <Input
            label="Receita (USD) *"
            type="number"
            error={formErrors.revenue?.message}
            placeholder="Ex: 950000000"
            min="0"
            {...register('revenue')}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            label="Popularidade (0-10) *"
            type="number"
            error={formErrors.popularity?.message}
            placeholder="Ex: 8.5"
            min="0"
            max="10"
            step="0.1"
            {...register('popularity')}
          />
          <Input
            label="Votos *"
            type="number"
            error={formErrors.votes?.message}
            placeholder="Ex: 50000"
            min="0"
            {...register('votes')}
          />
          <Input
            label="Avaliação (%) *"
            type="number"
            error={formErrors.ratingPercentage?.message}
            placeholder="Ex: 92"
            min="0"
            max="100"
            {...register('ratingPercentage')}
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

          {loadingGenres ? (
            <div className="mt-2 text-center">
              <span
                className={theme === 'dark' ? 'text-mauve-11' : 'text-mauve-9'}
              >
                Carregando gêneros...
              </span>
            </div>
          ) : (
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
                    checked={watchedGenreIds.includes(genre.id)}
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
          )}

          {formErrors.genreIds && (
            <span className="mt-1 text-sm text-red-500">
              {formErrors.genreIds.message}
            </span>
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
            onClick={onSubmit}
            className="flex-1"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
