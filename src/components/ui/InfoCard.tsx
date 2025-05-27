interface InfoCardProps {
  title: string
  value: string
  className?: string
}

export function InfoCard({ title, value, className = '' }: InfoCardProps) {
  return (
    <div className={`rounded bg-[#232225bf] p-4 ${className}`}>
      <div className="font-montserratExtrabold text-left text-md uppercase text-[#b5b2bc]">
        {title}
      </div>
      <div className="font-montserratSemibold mt-2 text-left text-lg text-[#ffffff]">
        {value}
      </div>
    </div>
  )
}
