// scripts/generate-sitemap.ts
import { writeFileSync } from 'node:fs';

import { globby } from 'globby';

const SITE_URL = 'https://flagflow.net'; // Replace with your actual site URL

const getRouteMetadata = (route: string) => {
	const now = new Date().toISOString();

	// Home page gets highest priority
	if (route === '' || route === '/') return { priority: '1.0', changefreq: 'weekly', lastmod: now };

	// Main feature pages
	if (['/features', '/integration', '/ci-cd', '/oss-open-source'].includes(route))
		return { priority: '0.9', changefreq: 'monthly', lastmod: now };

	// Documentation pages
	if (route.startsWith('/docs')) {
		// Getting started and main docs get higher priority
		if (route === '/docs' || route === '/docs/')
			return { priority: '0.9', changefreq: 'weekly', lastmod: now };
		// Individual doc pages
		return { priority: '0.7', changefreq: 'monthly', lastmod: now };
	}

	// Default for other pages
	return { priority: '0.5', changefreq: 'monthly', lastmod: now };
};

const generateSitemap = async () => {
	const pages = await globby([
		'./src/routes/**/+page.svelte',
		String.raw`!./src/routes/**/\[*\]/**` // Exclude dynamic routes
	]);

	const routes = [
		...pages
			.map((page) =>
				page.replace('./src/routes', '').replace('/+page.svelte', '').replace('/index', '')
			)
			.filter((route) => !route.includes('[')),
		...Object.keys((await import('../src/docs/_registry')).documentPageRegistryFlat).map((page) =>
			page ? `/docs/${page}` : '/docs'
		)
	].sort();

	const urlEntries = routes.map((route) => {
		const { priority, changefreq, lastmod } = getRouteMetadata(route);
		return `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
	});

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries.join('\n')}
</urlset>`;

	writeFileSync('./static/sitemap.xml', sitemap);
};

generateSitemap();
