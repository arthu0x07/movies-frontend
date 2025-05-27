import { getImageUrl } from '@/utils/imageUrl'

interface MovieCardProps {
  title: string
  posterUrl: string
  onClick?: () => void
}

export function MovieCard({ title, posterUrl, onClick }: MovieCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex h-[281px] w-[183px] flex-shrink-0 flex-col overflow-hidden rounded-md"
    >
      <img
        src={getImageUrl(posterUrl)}
        alt={title}
        className="h-full w-full object-cover shadow-sm"
      />

      <div className="absolute bottom-0 flex h-[157px] w-full flex-col justify-end bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-[107px]">
        <h3 className="font-montserratSemibold text-left text-sm font-bold uppercase text-mauve-12">
          {title}
        </h3>
      </div>
    </button>
  )
}
