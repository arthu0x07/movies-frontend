'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { getMovieBySlug, deleteMovie, Movie } from '@/services/api'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Background } from '@/components/Background'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { CircularRating } from '@/components/ui/CircularRating'
import { InfoCard } from '@/components/ui/InfoCard'
import { SynopsisCard } from '@/components/ui/SynopsisCard'
import { GenresSection } from '@/components/ui/GenresSection'
import { getImageUrl } from '@/utils/imageUrl'

export default function MovieDetailsPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { theme } = useTheme()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (slug) {
      fetchMovie()
    }
  }, [slug])

  const fetchMovie = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getMovieBySlug(slug as string)
      setMovie(response.data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar filme')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    console.log('Editar filme:', movie?.id)
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
  }

  const handleDeleteConfirm = async () => {
    if (!movie) return

    try {
      setIsDeleting(true)
      await deleteMovie(movie.id)
      router.push('/movies')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao excluir filme')
      setShowDeleteConfirm(false)
    } finally {
      setIsDeleting(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusLabel = (status: string) => {
    const statusMap = {
      RELEASED: 'Lançado',
      IN_PRODUCTION: 'Em Produção',
      PLANNED: 'Planejado',
      CANCELLED: 'Cancelado',
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  const getLanguageLabel = (language: string) => {
    const languageMap = {
      PT: 'Português',
      EN: 'Inglês',
      ES: 'Espanhol',
    }
    return languageMap[language as keyof typeof languageMap] || language
  }

  if (isLoading) {
    return (
      <div
        className={`flex min-h-screen flex-col ${theme === 'dark' ? 'bg-mauve-dark-1' : 'bg-white'}`}
      >
        <Background />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex flex-1 items-center justify-center">
            <span
              className={`text-lg ${theme === 'dark' ? 'text-mauve-dark-9' : 'text-mauve-9'}`}
            >
              Carregando...
            </span>
          </main>
          <Footer />
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div
        className={`flex min-h-screen flex-col ${theme === 'dark' ? 'bg-mauve-dark-1' : 'bg-white'}`}
      >
        <Background />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <span className="text-lg text-red-500">
                {error || 'Filme não encontrado'}
              </span>
              <div className="mt-4">
                <Button onClick={() => router.push('/movies')}>
                  Voltar para filmes
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex min-h-screen flex-col ${theme === 'dark' ? 'bg-mauve-dark-1' : 'bg-white'}`}
    >
      <div className="fixed inset-0 z-0">
        <Background />
      </div>

      <div className="relative z-20 flex min-h-screen flex-col">
        <Header />

        <main className="mx-auto mt-8 flex w-full max-w-[1366px] flex-1 flex-col">
          <div className="relative flex flex-col overflow-hidden px-8 pt-8">
            <div className="absolute right-0 top-0 z-10 h-[603px] w-[1448px] max-w-none">
              <img
                src={
                  movie.file?.url
                    ? getImageUrl(movie.file.url)
                    : '/placeholder-backdrop.svg'
                }
                alt={`${movie.title} backdrop`}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(270deg, rgba(18, 17, 19, 0.9) 0%, rgba(18, 17, 19, 0.7) 30%, rgba(18, 17, 19, 0.5) 70%, rgba(18, 17, 19, 0.7) 100%)',
                }}
              />
            </div>

            <div className="relative z-30 mb-4 flex min-h-[59px] w-full items-center justify-between gap-4">
              <div className="font-montserratSemibold flex flex-col text-white">
                <h1 className="text-[32px] leading-tight">{movie.title}</h1>
                <p className="font-montserratMedium text-base opacity-90">
                  Título original: {movie.originalTitle}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={handleDeleteClick}
                  variant="secondary"
                  className="font-montserratMedium"
                >
                  Deletar
                </Button>
                <Button onClick={handleEdit} variant="primary">
                  Editar
                </Button>
              </div>
            </div>

            <div className="relative z-30 mt-4 flex gap-6">
              <div className="flex-shrink-0">
                <div className="h-[542px] w-[374px] overflow-hidden rounded shadow-lg">
                  {movie.file?.url ? (
                    <img
                      src={getImageUrl(movie.file.url)}
                      alt={movie.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-mauve-dark-3 text-mauve-11">
                      <span>Imagem não disponível</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-1 flex-col">
                <div className="flex items-center justify-between gap-6">
                  <div className="font-montserratMedium flex max-w-[416px] flex-1 flex-col items-center justify-center text-mauve-dark-12">
                    <p className="text-base italic">{`"${movie.tagline}"`}</p>
                  </div>

                  <div className="font-montserratExtrabold flex items-center gap-4 text-center uppercase">
                    <InfoCard
                      title="Popularidade"
                      value={movie.popularity.toLocaleString()}
                    />

                    <InfoCard
                      title="Votos"
                      value={movie.votes.toLocaleString()}
                    />

                    <div className="flex w-[98px] items-center justify-center">
                      <CircularRating
                        percentage={movie.ratingPercentage}
                        size={98}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between gap-6">
                  <div className="flex flex-1 flex-col">
                    <div className="flex flex-col gap-4">
                      <SynopsisCard
                        title="Sinopse"
                        content={movie.description}
                      />

                      <GenresSection
                        title="Gêneros"
                        genres={movie.genres || []}
                        className="rounded bg-[#23222599] p-4"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex gap-4">
                      <InfoCard
                        title="Lançamento"
                        value={formatDate(movie.releaseDate)}
                        className="flex-1"
                      />
                      <InfoCard
                        title="Duração"
                        value={formatDuration(movie.duration)}
                        className="flex-1"
                      />
                    </div>

                    <div className="mt-4 flex gap-4">
                      <InfoCard
                        title="Situação"
                        value={getStatusLabel(movie.status)}
                        className="flex-1"
                      />
                      <InfoCard
                        title="Idioma"
                        value={getLanguageLabel(movie.language)}
                        className="flex-1"
                      />
                    </div>

                    <div className="mt-4 flex gap-4">
                      <InfoCard
                        title="Orçamento"
                        value={formatCurrency(movie.budget)}
                        className="flex-1 px-3"
                      />
                      <InfoCard
                        title="Receita"
                        value={formatCurrency(movie.revenue)}
                        className="flex-1 px-3"
                      />
                      <InfoCard
                        title="Lucro"
                        value={formatCurrency(movie.revenue - movie.budget)}
                        className="flex-1 px-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Filme"
        message={`Tem certeza que deseja excluir o filme "${movie?.title}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        isLoading={isDeleting}
      />
    </div>
  )
}
