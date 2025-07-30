<script lang="ts">
	import { Heading, Img } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	interface Properties {
		image: {
			src: string;
			alt?: string;
		};
		imagePosition: 'left' | 'right';
		title: string;
		children: Snippet;
	}

	const { image, title, imagePosition = 'left', children }: Properties = $props();
</script>

<div class="grid grid-cols-2 gap-4 p-4">
	{#if imagePosition === 'left'}
		<Img class="mx-auto max-w-lg" alt={image.alt} src={image.src} />
	{/if}
	<div>
		<Heading class="text-4xl font-extrabold " tag="h2">{title}</Heading>
		{@render children()}
	</div>
	{#if imagePosition === 'right'}
		<Img class="mx-auto max-w-lg" alt={image.alt} src={image.src} />
	{/if}
</div>
