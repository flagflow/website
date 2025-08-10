import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		preserveComments: false,
		preserveWhitespace: false
	},
	kit: {
		adapter: adapter({
			precompress: false,
			polyfill: false,
			strict: true,
			pages: 'docs'
		}),
		alias: {
			$components: './src/components',
			$lib: './src/lib',
			$routes: './src/routes',
			$types: './src/types'
		},
		output: {
			bundleStrategy: 'inline'
		}
	}
};

export default config;
