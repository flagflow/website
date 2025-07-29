import { documentPageRegistryHierarchical } from '../../docs/_registry';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	return { pages: documentPageRegistryHierarchical };
};
