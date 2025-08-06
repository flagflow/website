<script lang="ts">
	import { Tooltip } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	import { glossaries, type GlossaryKey } from '../docs/GLOSSARY';

	interface Properties {
		id: GlossaryKey;
		children: Snippet;
	}

	const { id, children }: Properties = $props();
</script>

<span class="cursor-help border-b border-dashed border-gray-400 italic hover:border-gray-900">
	{@render children()}
</span>
<Tooltip placement="top">{glossaries[id]}</Tooltip>
