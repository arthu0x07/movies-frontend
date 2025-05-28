import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { GenresProvider } from '@/contexts/GenresContext'
import './globals.css'
import { LoadFonts } from '@/utils/fonts'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <title>Cubos Movies</title>
      <LoadFonts />
      <body>
        <ThemeProvider>
          <AuthProvider>
            <GenresProvider>{children}</GenresProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
