import type { Component } from 'svelte';

export type DocumentPageMeta = {
	title: string;
	description: string;
	keywords?: string;
};

export type DocumentPageDescriptor = DocumentPageMeta & {
	filenameOverride?: string;
};
export type DocumentPageFlatDescriptor = DocumentPageMeta & {
	filename: string;
};

export type DocumentPage = {
	slug: string;
	meta: DocumentPageMeta;
	component: Component;
};

export type DocumentPageRegistry = Record<
	string,
	DocumentPageDescriptor | { groupName: string; nodes: Record<string, DocumentPageDescriptor> }
>;
