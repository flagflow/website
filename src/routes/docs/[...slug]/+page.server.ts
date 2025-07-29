import { documentPageRegistry } from '../../../docs/_registry';
import type { EntryGenerator } from './$types';

export const prerender = true;
export const entries: EntryGenerator = () =>
	Object.keys(documentPageRegistry).map((slug) => ({ slug }));
