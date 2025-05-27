import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('@cubos-movies:token')?.value
  const isLoginPage = request.nextUrl.pathname === '/login'
  const isRootPage = request.nextUrl.pathname === '/'

  if (!token && !isLoginPage && !isRootPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/movies', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/movies/:path*', '/login'],
} 