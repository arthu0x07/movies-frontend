'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { MovieCard } from '@/components/MovieCard'
import { Pagination } from '@/components/Pagination'
import { Input } from '@/components/ui/Input'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FiltersModal } from '@/components/FiltersModal'
import { AddMovieModal } from '@/components/AddMovieModal'
import { useMovies } from '@/hooks/useMovies'
import { useTheme } from '@/contexts/ThemeContext'
import Image from 'next/image'
import { Background } from '@/components/Background'

export default function MoviesPage() {
  const {
    movies,
    isLoading,
    error,
    page,
    totalPages,
    filters,
    handleSearch,
    handlePageChange,
    handleFiltersChange,
    refetch,
  } = useMovies()

  const { theme } = useTheme()
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false)

  const handleMovieAdded = () => {
    refetch()
  }

  return (
    <div
      className={`flex min-h-screen flex-col ${
        theme === 'dark' ? 'bg-mauve-dark-1' : 'bg-white'
      }`}
    >
      <Background />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <main className="mx-auto flex w-full max-w-[1366px] flex-1 flex-col px-4">
          <div className="flex items-center justify-end gap-2.5 py-6 max-md:flex-col max-md:gap-4">
            <div className="relative max-w-[488px] flex-1 max-md:w-full max-md:max-w-none">
              <Input
                placeholder="Pesquise por filmes"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Image
                  src={
                    theme === 'dark' ? '/search-dark.svg' : '/search-light.svg'
                  }
                  alt="Search"
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <div className="flex gap-2.5 max-md:w-full">
              <Button
                variant="secondary"
                className={`max-md:flex-[30%] ${
                  theme === 'dark' ? 'text-mauve-1' : 'text-mauve-dark-1'
                }`}
                onClick={() => setIsFiltersModalOpen(true)}
              >
                <span>Filtros</span>
              </Button>

              <Button
                className="max-md:flex-[70%]"
                onClick={() => setIsAddMovieModalOpen(true)}
              >
                <span>Adicionar Filme</span>
              </Button>
            </div>
          </div>

          <div
            className={`mb-4 flex min-h-[400px] flex-wrap items-center justify-center gap-6 rounded-md p-4 ${
              theme === 'dark' ? 'bg-mauve-dark-3' : 'bg-mauve-3'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <span
                  className={`text-lg ${
                    theme === 'dark' ? 'text-mauve-dark-9' : 'text-mauve-9'
                  }`}
                >
                  Carregando...
                </span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center">
                <span className="text-lg text-red-500">{error}</span>
              </div>
            ) : movies.length === 0 ? (
              <div className="flex items-center justify-center">
                <span
                  className={`text-lg ${
                    theme === 'dark' ? 'text-mauve-dark-9' : 'text-mauve-9'
                  }`}
                >
                  Nenhum filme encontrado
                </span>
              </div>
            ) : (
              movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  posterUrl={movie.file?.url}
                  genres={movie.genres}
                />
              ))
            )}
          </div>

          {!isLoading && !error && movies.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>

        <Footer />
      </div>

      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApplyFilters={handleFiltersChange}
        currentFilters={filters}
      />

      <AddMovieModal
        isOpen={isAddMovieModalOpen}
        onClose={() => setIsAddMovieModalOpen(false)}
        onMovieAdded={handleMovieAdded}
      />
    </div>
  )
}
