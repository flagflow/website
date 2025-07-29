// scripts/generate-sitemap.ts
import { writeFileSync } from 'node:fs';

import { globby } from 'globby';

const SITE_URL = 'https://flagflow.net'; // Replace with your actual site URL

const generateSitemap = async () => {
	const pages = await globby([
		'./src/routes/**/+page.svelte',
		String.raw`!./src/routes/**/\[*\]/**` // Exclude dynamic routes
	]);

	const routes = pages
		.map((page) =>
			page.replace('./src/routes', '').replace('/+page.svelte', '').replace('/index', '')
		)
		.filter((route) => !route.includes('['));
	routes.push(
		...Object.keys((await import('../src/docs/_registry')).documentPageRegistry).map((page) =>
			page ? `/docs/${page}` : '/docs'
		)
	);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`).join('\n')}
</urlset>`;

	writeFileSync('./static/sitemap.xml', sitemap);
};

generateSitemap();
