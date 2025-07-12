# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal note-taking application for the "CSS for JavaScript Developers" course by Josh Comeau. It serves as a digital workspace for organizing and accessing course materials with full internationalization support (English/Spanish).

## Development Commands

```bash
# Development server
pnpm dev

# Production build (optimized static generation)
pnpm build

# Lint check
pnpm lint

# Start production server (for testing)
pnpm start
```

## Architecture

### Internationalization Setup
- **Localized routing**: All pages under `/[locale]/` (en, es)
- **next-intl middleware**: Handles locale detection and routing in all environments
- **Translation files**: `messages/en.json` and `messages/es.json`
- **Static generation**: Next.js 15 automatic optimization generates static pages for all locales

### Component Structure
- **shadcn/ui pattern**: Complete UI component library in `components/ui/`
- **Layout components**: Sidebar navigation with breadcrumbs and version switcher
- **CSS Variables**: HSL-based color system supporting dark/light themes
- **Path aliases**: Use `@/` for imports from root directory

### Key Files
- `src/i18n/routing.ts`: Route definitions and locale configuration
- `src/i18n/navigation.ts`: Localized navigation helpers  
- `app/[locale]/layout.tsx`: Locale-specific layout with sidebar
- `middleware.ts`: next-intl middleware for locale routing
- `next.config.mjs`: Optimized for static generation with i18n support

## Tech Stack
- **Next.js 15.2.4** with App Router and React 19
- **TypeScript** with strict mode
- **Tailwind CSS** with shadcn/ui components
- **next-intl** for internationalization
- **Radix UI** for accessible components

## Important Notes
- Uses Next.js 15 automatic static optimization for production builds
- Images are unoptimized for static hosting compatibility
- Sidebar navigation structure matches course module organization
- All new components should follow shadcn/ui patterns and support theming

## Deployment
- **Recommended**: Modern static hosting (Vercel, Netlify) with Node.js runtime support
- **Build output**: Statically optimized pages with middleware support
- **Hosting**: Requires platforms that support Next.js middleware for optimal locale routing