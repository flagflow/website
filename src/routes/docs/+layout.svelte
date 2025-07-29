<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Sidebar,
		SidebarGroup,
		SidebarItem
	} from 'flowbite-svelte';

	import { page } from '$app/state';

	import type { LayoutProps as LayoutProperties } from './$types';

	let { data, children }: LayoutProperties = $props();

	const baseUrl = '/docs';
	let activeUrl = $derived(page.url.pathname);
</script>

<Navbar class="bg-gray-50" fluid>
	<NavBrand href="/">
		<img class="me-3 h-6 sm:h-9" alt="Flowbite Logo" src="/favicon.png" />
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
			>Flagflow Docs</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/">Navbar</NavLi>
		<NavLi href="/">Accordion</NavLi>
	</NavUl>
</Navbar>

<div class="relative flex">
	<Sidebar
		class="z-50 h-full"
		activeUrl={page.url.pathname}
		backdrop={false}
		classes={{ active: 'p-2 text-white bg-primary-600 hover:bg-primary-800', nonactive: 'p-2' }}
		params={{ x: 0, duration: 0 }}
		position="static"
	>
		<SidebarGroup>
			{#each Object.entries(data.pages) as [url, page]}
				<SidebarItem
					active={activeUrl === baseUrl + (url ? `/${url}` : '')}
					href={baseUrl + '/' + url}
					label={page.title}
					spanClass="flex-1 ms-0 whitespace-nowrap"
				></SidebarItem>
			{/each}
		</SidebarGroup>
	</Sidebar>
	<div class="p-4">
		{@render children()}
	</div>
</div>
