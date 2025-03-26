import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/contact',
  '/location',
  '/products(.*)',
  '/news(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    // Public routes are accessible without authentication
    return;
  }
  
  // For non-public routes, require authentication
  await auth.protect();
});

export const config = {
  matcher: [
    // Skip all internal paths (_next, static files, API docs, etc)
    "/((?!_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    // Match all API routes
    "/api/(.*)"
  ],
}; 