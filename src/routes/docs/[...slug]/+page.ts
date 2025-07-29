import { error } from '@sveltejs/kit';

import { getDocument } from '$lib/documentPage';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const documentPage = await getDocument(params.slug);

	if (!documentPage) throw error(404, 'Page not found');

	return { doc: documentPage };
};
