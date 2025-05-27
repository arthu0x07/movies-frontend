import { useTheme } from '@/contexts/ThemeContext'

interface Genre {
  id: string
  name: string
}

interface GenresSectionProps {
  title: string
  genres: Genre[]
  className?: string
}

export function GenresSection({
  title,
  genres,
  className = '',
}: GenresSectionProps) {
  const { theme } = useTheme()

  if (!genres || genres.length === 0) return null

  return (
    <div
      className={`${
        theme === 'dark'
          ? 'bg-[#23222599]'
          : 'border border-mauve-4 bg-white/90 shadow-sm'
      } ${className}`}
    >
      <h3
        className={`font-montserratBold mb-2 text-left text-lg ${
          theme === 'dark' ? 'text-[#b5b2bc]' : 'text-mauve-9'
        }`}
      >
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className={`font-montserratSemibold rounded p-2 text-md uppercase ${
              theme === 'dark'
                ? 'bg-purple-alpha-3 text-purple-dark-12'
                : 'bg-purple-3 text-purple-11'
            }`}
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  )
}
