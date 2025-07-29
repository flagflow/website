<script lang="ts">
	import {
		Sidebar,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem
	} from 'flowbite-svelte';

	import { page } from '$app/state';

	import type { LayoutProps as LayoutProperties } from './$types';

	let { data, children }: LayoutProperties = $props();

	const baseUrl = '/docs';
	let activeUrl = $derived(page.url.pathname);
</script>

<div class="relative flex">
	<Sidebar
		class="z-50 h-full"
		activeClass="p-2"
		activeUrl={page.url.pathname}
		backdrop={false}
		classes={{ active: 'p-2 text-white bg-primary-600 hover:bg-primary-800', nonactive: 'p-2' }}
		isSingle={false}
		nonActiveClass="p-2"
		params={{ x: 0, duration: 0 }}
		position="static"
	>
		<SidebarGroup>
			{#each Object.entries(data.pages) as [url, page]}
			{#if 'nodes' in page}
				<SidebarDropdownWrapper btnClass="p-2" isOpen={true} label={url}>
					{#each Object.entries(page.nodes) as [subUrl, subPage]}
					<SidebarItem
						active={activeUrl === baseUrl + (subUrl ? `/${subUrl}` : '')}
						href={baseUrl + '/' + subUrl}
						label={subPage.title}
					/>
					{/each}
				</SidebarDropdownWrapper>
			{:else}
				<SidebarItem
					active={activeUrl === baseUrl + (url ? `/${url}` : '')}
					href={baseUrl + '/' + url}
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
