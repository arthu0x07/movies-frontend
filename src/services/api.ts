import axios from 'axios'
import {
  Movie,
  CreateMovieData,
  Genre,
  MoviesResponse,
  MovieResponse,
  UploadResponse,
} from '@/@types/movie'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  paramsSerializer: {
    indexes: null,
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@cubos-movies:token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

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

export { api }

export async function getMovies(params?: {
  title?: string
  status?: string
  language?: string
  genreIds?: string[]
  releaseDateStart?: string
  releaseDateEnd?: string
  durationMin?: number
  durationMax?: number
  page?: number
  perPage?: number
}): Promise<MoviesResponse> {
  const { data } = await api.get<MoviesResponse>('/movies', { params })
  return data
}

export async function getMovieBySlug(slug: string): Promise<MovieResponse> {
  const { data } = await api.get<MovieResponse>(`/movies/${slug}`)
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

export async function getUniqueGenres(): Promise<Genre[]> {
  const { data } = await api.get<{ data: Genre[]; meta: any }>('/movies/genres')
  return data.data
}

export async function uploadFile(file: File): Promise<{ fileId: string }> {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await api.post<UploadResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data.data
}
