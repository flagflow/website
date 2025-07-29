<script lang="ts">
	import { Heading, P, Secondary } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	interface Properties {
		title: string;
		subTitle?: string | undefined;
		children?: Snippet | undefined;
	}

	const { title, subTitle, children }: Properties = $props();
</script>

<div class="text-centers">
	<Heading class="mb-4 text-2xl font-bold" tag="h1">
		{title}
		{#if subTitle}
			<Secondary class="ms-2 text-lg">{subTitle}</Secondary>
		{/if}
	</Heading>
	{#if children}
		<P class="mb-6 text-lg dark:text-gray-400">{@render children()}</P>
	{/if}
</div>
