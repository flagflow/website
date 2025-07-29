import type { DocumentPageDescriptor } from '$lib/documentPageTypes';

export const documentPageRegistry: Record<string, DocumentPageDescriptor> = {
	'': {
		title: 'Getting Started',
		filenameOverride: 'get_started',
		description: 'Learn how to get started with our platform'
	},
	install: {
		title: 'How to install this application',
		description: 'Learn how to install our platform'
	},
	install2: {
		title: 'How to install',
		filenameOverride: 'install',
		description: 'Learn how to install our platform'
	},
	about1: {
		title: 'About Us',
		filenameOverride: 'install',
		description: 'Learn more about our company'
	},
	about2: {
		title: 'About again',
		filenameOverride: 'install',
		description: 'Learn how to install our platform'
	}
};
