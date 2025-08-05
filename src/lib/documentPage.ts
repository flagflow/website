/* eslint-disable @typescript-eslint/no-explicit-any */

import { documentPageRegistryFlat } from '../docs/_registry';
import type { DocumentPage, DocumentPageFlatDescriptor } from './documentPageTypes';

export const getDocument = async (slug: string): Promise<DocumentPage | undefined> => {
	const registryEntry = (documentPageRegistryFlat as Record<string, DocumentPageFlatDescriptor>)[
		slug
	];
	if (!registryEntry) return;

	let filename = registryEntry.filename;
	if (!filename) return;
	if (filename.endsWith('.svelte')) filename = filename.slice(0, -7);

	const fullPath = `../docs/${filename}.svelte`;

	const modules = import.meta.glob('../docs/**/*.svelte');
	if (!modules[fullPath]) return;

	const resolver = modules[fullPath];
	if (!resolver) return;

	const componentModule = await resolver();
	if (!componentModule || !(componentModule as any).default) return;

	return {
		slug,
		meta: {
			...registryEntry
		},
		component: (componentModule as any).default
	};
};
