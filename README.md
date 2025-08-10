# FlagFlow Documentation Website

[![Built with SvelteKit](https://img.shields.io/badge/Built%20with-SvelteKit-FF3E00?style=flat&logo=svelte)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

The official documentation website for **FlagFlow** - a powerful, self-hosted feature flag management platform.

## 🌟 Features

- **📚 Comprehensive Documentation**: Complete guides for installation, configuration, and usage
- **🔍 Interactive Glossary**: Hover tooltips for technical terms throughout the documentation
- **⚡ Static Site Generation**: Fast, SEO-friendly static documentation site
- **🎨 Modern Design**: Built with Tailwind CSS and Flowbite components
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **🔧 TypeScript**: Full type safety throughout the codebase

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Development

```bash
# Clone the repository
git clone https://github.com/flagflow/website.git
cd website

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Build static site
npm run build

# Preview production build
npm run preview

# Output will be in docs/ directory
```

## 📁 Project Structure

```
src/
├── components/           # Reusable Svelte components
│   ├── docs/            # Documentation-specific components
│   ├── CodeBlock.svelte # Syntax-highlighted code blocks
│   └── Glossary.svelte  # Interactive glossary tooltips
├── docs/                # Documentation content (Svelte components)
│   ├── installation/    # Installation guides
│   ├── user-management/ # Authentication & permissions
│   ├── typescript/      # TypeScript integration
│   ├── migration/       # Backup, migration, restore
│   ├── flags/          # Flag types and organization
│   ├── GLOSSARY.ts     # Glossary definitions
│   └── get_started.svelte # Main getting started guide
├── lib/                # Shared utilities and components
├── routes/             # SvelteKit routing
└── app.html           # HTML template
```

## 📖 Documentation Sections

### 🚀 Getting Started

- Quick setup with Docker
- Creating your first feature flag
- Integration examples
- Next steps guidance

### 🔧 Installation

- Docker deployment
- Kubernetes setup
- etcd configuration
- Environment variables

### 👥 User Management

- Authentication overview
- Built-in user management
- Keycloak integration
- Permissions system

### 💻 TypeScript Integration

- Schema generation
- Hash-based validation
- Zod runtime validation
- Type safety features

### 🔄 Migration & Operations

- Export and backup strategies
- Cross-environment migration
- Disaster recovery
- Production best practices

### 🏷️ Flag Management

- Flag types (BOOLEAN, INTEGER, STRING, ENUM, TAG, AB-TEST)
- Flag hierarchy and organization
- Public API access

## 🎨 Design System

The website uses a consistent design system built on:

- **Tailwind CSS**: Utility-first CSS framework
- **Flowbite**: Pre-built components and UI patterns
- **Custom Components**: Documentation-specific UI elements

### Color Scheme

- **Primary**: Blue (`text-blue-600`, `bg-blue-50`)
- **Success**: Green (`text-green-800`, `bg-green-50`)
- **Warning**: Yellow (`text-yellow-800`, `bg-yellow-50`)
- **Danger**: Red (`text-red-800`, `bg-red-50`)
- **Neutral**: Gray scale for text and borders

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run preview          # Preview production build locally
npm run preview:static   # Preview using serve

# Building
npm run build           # Build for production (outputs to docs/)
npm run all            # Full pipeline: format, lint, typecheck, sitemap, build

# Code Quality
npm run format:check   # Check code formatting
npm run format:fix     # Fix code formatting
npm run lint:check     # Lint code
npm run lint:fix       # Fix linting issues
npm run ts:check       # TypeScript type checking

# Testing
npm test              # Run tests
npm run test:ui       # Run tests with UI

# Utilities
npm run sitemap:generate  # Generate sitemap.xml
npm run npm:reinstall    # Clean reinstall dependencies
```

### Architecture

The site uses a unique **component-based documentation architecture**:

1. **Document Registry** (`src/docs/_registry.ts`): Central registry of all documentation pages
2. **Dynamic Routing** (`src/routes/docs/[...slug]/+page.ts`): Auto-generated routes from registry
3. **Component Pages** (`src/docs/*.svelte`): Each doc page is a Svelte component
4. **Static Generation**: All pages are pre-rendered for optimal performance

### Adding New Documentation

1. Create new `.svelte` file in appropriate `src/docs/` subdirectory
2. Add entry to `src/docs/_registry.ts`
3. Route is automatically generated and included in sitemap

Example registry entry:

```typescript
{
  path: '/docs/installation/docker',
  title: 'Docker Installation',
  description: 'Deploy FlagFlow using Docker and Docker Compose',
  group: 'Installation'
}
```

## 🔍 Interactive Glossary

The site features an interactive glossary system with **60+ technical terms**:

- **Hover tooltips** for glossary terms throughout documentation
- **Comprehensive definitions** covering all FlagFlow concepts
- **Type-safe implementation** with TypeScript

### Using Glossary Terms

```svelte
<script>
	import Glossary from '$components/Glossary.svelte';
</script>

<p>
	FlagFlow uses <Glossary id="etcd">etcd</Glossary> for storage and supports <Glossary
		id="Type Safety">type safety</Glossary
	> with TypeScript.
</p>
```

## 🏗️ Build Configuration

- **SvelteKit** with `@sveltejs/adapter-static`
- **Static site generation** for GitHub Pages deployment
- **Path aliases** configured: `$components`, `$lib`, `$routes`, `$types`
- **Image optimization** with `vite-imagetools`
- **Circular dependency detection** enabled

## 📦 Deployment

The site builds to static files in the `docs/` directory for easy deployment to:

- **GitHub Pages** (main deployment target)
- **Netlify**
- **Vercel**
- **Any static hosting service**

### GitHub Pages Setup

1. Enable GitHub Pages in repository settings
2. Set source to "Deploy from a branch"
3. Select `main` branch and `/docs` folder
4. Site will be available at `https://flagflow.github.io/website/`

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-docs`)
3. **Make** your changes following the existing patterns
4. **Test** your changes (`npm run all`)
5. **Commit** your changes (`git commit -m 'Add amazing documentation'`)
6. **Push** to the branch (`git push origin feature/amazing-docs`)
7. **Open** a Pull Request

### Documentation Guidelines

- Use clear, concise language
- Include code examples where appropriate
- Add glossary terms for technical concepts
- Follow existing component patterns
- Test on multiple screen sizes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **FlagFlow Main Repository**: [github.com/flagflow/flagflow](https://github.com/flagflow/flagflow)
- **Live Documentation**: [flagflow.github.io/website](https://flagflow.github.io/website)
- **Issues & Support**: [GitHub Issues](https://github.com/flagflow/website/issues)

---

**Built with ❤️ for the FlagFlow community**
