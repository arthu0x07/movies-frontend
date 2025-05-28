'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { getMovieBySlug, deleteMovie } from '@/services/api'
import { Movie } from '@/@types/movie'
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
import { EditMovieModal } from '@/components/EditMovieModal'

export default function MovieDetailsPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { theme } = useTheme()
  const { userId } = useAuth()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Check if current user is the owner of the movie
  const isOwner = movie && userId && movie.userId === userId

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
    setIsEditModalOpen(true)
  }

  const handleMovieUpdated = () => {
    fetchMovie()
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
    const millions = value / 1000000
    return `${millions.toFixed(2)}M`
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatDate = (dateString: string) => {
    let date: Date
    if (dateString.includes('T')) {
      date = new Date(dateString)
    } else {
      date = new Date(dateString + 'T00:00:00.000Z')
    }
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  }

  const getStatusLabel = (status: string) => {
    const statusMap = {
      RELEASED: 'Lançado',
      IN_PRODUCTION: 'Em Produção',
      PLANNED: 'Planejado',
      CANCELLED: 'Cancelado'
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  const getLanguageLabel = (language: string) => {
    const languageMap = {
      PT: 'Português',
      EN: 'Inglês',
      ES: 'Espanhol'
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

        <main className="mx-auto mt-8 flex w-full max-w-[1440px] flex-1 flex-col pb-2">
          <div className="relative overflow-hidden px-8 pt-8 max-sm:px-4">
            <div className="absolute right-0 top-0 z-10 h-[603px] w-full max-w-none">
              <img
                src={
                  movie.bannerFile?.url
                    ? getImageUrl(movie.bannerFile.url)
                    : '/placeholder-backdrop.svg'
                }
                alt={`${movie.title} backdrop`}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    theme === 'dark'
                      ? 'linear-gradient(270deg, rgba(18, 17, 19, 0.9) 0%, rgba(18, 17, 19, 0.7) 30%, rgba(18, 17, 19, 0.5) 70%, rgba(18, 17, 19, 0.7) 100%)'
                      : 'linear-gradient(270deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 30%, rgba(255, 255, 255, 0.7) 70%, rgba(255, 255, 255, 0.85) 100%)'
                }}
              />
            </div>

            <div className="relative z-30 mb-4 flex min-h-[59px] w-full items-center justify-between gap-4 max-sm:justify-center">
              <div
                className={`font-montserratSemibold flex flex-col max-sm:hidden ${
                  theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
                }`}
              >
                <h1 className="text-[32px] leading-tight max-lg:text-[28px] max-md:text-[24px]">
                  {movie.title}
                </h1>
                <p className="font-montserratMedium text-base opacity-90 max-md:text-sm">
                  Título original: {movie.originalTitle}
                </p>
              </div>

              <div className="flex items-center gap-4 max-md:gap-2 max-sm:w-full max-sm:justify-center">
                <Button
                  onClick={handleDeleteClick}
                  variant="secondary"
                  className="font-montserratMedium max-sm:flex-1"
                  disabled={!isOwner}
                >
                  Deletar
                </Button>
                <Button
                  onClick={handleEdit}
                  variant="primary"
                  className="max-sm:flex-1"
                  disabled={!isOwner}
                >
                  Editar
                </Button>
              </div>
            </div>

            <div className="relative z-30 mt-4">
              <div className="grid grid-cols-[374px_1fr] gap-6 max-xl:hidden">
                <div>
                  <div className="h-[542px] w-[374px] overflow-hidden rounded shadow-lg">
                    {movie.posterFile?.url ? (
                      <img
                        src={getImageUrl(movie.posterFile.url)}
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

                <div className="grid grid-cols-[minmax(300px,1fr)_minmax(280px,320px)] gap-6">
                  <div className="grid min-w-0 grid-rows-[auto_1fr_auto] gap-4">
                    <div
                      className={`flex items-center font-montserratMedium ${
                        theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
                      }`}
                    >
                      <p className="break-words text-left text-base italic">{`"${movie.tagline}"`}</p>
                    </div>

                    <div className="min-w-0">
                      <SynopsisCard
                        title="Sinopse"
                        content={movie.description}
                      />
                    </div>

                    <GenresSection
                      title="Gêneros"
                      genres={movie.genres || []}
                      className="max-w-fit rounded p-4"
                    />
                  </div>

                  <div className="grid min-w-0 auto-rows-max gap-4">
                    <div className="grid grid-cols-[1fr_1fr_98px] items-center gap-4">
                      <InfoCard
                        title="Popularidade"
                        value={movie.popularity.toLocaleString()}
                      />
                      <InfoCard
                        title="Votos"
                        value={movie.votes.toLocaleString()}
                      />
                      <div className="flex items-center justify-center">
                        <CircularRating
                          percentage={movie.ratingPercentage}
                          size={98}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InfoCard
                        title="Lançamento"
                        value={formatDate(movie.releaseDate)}
                      />
                      <InfoCard
                        title="Duração"
                        value={formatDuration(movie.duration)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InfoCard
                        title="Situação"
                        value={getStatusLabel(movie.status)}
                      />
                      <InfoCard
                        title="Idioma"
                        value={getLanguageLabel(movie.language)}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <InfoCard
                        title="Orçamento"
                        value={formatCurrency(movie.budget)}
                        className="px-3"
                      />
                      <InfoCard
                        title="Receita"
                        value={formatCurrency(movie.revenue)}
                        className="px-3"
                      />
                      <InfoCard
                        title="Lucro"
                        value={formatCurrency(movie.revenue - movie.budget)}
                        className="px-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden grid-cols-1 gap-6 max-xl:grid max-sm:hidden">
                <div className="grid grid-cols-[300px_1fr] gap-6 max-lg:grid-cols-[250px_1fr] max-lg:gap-4">
                  <div>
                    <div className="h-[435px] w-[300px] overflow-hidden rounded shadow-lg max-lg:h-[362px] max-lg:w-[250px]">
                      {movie.posterFile?.url ? (
                        <img
                          src={getImageUrl(movie.posterFile.url)}
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

                  <div className="grid auto-rows-max gap-4 max-lg:gap-3">
                    <div className="grid grid-cols-[1fr_1fr_98px] items-center gap-4 max-lg:grid-cols-[1fr_1fr_80px] max-lg:gap-2">
                      <InfoCard
                        title="Popularidade"
                        value={movie.popularity.toLocaleString()}
                      />
                      <InfoCard
                        title="Votos"
                        value={movie.votes.toLocaleString()}
                      />
                      <div className="flex items-center justify-center">
                        <div className="max-lg:scale-75">
                          <CircularRating
                            percentage={movie.ratingPercentage}
                            size={98}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-lg:gap-2">
                      <InfoCard
                        title="Lançamento"
                        value={formatDate(movie.releaseDate)}
                      />
                      <InfoCard
                        title="Duração"
                        value={formatDuration(movie.duration)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-lg:gap-2">
                      <InfoCard
                        title="Situação"
                        value={getStatusLabel(movie.status)}
                      />
                      <InfoCard
                        title="Idioma"
                        value={getLanguageLabel(movie.language)}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-lg:gap-2">
                      <InfoCard
                        title="Orçamento"
                        value={formatCurrency(movie.budget)}
                        className="px-3 max-lg:px-4"
                      />
                      <InfoCard
                        title="Receita"
                        value={formatCurrency(movie.revenue)}
                        className="px-3 max-lg:px-4"
                      />
                      <InfoCard
                        title="Lucro"
                        value={formatCurrency(movie.revenue - movie.budget)}
                        className="px-3 max-lg:px-4"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div
                    className={`flex items-center justify-center font-montserratMedium ${
                      theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
                    }`}
                  >
                    <p className="break-words text-center text-base italic max-lg:text-sm">{`"${movie.tagline}"`}</p>
                  </div>

                  <SynopsisCard title="Sinopse" content={movie.description} />

                  <GenresSection
                    title="Gêneros"
                    genres={movie.genres || []}
                    className="rounded p-4 max-lg:p-3"
                  />
                </div>
              </div>

              <div className="hidden grid-cols-1 gap-4 max-sm:grid">
                <div className="flex justify-center">
                  <div className="aspect-[382/582] h-auto w-full max-w-[382px] overflow-hidden rounded shadow-lg">
                    {movie.posterFile?.url ? (
                      <img
                        src={getImageUrl(movie.posterFile.url)}
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

                <div
                  className={`font-montserratSemibold flex flex-col text-center ${
                    theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
                  }`}
                >
                  <h1 className="text-2xl leading-tight">{movie.title}</h1>
                  <p className="font-montserratMedium text-base opacity-90">
                    Título original: {movie.originalTitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                  <InfoCard
                    title="Popularidade"
                    value={movie.popularity.toLocaleString()}
                  />
                  <InfoCard
                    title="Votos"
                    value={movie.votes.toLocaleString()}
                  />
                  <div className="col-span-2 flex justify-center">
                    <CircularRating
                      percentage={movie.ratingPercentage}
                      size={98}
                    />
                  </div>
                </div>

                <div
                  className={`flex items-center justify-center p-4 font-montserratMedium ${
                    theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
                  }`}
                >
                  <p className="break-words text-left text-base italic">{`"${movie.tagline}"`}</p>
                </div>

                <SynopsisCard title="Sinopse" content={movie.description} />

                <GenresSection
                  title="Gêneros"
                  genres={movie.genres || []}
                  className="rounded p-4"
                />

                <div className="grid grid-cols-2 gap-4">
                  <InfoCard
                    title="Lançamento"
                    value={formatDate(movie.releaseDate)}
                  />
                  <InfoCard
                    title="Duração"
                    value={formatDuration(movie.duration)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InfoCard
                    title="Situação"
                    value={getStatusLabel(movie.status)}
                  />
                  <InfoCard
                    title="Idioma"
                    value={getLanguageLabel(movie.language)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <InfoCard
                    title="Orçamento"
                    value={formatCurrency(movie.budget)}
                    className="px-4"
                  />
                  <InfoCard
                    title="Receita"
                    value={formatCurrency(movie.revenue)}
                    className="px-4"
                  />
                  <InfoCard
                    title="Lucro"
                    value={formatCurrency(movie.revenue - movie.budget)}
                    className="px-4"
                  />
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

      {movie && (
        <EditMovieModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onMovieUpdated={handleMovieUpdated}
          movie={movie}
        />
      )}
    </div>
  )
}
