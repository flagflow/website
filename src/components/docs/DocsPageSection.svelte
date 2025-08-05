<script lang="ts">
	import { Heading, Img } from 'flowbite-svelte';
	import { getContext, type Snippet } from 'svelte';

	import Icon from '$components/Icon.svelte';

	import type { DocsPageContext } from './DocsPage.svelte';

	type Hotlink = {
		title: string;
		href: string;
	};

	interface Properties {
		id: string;
		title: string;
		shortTitle?: string;
		image?: {
			src: string;
			alt?: string;
		};
		hotlink?: Hotlink[] | Hotlink;
		children: Snippet;
	}

	const { id, title, shortTitle, image, hotlink = [], children }: Properties = $props();
	const hotlinks = Array.isArray(hotlink) ? hotlink : [hotlink];

	getContext<DocsPageContext>('DocsPage')?.registerRegion({ title: shortTitle || title, id });
</script>

<div class="mx-auto mb-2 max-w-[1280px]">
	<a {id} href="#{id}">
		<Heading class="my-4 pt-4 text-lg font-bold" tag="h2">{title}</Heading>
	</a>

	<div class="flex flex-row items-start gap-8">
		{#if image}
			<Img class="w-20" alt={image.alt} src={image.src} />
		{/if}
		{@render children()}
	</div>
	{#if hotlinks.length > 0}
		<div class="text-primary-700 flex justify-end gap-8 text-sm">
			{#each hotlinks as { title, href }}
				<a {href}>
					{title}
					<Icon id="arrowRight" class="inline" align="left" size={20} />
				</a>
			{/each}
		</div>
	{/if}
</div>
