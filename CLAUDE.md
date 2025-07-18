# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal note-taking application for "CSS for JavaScript Developers" course by Josh Comeau. It serves as a digital workspace for organizing and accessing course materials with full internationalization support (English/Spanish).

## Development Commands

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Static export build (for GitHub Pages, Netlify, etc.)
BUILD_EXPORT=true pnpm build

# Lint check
pnpm lint

# Start production server (for testing)
pnpm start

# Serve static files locally (for testing static export)
pnpm run serve
```

## Architecture

### Internationalization Setup
- **Localized routing**: All pages under `/[locale]/` (en, es)
- **next-intl middleware**: Handles locale detection and routing in `middleware.ts`
- **Translation files**: `messages/en.json` and `messages/es.json`
- **Static generation**: Next.js 15 automatic optimization with conditional static export

### Component Structure
- **shadcn/ui pattern**: Complete UI component library in `components/ui/`
- **Layout components**: Sidebar navigation with breadcrumbs and language switcher
- **CSS Variables**: HSL-based color system supporting dark/light themes in `app/globals.css`
- **Path aliases**: Use `@/` for imports from root directory

### Key Files
- `src/i18n/routing.ts`: Route definitions and locale configuration
- `src/i18n/navigation.ts`: Localized navigation helpers  
- `app/[locale]/layout.tsx`: Locale-specific layout with sidebar
- `middleware.ts`: next-intl middleware for locale routing
- `next.config.mjs`: Conditional static export configuration with `BUILD_EXPORT` env var

## Tech Stack
- **Next.js 15.2.4** with App Router and React 19
- **TypeScript** with strict mode
- **Tailwind CSS** with shadcn/ui components
- **next-intl** for internationalization
- **Radix UI** for accessible components
- **next-cloudinary** for image hosting and optimization

## Development Patterns

### Adding New Course Pages
1. Create page in `app/[locale]/[page-name]/page.tsx`
2. Add route to `src/i18n/routing.ts` pathnames object
3. Update sidebar navigation in `components/app-sidebar.tsx`
4. Add translations to both `messages/en.json` and `messages/es.json`

### i18n Development Workflow
- Use `useTranslations` hook in client components
- Use `getTranslations` in server components  
- Extract complex data with `t.raw()` for arrays/objects
- Translation files follow hierarchical structure matching course modules
- Content organized by module ’ section ’ lesson pattern

### Component Development
- All UI components extend shadcn/ui patterns with Radix UI primitives
- Support both light and dark themes via CSS variables in `app/globals.css`
- Use `@/` path alias for imports from root directory
- Follow TypeScript strict mode with proper prop interfaces

## Important Notes
- Uses conditional static export via `BUILD_EXPORT` environment variable
- Images are unoptimized for static hosting compatibility
- Sidebar navigation structure matches course module organization
- All new components should follow shadcn/ui patterns and support theming
- Uses `pnpm` as package manager (lockfile present)
- Cloudinary integration for course screenshots and media assets

## Deployment
- **Static export**: Set `BUILD_EXPORT=true` for static hosting
- **SSR**: Run without `BUILD_EXPORT` for dynamic hosting (Vercel, etc.)
- **Build output**: Statically optimized pages with middleware support