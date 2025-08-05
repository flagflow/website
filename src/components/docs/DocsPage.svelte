<script lang="ts" module>
	type DocsPageRegionInstance = {
		id: string;
		title: string;
	};
	type RegisterRegion = (region: DocsPageRegionInstance) => void;
	export type DocsPageContext = {
		registerRegion: RegisterRegion;
	};
</script>

<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	import Sticky from '$components/Sticky.svelte';

	interface Properties {
		children: Snippet;
	}

	const { children }: Properties = $props();

	const HEADER_HEIGHT = 90;

	// Context DocsPage
	const regions = $state<DocsPageRegionInstance[]>([]);
	const registerRegion: RegisterRegion = (region: DocsPageRegionInstance) => {
		if (region.id !== '' && region.title !== '') regions.push(region);
	};
	setContext('DocsPage', { registerRegion });
	const scrollToRegion = (id: string) => {
		const element = document.querySelector<HTMLElement>(`[id="${id}"]`);
		if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
</script>

<div class="max-w-[calc(100%-10rem)] px-16 py-4">
	{@render children()}
</div>

<Sticky class="right-0 h-full w-48 overflow-y-auto p-4 text-sm text-gray-500" top={HEADER_HEIGHT}>
	{#if regions.length > 0}
		<div class="py-2 font-semibold uppercase">On this page</div>
		{#each regions as { title, id }}
			<button
				class="block w-full p-2 text-left hover:bg-gray-200"
				onclick={() => scrollToRegion(id)}>{title}</button
			>
		{/each}
	{/if}
</Sticky>
