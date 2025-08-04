import { error } from '@sveltejs/kit';

import { getDocument } from '$lib/documentPage';

import { documentPageRegistry } from '../../../docs/_registry';
import type { EntryGenerator, PageLoad } from './$types';

// This file is used to generate sveltekit routes!
export const entries: EntryGenerator = () =>
	Object.keys(documentPageRegistry).map((slug) => ({ slug }));

export const load: PageLoad = async ({ params }) => {
	const documentPage = await getDocument(params.slug);

	if (!documentPage) throw error(404, 'Page not found');

	return { doc: documentPage };
};
