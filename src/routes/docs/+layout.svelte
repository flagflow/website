<script lang="ts">
	import clsx from 'clsx';

	import { page } from '$app/state';

	import { documentPageRegistry } from '../../docs/_registry';
	import type { LayoutProps as LayoutProperties } from './$types';

	let { children }: LayoutProperties = $props();

	const baseUrl = '/docs';
	let activeUrl = $derived(page.url.pathname);

	let sidebarVisible = $state(false);
</script>

<div class="flex min-h-screen">
	<!-- Responsive Sidebar: Hidden on small screens, visible on hover and always visible on md+ -->
	<div class="relative">
		<!-- Hover trigger area for mobile - thin strip on left edge -->
		<div
			class="fixed top-0 left-0 z-30 h-full w-6 md:hidden"
			aria-label="Show sidebar"
			onmouseenter={() => (sidebarVisible = true)}
			onmouseleave={() => (sidebarVisible = false)}
			role="button"
			tabindex="-1"
		></div>

		<!-- Mobile overlay backdrop when sidebar is visible -->
		<div
			class="bg-opacity-50 fixed inset-0 z-40 bg-black transition-opacity duration-300 md:hidden {sidebarVisible
				? 'opacity-100'
				: 'pointer-events-none opacity-0'}"
		></div>

		<!-- Sidebar -->
		<nav
			class="fixed top-0 left-0 z-50 h-full w-64 min-w-48 transform overflow-y-auto border-r border-gray-200 bg-gray-50 p-4 shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none {sidebarVisible
				? 'translate-x-0'
				: '-translate-x-full'}"
			aria-label="Documentation navigation"
			onmouseenter={() => (sidebarVisible = true)}
			onmouseleave={() => (sidebarVisible = false)}
		>
			<h2 class="mb-6 px-2 text-lg font-bold text-gray-900">Documentation</h2>

			<div class="space-y-0">
				{#each Object.entries(documentPageRegistry) as [url, pageData]}
					{#if 'nodes' in pageData}
						<div class="mb-6 space-y-4">
							<div class="mb-3 px-2 text-sm font-semibold tracking-wide text-gray-500 uppercase">
								{pageData.groupName}
							</div>

							<div class="space-y-1">
								{#each Object.entries(pageData.nodes) as [subUrl, subPage]}
									{@const pageUrl = [baseUrl, url, subUrl].filter(Boolean).join('/')}
									<a
										class={clsx('hover:bg-primary-300 block rounded px-6 py-2 text-sm ', {
											'bg-primary-100 text-primary-700 border-primary-600 border-r-2':
												activeUrl === pageUrl,
											'text-gray-700': activeUrl !== pageUrl
										})}
										href={pageUrl}
									>
										{subPage.title}
									</a>
								{/each}
							</div>
						</div>
					{:else}
						{@const pageUrl = [baseUrl, url].filter(Boolean).join('/')}
						<div class="mb-4">
							<a
								class={clsx('hover:bg-primary-300 block rounded px-2 py-2 text-sm font-medium ', {
									'bg-primary-100 text-primary-700 border-primary-600 border-r-2':
										activeUrl === pageUrl,
									'text-gray-700': activeUrl !== pageUrl
								})}
								href={pageUrl}
							>
								{pageData.title}
							</a>
						</div>
					{/if}
				{/each}
			</div>
		</nav>
	</div>

	<!-- Main content area with responsive margin -->
	<div class="flex-1 p-2 md:ml-0">
		{@render children()}
	</div>
</div>
