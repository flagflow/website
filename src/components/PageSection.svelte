<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	const DEFAULT_BORDER_COLOR = 'text-gray-300';

	interface Properties {
		bgColor?: string;
		border?: boolean;
		borderColor?: string;
		children: Snippet;
	}

	const { bgColor = 'bg-white', border, borderColor, children }: Properties = $props();
</script>

{#snippet borderLine()}
	{#if border || borderColor}
		<hr class={borderColor || DEFAULT_BORDER_COLOR} />
	{/if}
{/snippet}

{@render borderLine()}
<div class={clsx('py-4', bgColor)}>
	<div class="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-16">
		{@render children()}
	</div>
</div>
{@render borderLine()}
