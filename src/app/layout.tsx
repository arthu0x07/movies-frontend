import './globals.css'
import { LoadFonts } from '@/utils/fonts'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <title>Frontend</title>
      <LoadFonts />
      <body>{children}</body>
    </html>
  )
}
