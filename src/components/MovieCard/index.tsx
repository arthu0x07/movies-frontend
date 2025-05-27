import { getImageUrl } from '@/utils/imageUrl'
import { Genre } from '@/services/api'

interface MovieCardProps {
  title: string
  posterUrl: string
  genres?: Genre[]
  onClick?: () => void
}

export function MovieCard({
  title,
  posterUrl,
  genres,
  onClick
}: MovieCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex h-[281px] w-[183px] flex-shrink-0 flex-col overflow-hidden rounded-md transition-transform duration-200 hover:scale-105 sm:h-[355px] sm:w-[235px]"
    >
      <img
        src={getImageUrl(posterUrl)}
        alt={title}
        className="h-full w-full object-cover shadow-sm"
      />

      <div className="absolute bottom-0 flex w-full flex-col justify-end px-4 pb-4 transition-all duration-200 group-hover:pb-6">
        <h3 className="text-left text-base font-semibold uppercase text-white transition-transform duration-200 group-hover:-translate-y-2">
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
