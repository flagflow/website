<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properties {
		children: Snippet;
		class?: string;
	}

	const { children, class: aClass = '' }: Properties = $props();
</script>

<div class={`rounded-lg border p-4 ${aClass}`}>
	{@render children()}
</div>
