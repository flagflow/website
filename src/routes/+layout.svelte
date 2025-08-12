<script lang="ts">
	/* eslint-disable no-undef */
	import '../app.css';

	import {
		Badge,
		Button,
		Footer,
		FooterCopyright,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl
	} from 'flowbite-svelte';

	import Icon from '$components/Icon.svelte';

	import type { LayoutProps as LayoutProperties } from './$types';
	import brandLogo from './brandlogo.png?w=96&format=webp&inline&imagetools';

	let { children }: LayoutProperties = $props();
</script>

<Navbar class="bg-gray-50" fluid>
	<NavBrand href="/">
		<img class="me-3 h-6 sm:h-9" alt="Flowbite Logo" src={brandLogo} />
		<span
			class="flex flex-col self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
		>
			FlagFlow
			<span class="text-sm font-normal text-gray-700 dark:text-gray-400">
				Feature flags for everyone
			</span>
		</span></NavBrand
	>
	<NavUl>
		<NavLi class="mx-2" href="/">Home</NavLi>
		<NavLi class="mx-2" href="/integration">Integration</NavLi>
		<NavLi class="mx-2" href="/ci-cd">CI / CD</NavLi>
		<NavLi class="mx-2" href="/oss-open-source">Open Source</NavLi>
		<NavLi class="mx-2" href="/docs">Docs</NavLi>
	</NavUl>
	<div>
		<Button class="mx-2" color="orange" href="https://demo.flagflow.net" size="sm" target="_blank"
			>Demo</Button
		>
		<a href="https://github.com/flagflow/flagflow" target="_blank">
			<Icon id="github" class="mx-2 inline-flex" align="left" size={30} />
		</a>
		<Badge class="mx-2" color="orange" size="large">
			v{__APP_VERSION__}
		</Badge>
		<NavHamburger />
	</div>
</Navbar>

{@render children()}

<Footer>
	<FooterCopyright by="FlagFlow" href="/" year={2025} />
</Footer>
