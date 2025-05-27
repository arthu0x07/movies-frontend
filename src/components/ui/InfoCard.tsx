import { useTheme } from '@/contexts/ThemeContext'

interface InfoCardProps {
  title: string
  value: string
  className?: string
}

export function InfoCard({ title, value, className = '' }: InfoCardProps) {
  const { theme } = useTheme()

  return (
    <div
      className={`min-w-0 rounded p-4 max-md:p-3 ${
        theme === 'dark'
          ? 'bg-[#232225bf]'
          : 'border border-mauve-4 bg-white/90 shadow-sm'
      } ${className}`}
    >
      <div
        className={`font-montserratExtrabold break-words text-left text-md uppercase max-md:text-sm ${
          theme === 'dark' ? 'text-[#b5b2bc]' : 'text-mauve-9'
        }`}
      >
        {title}
      </div>
      <div
        className={`font-montserratSemibold mt-2 break-words text-left text-lg max-md:text-base ${
          theme === 'dark' ? 'text-[#ffffff]' : 'text-mauve-dark-1'
        }`}
      >
        {value}
      </div>
    </div>
  )
}
