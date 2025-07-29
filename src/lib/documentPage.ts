/* eslint-disable @typescript-eslint/no-explicit-any */

import { documentPageRegistry } from '../docs/_registry';
import type { DocumentPage } from './documentPageTypes';

// const loadDocuments = () => {
// 	const modules = import.meta.glob('../docs/**/*.svelte');
// 	return Object.entries(modules).map(([path, resolver]) => ({
// 		slug: path.replace('../docs/', '').replace('.svelte', ''),
// 		resolver
// 	}));
// };

// export const getDocuments = async (): Promise<DocumentPage[]> => {
// 	const documentFiles = loadDocuments();
// 	const documents = await Promise.all(
// 		documentFiles.map(async ({ slug, resolver }) => {
// 			const componentModule = await resolver();

// 			const registryOrder = documentPageOrder.indexOf(slug);
// 			const order = registryOrder === -1 ? 999 : registryOrder;

// 			return {
// 				slug,
// 				meta: documentPageRegistry[slug]
// 					? {
// 						...documentPageRegistry[slug],
// 						order
// 					}
// 					: { title: slug, order },
// 				component: (componentModule as any).default
// 			};
// 		})
// 	);
// 	return documents.sort((a, b) => (a.meta.order || 999) - (b.meta.order || 999));
// };

export const getDocument = async (slug: string): Promise<DocumentPage | undefined> => {
	const registryEntry = documentPageRegistry[slug];
	if (!registryEntry) return;

	let filename = registryEntry.filenameOverride || slug;
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
