/* eslint-disable @typescript-eslint/no-explicit-any */

export interface DocumentPageDescriptor {
	title: string;
	filenameOverride?: string;
	description: string;
	keywords?: string;
}

export interface DocumentPage {
	slug: string;
	meta: Omit<DocumentPageDescriptor, 'filenameOverride'>;
	component: any;
}
