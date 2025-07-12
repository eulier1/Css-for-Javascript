import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';
 
// Use next-intl middleware for all environments
// Next.js 15 handles static optimization automatically
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths but exclude static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};
