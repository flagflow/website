<script lang="ts">
	/* eslint-disable no-undef */
	import { Button } from 'flowbite-svelte';

	import HtmlTitle from '$components/HtmlTitle.svelte';
	import Icon from '$components/icon/Icon.svelte';
</script>

<HtmlTitle title="Login" />

<div class="flex h-svh bg-gray-200">
	<div class="m-auto">
		<h1 class="mb-4 text-center text-xl font-semibold text-gray-700 sm:text-2xl">
			<img class="inline-flex" alt="logo" src="/favicon.png" width="48" />
			FlagFlow admin
		</h1>
		<Button class="mt-6 w-full bg-[#3F86B0] hover:bg-[#326B8E]" href="/">
			<Icon id="keycloak" align="left" />
			Keycloak login
		</Button>
		<h6 class="mt-2 text-center text-xs text-gray-700">
			v{__APP_VERSION__}
		</h6>
	</div>
</div>
