interface InfoCardProps {
  title: string
  value: string
  className?: string
}

export function InfoCard({ title, value, className = '' }: InfoCardProps) {
  return (
    <div
      className={`min-w-0 rounded bg-[#232225bf] p-4 max-md:p-3 ${className}`}
    >
      <div className="break-words text-left font-montserratExtrabold text-md uppercase text-[#b5b2bc] max-md:text-sm">
        {title}
      </div>
      <div className="font-montserratSemibold mt-2 break-words text-left text-lg text-[#ffffff] max-md:text-base">
        {value}
      </div>
    </div>
  )
}
