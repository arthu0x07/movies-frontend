'use client'

interface CircularRatingProps {
  percentage: number
  size?: number
  strokeWidth?: number
}

export function CircularRating({
  percentage,
  size = 98,
  strokeWidth = 8
}: CircularRatingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getColor = (percent: number) => {
    if (percent >= 70) return '#22c55e'
    if (percent >= 40) return '#eab308'
    return '#ef4444'
  }

  const dinamicColor = getColor(percentage)

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="rotate-[120deg] transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="#12111380"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={dinamicColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
          transform={`rotate(180 ${size / 2} ${size / 2})`}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: dinamicColor }}>
          {percentage}%
        </span>
      </div>
    </div>
  )
}
