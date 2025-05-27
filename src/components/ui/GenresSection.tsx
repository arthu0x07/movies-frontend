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
  className = ''
}: GenresSectionProps) {
  if (!genres || genres.length === 0) return null

  return (
    <div className={className}>
      <h3 className="font-montserratBold mb-2 text-left text-lg text-[#b5b2bc]">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="font-montserratSemibold rounded bg-purple-alpha-3 p-2 text-md uppercase text-purple-dark-12"
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  )
}
