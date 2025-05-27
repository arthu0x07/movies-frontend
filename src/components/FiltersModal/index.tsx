'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/contexts/ThemeContext'
import { getUniqueGenres, Genre } from '@/services/api'

export interface MovieFilters {
  durationMin?: number
  durationMax?: number
  releaseDateStart?: string
  releaseDateEnd?: string
  status?: 'RELEASED' | 'IN_PRODUCTION' | 'PLANNED' | 'CANCELLED' | ''
  language?: 'PT' | 'EN' | 'ES' | ''
  genreIds?: string[]
}

interface FiltersModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: MovieFilters) => void
  currentFilters: MovieFilters
}

export function FiltersModal({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
}: FiltersModalProps) {
  const { theme } = useTheme()
  const [filters, setFilters] = useState<MovieFilters>(currentFilters)
  const [genres, setGenres] = useState<Genre[]>([])
  const [loadingGenres, setLoadingGenres] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters)
      loadGenres()
    }
  }, [isOpen, currentFilters])

  const loadGenres = async () => {
    setLoadingGenres(true)
    try {
      const uniqueGenres = await getUniqueGenres()
      setGenres(uniqueGenres)
    } catch (error) {
      console.error('Erro ao carregar gêneros:', error)
    } finally {
      setLoadingGenres(false)
    }
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleClear = () => {
    const clearedFilters: MovieFilters = {
      durationMin: undefined,
      durationMax: undefined,
      releaseDateStart: '',
      releaseDateEnd: '',
      status: '',
      language: '',
      genreIds: [],
    }
    setFilters(clearedFilters)
    onApplyFilters(clearedFilters)
    onClose()
  }

  const handleGenreToggle = (genreId: string) => {
    const currentGenres = filters.genreIds || []
    const newGenres = currentGenres.includes(genreId)
      ? currentGenres.filter((id) => id !== genreId)
      : [...currentGenres, genreId]

    setFilters({
      ...filters,
      genreIds: newGenres,
    })
  }

  const statusOptions = [
    { value: '', label: 'Todos os status' },
    { value: 'RELEASED', label: 'Lançado' },
    { value: 'IN_PRODUCTION', label: 'Em Produção' },
    { value: 'PLANNED', label: 'Planejado' },
    { value: 'CANCELLED', label: 'Cancelado' },
  ]

  const languageOptions = [
    { value: '', label: 'Todos os idiomas' },
    { value: 'PT', label: 'Português' },
    { value: 'EN', label: 'Inglês' },
    { value: 'ES', label: 'Espanhol' },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filtros">
      <div className="space-y-6">
        {/* Filtros de Duração */}
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Duração Mínima"
              type="number"
              placeholder="Mín (min)"
              value={filters.durationMin || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  durationMin: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
            <Input
              label="Duração Máxima"
              type="number"
              placeholder="Máx (min)"
              value={filters.durationMax || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  durationMax: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </div>
        </div>

        {/* Filtros de Data de Lançamento */}
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Data Inicial"
              type="date"
              value={filters.releaseDateStart || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  releaseDateStart: e.target.value,
                })
              }
            />
            <Input
              label="Data Final"
              type="date"
              value={filters.releaseDateEnd || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  releaseDateEnd: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Filtros de Status e Idioma */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Status do Filme"
            value={filters.status || ''}
            options={statusOptions}
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value as
                  | 'RELEASED'
                  | 'IN_PRODUCTION'
                  | 'PLANNED'
                  | 'CANCELLED'
                  | '',
              })
            }
          />

          <Select
            label="Idioma"
            value={filters.language || ''}
            options={languageOptions}
            onChange={(e) =>
              setFilters({
                ...filters,
                language: e.target.value as 'PT' | 'EN' | 'ES' | '',
              })
            }
          />
        </div>

        {/* Filtro de Gêneros */}
        <div>
          <label
            className={`font-robotoBold text-lg font-bold ${
              theme === 'dark' ? 'text-white' : 'text-mauve-dark-1'
            }`}
          >
            Gêneros
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
                    checked={filters.genreIds?.includes(genre.id) || false}
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
        </div>

        {/* Botões */}
        <div className="flex gap-2 pt-4">
          <Button variant="secondary" onClick={handleClear} className="flex-1">
            Limpar
          </Button>
          <Button onClick={handleApply} className="flex-1">
            Aplicar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
