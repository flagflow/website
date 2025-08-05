<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properties {
		top: number;
		class?: string;
		children: Snippet;
	}

	const { top, class: aClass = '', children }: Properties = $props();
	let scrollYValue = $state(0);
</script>

<svelte:window
	on:scroll={() => {
		scrollYValue = window.scrollY;
	}}
/>
<div style={`top: ${scrollYValue < top ? top - scrollYValue : 0}px;`} class="fixed {aClass}">
	{@render children()}
</div>
