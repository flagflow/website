import type { Component } from 'svelte';

import { documentPageRegistryFlat } from '../docs/_registry';
import type { DocumentPage } from './documentPageTypes';

type SvelteModule = { default: Component };

const modules = import.meta.glob('../docs/**/*.svelte', { eager: true });

export const getDocument = (slug: string): DocumentPage | undefined => {
	const registryEntry = documentPageRegistryFlat[slug];
	if (!registryEntry) return;

	const svelteModule = modules[`../docs/${registryEntry.filename}.svelte`] as SvelteModule;
	if (!svelteModule) return;

	return {
		slug,
		meta: {
			...registryEntry
		},
		component: svelteModule.default
	};
};
