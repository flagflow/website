<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	const DEFAULT_BORDER_COLOR = 'text-gray-300';

	interface Properties {
		bgColor?: string | undefined;
		border?: boolean | undefined;
		borderColor?: string | undefined;
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
	<div class="mx-auto max-w-[1280px] px-16">
		{@render children()}
	</div>
</div>
{@render borderLine()}
