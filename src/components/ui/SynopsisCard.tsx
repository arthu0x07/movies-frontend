import { useTheme } from '@/contexts/ThemeContext'

interface SynopsisCardProps {
  title: string
  content: string
  className?: string
}

export function SynopsisCard({
  title,
  content,
  className = '',
}: SynopsisCardProps) {
  const { theme } = useTheme()

  return (
    <div
      className={`min-w-0 rounded p-4 max-md:p-3 ${
        theme === 'dark'
          ? 'bg-[#23222599]'
          : 'border border-mauve-4 bg-white/90 shadow-sm'
      } ${className}`}
    >
      <h3
        className={`font-montserratBold break-words text-left text-xl uppercase max-md:text-lg ${
          theme === 'dark' ? 'text-mauve-dark-11' : 'text-mauve-9'
        }`}
      >
        {title}
      </h3>
      <p
        className={`font-montserratRegular overflow-wrap-anywhere mt-3 break-words text-left text-xl leading-relaxed max-md:text-lg max-md:leading-normal ${
          theme === 'dark' ? 'text-[#ffffff]' : 'text-mauve-dark-1'
        }`}
      >
        {content}
      </p>
    </div>
  )
}
