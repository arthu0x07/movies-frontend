interface SynopsisCardProps {
  title: string
  content: string
  className?: string
}

export function SynopsisCard({
  title,
  content,
  className = ''
}: SynopsisCardProps) {
  return (
    <div className={`rounded bg-[#23222599] p-4 ${className}`}>
      <h3 className="font-montserratBold text-left text-xl uppercase text-[#b5b2bc]">
        {title}
      </h3>
      <p className="font-montserratRegular mt-3 text-left text-xl leading-relaxed text-[#ffffff]">
        {content}
      </p>
    </div>
  )
}
