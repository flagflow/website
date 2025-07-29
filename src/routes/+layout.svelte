<script lang="ts">
	/* eslint-disable no-undef */
	import '../app.css';

	import { Badge, Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';

	import Icon from '$components/Icon.svelte';

	import type { LayoutProps as LayoutProperties } from './$types';

	let { children }: LayoutProperties = $props();
</script>

<Navbar class="bg-gray-50" fluid>
	<NavBrand href="/">
		<img class="me-3 h-6 sm:h-9" alt="Flowbite Logo" src="/favicon.png" />
		<span
			class="flex flex-col self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
		>
			Flagflow
			<span class="text-sm font-normal text-orange-700 dark:text-gray-400">
				Feature flags for everyone!
			</span>
		</span></NavBrand
	>
	<NavUl>
		<NavLi class="mx-2" href="/">Home</NavLi>
		<NavLi class="mx-2" href="/">Features</NavLi>
		<NavLi class="mx-2" href="/docs">Docs</NavLi>
		<Button class="mx-2" color="orange" size="sm">Demo</Button>
	</NavUl>
	<div>
		<a href="https://github.com/flagflow/flagflow" target="_blank">
			<Icon id="github" class="inline-flex" align="left" size={30} />
		</a>
		<Badge class="ml-2" color="orange" size="large">
			v{__APP_VERSION__}
		</Badge>
		<NavHamburger />
	</div>
</Navbar>

{@render children()}
