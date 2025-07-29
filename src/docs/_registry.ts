import type { DocumentPageDescriptor } from '$lib/documentPageTypes';

export const documentPageRegistry = {
	'': {
		title: 'Getting Started',
		filenameOverride: 'get_started',
		description: 'Learn how to get started with our platform'
	},
	install: {
		category: 'Installation',
		title: 'How to install this application',
		description: 'Learn how to install our platform'
	},
	install2: {
		category: 'Installation',
		title: 'How to install',
		filenameOverride: 'install',
		description: 'Learn how to install our platform'
	},
	about: {
		title: 'About Us',
		filenameOverride: 'install',
		description: 'Learn more about our company'
	},
} as const;

export const documentPageRegistryHierarchical:
	Record<string, (DocumentPageDescriptor | { nodes: Record<string, DocumentPageDescriptor> })> = {
	'': documentPageRegistry[''],
	'Installation': {
		nodes: {
			install: documentPageRegistry.install,
			install2: documentPageRegistry.install2
		}
	},
	about: documentPageRegistry.about
};

