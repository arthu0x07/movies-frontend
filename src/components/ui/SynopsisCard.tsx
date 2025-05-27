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
    <div
      className={`min-w-0 rounded bg-[#23222599] p-4 max-md:p-3 ${className}`}
    >
      <h3 className="font-montserratBold break-words text-left text-xl uppercase text-[#b5b2bc] max-md:text-lg">
        {title}
      </h3>
      <p className="font-montserratRegular overflow-wrap-anywhere mt-3 break-words text-left text-xl leading-relaxed text-[#ffffff] max-md:text-lg max-md:leading-normal">
        {content}
      </p>
    </div>
  )
}
