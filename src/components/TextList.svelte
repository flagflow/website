<script lang="ts">
	import { Li, List } from 'flowbite-svelte';

	import Icon, { type IconId } from './Icon.svelte';

	interface Properties {
		items: string[];
		icon?: IconId;
	}

	const { items, icon }: Properties = $props();
</script>

<List class="space-y-1 text-gray-500 dark:text-gray-400" tag="ul">
	{#each items as item}
		<Li icon={!!icon}>
			{#if icon}
				<Icon id={icon} align="left" />
			{/if}
			{item}
		</Li>
	{/each}
</List>
