import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  paramsSerializer: {
    indexes: null, // this will remove array indexes (genreIds[] becomes genreIds)
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@cubos-movies:token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@cubos-movies:token')
      document.cookie =
        '@cubos-movies:token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export interface Genre {
  id: string
  name: string
}

export interface Movie {
  id: string
  title: string
  slug: string
  originalTitle: string
  description: string
  tagline: string
  releaseDate: string
  duration: number
  status: 'RELEASED' | 'IN_PRODUCTION' | 'PLANNED' | 'CANCELLED'
  language: 'PT' | 'EN' | 'ES'
  budget: number
  revenue: number
  popularity: number
  votes: number
  ratingPercentage: number
  genresIds: string[]
  fileId: string
  file: {
    id: string
    url: string
  }
  genres: Genre[]
}

export interface CreateMovieData {
  title: string
  originalTitle: string
  description: string
  tagline: string
  releaseDate: string
  duration: number
  status: 'RELEASED' | 'IN_PRODUCTION' | 'PLANNED' | 'CANCELLED'
  language: 'PT' | 'EN' | 'ES'
  budget: number
  revenue: number
  popularity: number
  votes: number
  ratingPercentage: number
  genresIds: string[]
  fileId?: string
}

interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
    path: string
  }
}

interface GetMoviesParams {
  title?: string
  status?: 'RELEASED' | 'IN_PRODUCTION' | 'PLANNED' | 'CANCELLED'
  language?: 'PT' | 'EN' | 'ES'
  genreIds?: string[]
  releaseDateStart?: string
  releaseDateEnd?: string
  page?: number
  perPage?: number
}

export async function getMovies(params?: GetMoviesParams) {
  const { data } = await api.get<PaginatedResponse<Movie>>('/movies', {
    params,
  })

  return data
}

export async function getMovieBySlug(slug: string) {
  const { data } = await api.get<{ data: Movie }>(`/movies/${slug}`)

  return data
}

export async function createMovie(movieData: CreateMovieData) {
  const { data } = await api.post<{ data: Movie }>('/movies', movieData)

  return data.data
}

export async function updateMovie(id: string, movie: Partial<Movie>) {
  const { data } = await api.patch<{ data: Movie }>(`/movies/${id}`, movie)

  return data.data
}

export async function deleteMovie(id: string) {
  await api.delete(`/movies/${id}`)
}

export async function uploadFile(file: File): Promise<{ fileId: string }> {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await api.post<{ data: { fileId: string } }>(
    '/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return data.data
}

// Função para buscar gêneros únicos dos filmes - Vou remover quando criar um endpoint para retornar os gêneros apenas.
export async function getUniqueGenres(): Promise<Genre[]> {
  try {
    const response = await getMovies({ perPage: 1000 })

    const genresMap = new Map<string, Genre>()

    response.data.forEach((movie) => {
      movie.genres?.forEach((genre) => {
        genresMap.set(genre.id, genre)
      })
    })

    return Array.from(genresMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    )
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error)
    return []
  }
}
