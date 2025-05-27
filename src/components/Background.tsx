/* eslint-disable @next/next/no-img-element */
import { useTheme } from '@/contexts/ThemeContext'

export function Background() {
  const { theme } = useTheme()

  if (theme === 'dark') {
    return (
      <div className="absolute inset-x-0 top-[-100px]">
        <div className="relative">
          <div className="h-[564px] w-full">
            <img
              src="/background.svg"
              alt="Background"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-mauve-dark-1/50 via-mauve-dark-1/80 to-mauve-dark-1" />
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-x-0 top-[-100px]">
      <div className="relative">
        <div className="h-[564px] w-full bg-gradient-to-br from-mauve-1 via-mauve-2 to-mauve-3">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mauve-1/30 to-white/90" />
        </div>
      </div>
    </div>
  )
}
