import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';
import { NextRequest } from 'next/server';
 
const isDev = process.env.ENABLE_MIDDLEWARE === 'true';

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

export default isDev ? middleware : undefined;

export const config = {
  matcher: [
    // Match all paths but exclude static assets in the matcher itself
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};
