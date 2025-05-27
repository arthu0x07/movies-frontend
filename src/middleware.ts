import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('@cubos-movies:token')?.value
  const { pathname } = request.nextUrl

  const protectedRoutes = ['/movies']
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  )

  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/movies', request.url))
  }

  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/movies', request.url))
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const response = NextResponse.next()
  response.headers.set(
    'x-auth-state',
    token ? 'authenticated' : 'unauthenticated',
  )

  return response
}

export const config = {
  matcher: [
    /*
     * This will match with all paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
