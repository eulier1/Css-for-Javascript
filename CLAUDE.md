# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal note-taking application for the "CSS for JavaScript Developers" course by Josh Comeau. It serves as a digital workspace for organizing and accessing course materials with full internationalization support (English/Spanish).

## Development Commands

```bash
# Development server
pnpm dev

# Production build (static export for deployment)
pnpm build

# Development build (with SSR)
pnpm build:dev

# Lint check
pnpm lint

# Serve static export locally
pnpm serve
```

## Architecture

### Internationalization Setup
- **Localized routing**: All pages under `/[locale]/` (en, es)
- **Conditional middleware**: Only runs in production to enable static export in development
- **Translation files**: `messages/en.json` and `messages/es.json`
- **Build modes**: Development uses SSR, production uses static export via `BUILD_EXPORT=true`

### Component Structure
- **shadcn/ui pattern**: Complete UI component library in `components/ui/`
- **Layout components**: Sidebar navigation with breadcrumbs and version switcher
- **CSS Variables**: HSL-based color system supporting dark/light themes
- **Path aliases**: Use `@/` for imports from root directory

### Key Files
- `src/i18n/routing.ts`: Route definitions and locale configuration
- `src/i18n/navigation.ts`: Localized navigation helpers  
- `app/[locale]/layout.tsx`: Locale-specific layout with sidebar
- `middleware.ts`: Handles locale routing (production only)
- `next.config.js`: Dual build configuration for dev/prod

## Tech Stack
- **Next.js 15.2.4** with App Router and React 19
- **TypeScript** with strict mode
- **Tailwind CSS** with shadcn/ui components
- **next-intl** for internationalization
- **Radix UI** for accessible components

## Important Notes
- Build tolerates TypeScript/ESLint errors for rapid development
- Static export mode disables image optimization
- Sidebar navigation structure matches course module organization
- All new components should follow shadcn/ui patterns and support theming