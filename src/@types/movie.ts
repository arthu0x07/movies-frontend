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
  userId: string
  genresIds: string[]
  posterFileId?: string
  posterFile?: {
    id: string
    url: string
  }
  bannerFileId?: string
  bannerFile?: {
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
  posterFileId?: string
  bannerFileId?: string
}

export interface UpdateMovieData {
  title?: string
  originalTitle?: string
  description?: string
  tagline?: string
  releaseDate?: string
  duration?: number
  status?: 'RELEASED' | 'IN_PRODUCTION' | 'PLANNED' | 'CANCELLED'
  language?: 'PT' | 'EN' | 'ES'
  budget?: number
  revenue?: number
  popularity?: number
  votes?: number
  ratingPercentage?: number
  genresIds?: string[]
  posterFileId?: string
  bannerFileId?: string
}

export interface MoviesResponse {
  data: Movie[]
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
    path: string
  }
}

export interface MovieResponse {
  data: Movie
  meta: {
    timestamp: string
    path: string
  }
}

export interface UploadResponse {
  data: {
    fileId: string
  }
  meta: {
    timestamp: string
    path: string
  }
}
