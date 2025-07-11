import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';
import { NextRequest } from 'next/server';
 
// Enable middleware in development, disable only for static export builds
const isExport = process.env.BUILD_EXPORT === 'true';
const shouldEnableMiddleware = !isExport;

function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Let root route pass through to our page redirect
  if (pathname === '/') {
    return;
  }
  
  // Skip middleware for static assets completely
  if (pathname.startsWith('/_next/') || 
      pathname.startsWith('/static/') ||
      pathname.includes('.')) {
    return;
  }
  
  // Use next-intl middleware for locale routes
  const intlMiddleware = createMiddleware(routing);
  return intlMiddleware(request);
}

export default shouldEnableMiddleware ? middleware : undefined;

export const config = {
  matcher: [
    // Match all paths but exclude static assets in the matcher itself
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};
