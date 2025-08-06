<script lang="ts">
	import { Heading, Secondary } from 'flowbite-svelte';
	import { type Snippet } from 'svelte';

	interface Properties {
		title: string;
		subTitle?: string;
		contentClass?: string;
		children: Snippet;
	}

	const { title, subTitle, contentClass = '', children }: Properties = $props();
</script>

<div class="mx-auto mb-2 ml-6 max-w-[1280px]">
	<Heading class="text-md my-4 pt-4 font-semibold" tag="h3">
		{title}
		{#if subTitle}
			<Secondary class="ms-2 leading-loose font-light">{subTitle}</Secondary>
		{/if}
	</Heading>

	<span class={contentClass}>
		{@render children()}
	</span>
</div>
