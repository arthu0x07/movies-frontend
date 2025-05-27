import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'
import { LoadFonts } from '@/utils/fonts'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <title>Cubos Movies</title>
      <LoadFonts />
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
