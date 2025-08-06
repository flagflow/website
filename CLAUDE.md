# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for Flagflow, a feature flag management platform. It's built as a static site using SvelteKit with documentation content stored as Svelte components.

## Development Commands

### Build and Development

- `npm run dev` - Start development server
- `npm run build` - Build for production (outputs to `docs/`)
- `npm run preview` - Preview production build locally
- `npm run preview:static` - Preview static build using serve

### Code Quality

- `npm run ts:check` - TypeScript type checking with SvelteKit sync
- `npm run format:check` - Check code formatting with Prettier
- `npm run format:fix` - Fix code formatting
- `npm run lint:check` - Lint code with ESLint
- `npm run lint:fix` - Fix linting issues

### Testing

- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with UI

### Utilities

- `npm run sitemap:generate` - Generate sitemap.xml from routes and docs
- `npm run all` - Run complete pipeline: format, lint, type check, sitemap, build
- `npm run npm:reinstall` - Clean reinstall of node_modules

## Architecture

### Static Site Generation

- Uses `@sveltejs/adapter-static` to generate static files in `docs/` directory
- All routes are prerendered (`export const prerender = true`)
- Single bundle strategy for optimal loading

### Documentation System

The site uses a unique documentation architecture:

1. **Document Registry** (`src/docs/_registry.ts`): Central registry defining all documentation pages with metadata (title, description, grouping)

2. **Dynamic Route Generation** (`src/routes/docs/[...slug]/+page.ts`): Uses the registry to automatically generate SvelteKit routes for all documentation pages

3. **Component-Based Content** (`src/docs/`): Each documentation page is a Svelte component, allowing for interactive elements and consistent styling

4. **Document Loader** (`src/lib/documentPage.ts`): Matches slugs to registry entries and dynamically imports corresponding Svelte components

### Key Patterns

- Path aliases configured in `svelte.config.js`: `$components`, `$lib`, `$routes`, `$types`
- Circular dependency detection enabled (throws errors)
- Image optimization with `vite-imagetools`
- Uses Flowbite for UI components and Tailwind for styling

### Build Output

- Production builds go to `docs/` directory (configured for GitHub Pages hosting)
- Minified and tree-shaken output
- Sourcemaps disabled for production

## Adding Documentation Pages

1. Add entry to the registry in `src/docs/_registry.ts`
2. Create corresponding `.svelte` file in `src/docs/` matching the registry structure
3. The route will be automatically generated and included in sitemap

## Configuration Files

- `svelte.config.js` - SvelteKit configuration with static adapter
- `vite.config.ts` - Vite configuration with image tools and circular dependency checking
- `tailwind.config.ts` - Tailwind CSS configuration
- `vitest.config.ts` - Vitest testing configuration

## Code format hints

- Do not use brackets {} if not needed, at one line command in blocks
