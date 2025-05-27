export const getImageUrl = (fileUrl: string | null) => {
  if (!fileUrl) return ''

  const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL

  if (!r2PublicUrl) {
    console.warn(
      'NEXT_PUBLIC_R2_PUBLIC_URL is not defined in environment variables',
    )
    return ''
  }

  return `${r2PublicUrl}/${fileUrl}`
}
