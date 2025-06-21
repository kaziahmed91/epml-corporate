import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for admin authentication
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    
    // For now, just ensure we have a token configured
    // In production, you might want to validate the token or use session-based auth
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};