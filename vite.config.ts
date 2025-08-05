import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import circularDependency from 'vite-plugin-circular-dependency';

import { version } from './package.json';

export default defineConfig({
	plugins: [
		imagetools(),
		sveltekit(),
		circularDependency({
			circleImportThrowErr: true,
			exclude: [/node_modules/, /\.git/, /Modal/]
		})
	],
	build: {
		sourcemap: false,
		minify: true,
		cssMinify: true,
		emptyOutDir: true,
		chunkSizeWarningLimit: 4096,
		rollupOptions: {
			treeshake: true,
			output: {
				compact: true
			},
			onLog(level, log, handler) {
				if (log.code !== 'CIRCULAR_DEPENDENCY') handler(level === 'warn' ? 'error' : level, log);
			},
			onwarn(warning, handler) {
				if (warning.code !== 'CIRCULAR_DEPENDENCY') handler(`(!) ${warning.message}`);
			}
		}
	},
	define: {
		__APP_VERSION__: JSON.stringify(version)
	},
	clearScreen: true
});
