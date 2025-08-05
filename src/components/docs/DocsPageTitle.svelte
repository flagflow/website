<script lang="ts">
	import { Heading, P, Secondary } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	interface Properties {
		title: string;
		subTitle?: string;
		children?: Snippet;
	}

	const { title, subTitle, children }: Properties = $props();
</script>

<div class="text-center">
	<Heading class="text-2xl font-bold" tag="h1">
		{title}
		{#if subTitle}
			<Secondary class="ms-2 text-lg leading-loose font-extralight">{subTitle}</Secondary>
		{/if}
	</Heading>
	{#if children}
		<P class="text-lg dark:text-gray-400" space="wide">{@render children()}</P>
	{/if}
</div>
