# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for Flagflow, a feature flag management platform. It's built as a static site using SvelteKit with documentation content stored as Svelte components.

## Development Commands

### Build and Development

- `npm run dev` - Start development server with hot reload
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
- Tests use `@testing-library/svelte` with `jsdom` environment
- Test setup file: `tests/setup.ts`

### Utilities

- `npm run sitemap:generate` - Generate sitemap.xml from routes and docs
- `npm run all` - Run complete pipeline: format, lint, type check, test, sitemap, build
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
- Circular dependency detection enabled (throws errors, excluding Modal components)
- Image optimization with `vite-imagetools`, do not use inline, mark image size in variable name (e.g., `image800`, `image400`)
- Uses Flowbite for UI components and Tailwind for styling
- All routes are prerendered with static generation (`export const prerender = true`)
- Version injection via `__APP_VERSION__` global from package.json
- Node.js 22+ required (engines field in package.json)
- Uses `node --run` for script execution in package.json
- Eager loading of documentation components via `import.meta.glob`
- Bundle strategy set to 'inline' for single file output
- Compiler optimizations: `preserveComments: false`, `preserveWhitespace: false`
- Custom color scheme: primary (blue) and secondary (yellow-green) palettes defined in Tailwind config
- FlagFlow application default port is 3000 (ensure consistency in all documentation examples)

### Build Output

- Production builds go to `docs/` directory (configured for GitHub Pages hosting)
- Minified and tree-shaken output
- Sourcemaps disabled for production

## SEO and HTML Head Management

The site uses a centralized `HtmlHeader` component (`src/components/HtmlHeader.svelte`) for managing:

- Page titles with automatic "• FlagFlow" suffix
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Twitter Card metadata
- Default fallbacks for description and keywords

Each page should include `<HtmlHeader title="..." description="..." keywords="..." />` with relevant SEO content.

## Adding Documentation Pages

1. Add entry to the registry in `src/docs/_registry.ts` with title, description, and keywords
2. Create corresponding `.svelte` file in `src/docs/` matching the registry structure
3. The route will be automatically generated and included in sitemap

### Registry Structure

- Root pages: Direct entries in `documentPageRegistry` object
- Grouped pages: Nested under `nodes` object with `groupName` property
- `documentPageRegistryFlat` automatically flattens structure for routing
- The `entries` function in `src/routes/docs/[...slug]/+page.ts` generates all routes from the flattened registry

## Configuration Files

- `svelte.config.js` - SvelteKit configuration with static adapter, path aliases, and inline bundle strategy
- `vite.config.ts` - Vite configuration with image tools, circular dependency checking, version injection (`__APP_VERSION__`)
- `tailwind.config.ts` - Tailwind CSS configuration with Flowbite plugin and custom color scheme
- `vitest.config.ts` - Vitest testing configuration with jsdom environment and path aliases
- `package.json` - Requires Node.js 22+, uses `node --run` for scripts

## Component Development Guidelines

### Icon Component

- Available icons are defined in `src/components/Icon.svelte` in the `IconIds` object
- Common icons: `shield`, `rocket`, `settings`, `operations`, `github`, `checkCircle`, `lightbulb`, `hash`, `deploy`
- Never use icon IDs that don't exist in the `IconIds` type - this will cause TypeScript errors
- Icons support `color`, `size`, and `align` properties

### Image Optimization

- Images are processed with `vite-imagetools`
- Import with size and format parameters: `image800.webp?w=800&format=webp&imagetools`
- Always specify image size in variable name for clarity: `image800`, `image400`
- Never use inline images - always import and optimize them

### Component Structure

- All routes use `export const prerender = true` for static generation
- Use `HtmlHeader` component for SEO: `<HtmlHeader title="..." description="..." keywords="..." />`
- Prefer `PageSection` wrapper component for consistent page layout
- Use Flowbite components: `Button`, `Heading`, `P`, `Img` for consistency

## Code format hints

- Do not use brackets {} if not needed, at one line command in blocks
- Do not use dynamic import()

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
