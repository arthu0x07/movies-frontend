'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getImageUrl } from '@/utils/imageUrl'
import { useTheme } from '@/contexts/ThemeContext'
import { Genre } from '@/@types/movie'

interface MovieCardProps {
  title: string
  posterUrl: string
  genres?: Genre[]
  slug?: string
  onClick?: () => void
}

export function MovieCard({
  title,
  posterUrl,
  genres,
  slug,
  onClick
}: MovieCardProps) {
  const [imageError, setImageError] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()

  const handleImageError = () => {
    setImageError(true)
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (slug) {
      router.push(`/movies/${slug}`)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="group relative flex aspect-[183/281] w-full min-w-[140px] max-w-[200px] flex-shrink-0 flex-col overflow-hidden rounded-sm transition-transform duration-200 hover:scale-105 min-[480px]:max-w-none sm:aspect-[235/355]"
    >
      {!imageError ? (
        <img
          src={getImageUrl(posterUrl)}
          alt={title}
          className="h-full w-full object-cover shadow-sm"
          onError={handleImageError}
        />
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center shadow-sm ${
            theme === 'dark'
              ? 'bg-mauve-dark-3 text-mauve-11'
              : 'bg-mauve-3 text-mauve-9'
          }`}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-2"
          >
            <path
              d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-center font-montserratMedium text-sm">
            Imagem não disponível
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="absolute bottom-0 flex w-full flex-col justify-end px-4 pb-4 transition-all duration-200 group-hover:pb-6">
        <h3 className="font-montserratSemibold text-left text-base uppercase text-white transition-transform duration-200 group-hover:-translate-y-2">
          {title}
        </h3>

        {genres && genres.length > 0 && (
          <div className="mt-1 opacity-0 transition-all duration-200 group-hover:opacity-100">
            <p className="text-left text-lg text-[#B4B4B4]">
              {genres.map((genre) => genre.name).join(', ')}
            </p>
          </div>
        )}
      </div>
    </button>
  )
}
