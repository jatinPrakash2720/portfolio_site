import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const host = request.headers.get('host')

  // Skip middleware for localhost development
  if (host?.includes('localhost')) {
    return NextResponse.next()
  }

  // Root domain for marketing page (e.g., jatinbuilds.com)
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000'

  // If it's the root domain, redirect to marketing page
  if (host === rootDomain) {
    return NextResponse.redirect(new URL('/', url.origin))
  }

  // For admin domains, rewrite to include domain in path
  // e.g., 'dashboard.jatinbuilds.com/' becomes '/dashboard.jatinbuilds.com'
  url.pathname = `/${host}${url.pathname}`

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
