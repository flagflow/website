/* eslint-disable @typescript-eslint/no-explicit-any */

export type DocumentPageMeta = {
	title: string;
	description: string;
	keywords?: string;
};

export type DocumentPageDescriptor = DocumentPageMeta & {
	filenameOverride?: string;
};

export type DocumentPage = {
	slug: string;
	meta: DocumentPageMeta;
	component: any;
};
