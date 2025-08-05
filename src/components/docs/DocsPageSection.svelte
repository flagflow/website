<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import { getContext, type Snippet } from 'svelte';

	import type { DocsPageContext } from './DocsPage.svelte';

	interface Properties {
		title: string;
		id: string;
		children: Snippet;
	}

	const { title, id, children }: Properties = $props();

	getContext<DocsPageContext>('DocsPage')?.registerRegion({ title, id });
</script>

<div class="mx-auto mb-2 max-w-[1280px]">
	<div {id} class="pt-4"></div>
	<Heading class="my-4 text-lg font-bold" tag="h2">{title}</Heading>

	{@render children()}
</div>
