<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properties {
		children: Snippet;
		class?: string;
	}

	const { children, class: aClass = '' }: Properties = $props();
</script>

<div class={`rounded-lg border border-gray-300 p-4 ${aClass}`}>
	{@render children()}
</div>
