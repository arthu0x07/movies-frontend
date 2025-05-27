import { useTheme } from '@/contexts/ThemeContext'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { theme } = useTheme()

  return (
    <div className="flex items-center justify-center gap-3 px-[11px] py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex h-11 w-16 items-center justify-start gap-3 overflow-hidden rounded px-5 py-3 ${
          theme === 'dark'
            ? 'bg-mauve-dark-alpha-3 text-mauve-12'
            : 'bg-mauve-3 text-mauve-dark-1'
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            className={
              theme === 'dark'
                ? 'stroke-mauve-dark-alpha-9'
                : 'stroke-mauve-dark-1'
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1
        const isCurrentPage = page === currentPage

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-11 items-center justify-center overflow-hidden rounded px-5 py-3 text-base font-bold ${
              isCurrentPage
                ? theme === 'dark'
                  ? 'bg-purple-9 text-white'
                  : 'bg-mauve-dark-1 text-white'
                : theme === 'dark'
                  ? 'bg-mauve-dark-alpha-3 text-mauve-dark-alpha-9'
                  : 'bg-mauve-3 text-mauve-dark-1'
            }`}
          >
            {page}
          </button>
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex h-11 w-16 items-center justify-end gap-3 overflow-hidden rounded px-5 py-3 disabled:opacity-50 ${
          theme === 'dark'
            ? 'bg-purple-9 text-white'
            : 'bg-mauve-dark-1 text-white'
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            className="stroke-white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
