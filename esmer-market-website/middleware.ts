import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getLocaleFromRequest, setLocaleCookie } from './lib/middleware-i18n';

// Middleware for admin route protection and i18n
export async function middleware(request: NextRequest) {
  // Handle i18n
  const locale = getLocaleFromRequest(request);
  const response = NextResponse.next();
  setLocaleCookie(response, locale);
  
  // Check if the request is for an admin route
  const { pathname } = request.nextUrl;
  
  // Check for Firebase auth token in cookies
  const idToken = request.cookies.get('firebase-id-token')?.value;
  
  // If it's an admin route and not the login page itself
  if (pathname.startsWith('/admin')) {
    console.log('Middleware: Checking auth for admin route:', pathname);
    
    // If no token, redirect to login
    if (!idToken) {
      console.log('Middleware: No auth token found, redirecting to login');
      const url = new URL('/login', request.url);
      // Add a redirect parameter to help with redirection after login
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    
    // Token exists, allow access to admin routes
    console.log('Middleware: Auth token found, allowing access to admin route');
  }
  
  // If it's the login page and user is already authenticated, redirect to admin
  if (pathname === '/login' && idToken) {
    console.log('Middleware: User already authenticated, redirecting from login to admin');
    // Get the redirect path from query params or default to /admin
    const redirectTo = request.nextUrl.searchParams.get('redirect') || '/admin';
    const url = new URL(redirectTo, request.url);
    return NextResponse.redirect(url);
  }
  
  return response;
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    // Apply to all routes except static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Apply admin protection to admin routes
    '/admin/:path*',
  ],
}; 