<script lang="ts">
	import { Sidebar, SidebarDropdownWrapper, SidebarGroup, SidebarItem } from 'flowbite-svelte';

	import { page } from '$app/state';

	import { documentPageRegistry } from '../../docs/_registry';
	import type { LayoutProps as LayoutProperties } from './$types';

	let { children }: LayoutProperties = $props();

	const baseUrl = '/docs';
	let activeUrl = $derived(page.url.pathname);
</script>

<div class="relative flex">
	<Sidebar
		class="z-50 h-full"
		activeUrl={page.url.pathname}
		backdrop={false}
		classes={{ active: 'p-2 text-white bg-primary-600 hover:bg-primary-800', nonactive: 'p-2' }}
		isSingle={false}
		params={{ x: 0, duration: 0 }}
		position="static"
	>
		<SidebarGroup>
			{#each Object.entries(documentPageRegistry) as [url, page]}
				{#if 'nodes' in page}
					<SidebarDropdownWrapper btnClass="p-2" isOpen={true} label={page.groupName}>
						{#each Object.entries(page.nodes) as [subUrl, subPage]}
							{@const pageUrl = [baseUrl, url, subUrl].filter(Boolean).join('/')}
							<SidebarItem
								class="trimmed-content"
								active={activeUrl === pageUrl}
								href={pageUrl}
								label={subPage.title}
							/>
						{/each}
					</SidebarDropdownWrapper>
				{:else}
					{@const pageUrl = [baseUrl, url].filter(Boolean).join('/')}
					<SidebarItem
						class="trimmed-content"
						active={activeUrl === pageUrl}
						href={pageUrl}
						label={page.title}
						spanClass="flex-1 ms-3 whitespace-nowrap"
					/>
				{/if}
			{/each}
		</SidebarGroup>
	</Sidebar>
	<div class="p-4">
		{@render children()}
	</div>
</div>
