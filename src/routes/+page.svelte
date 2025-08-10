<script lang="ts">
	/* eslint-disable no-undef */
	import { Button, Heading, Img, Kbd, P } from 'flowbite-svelte';

	import HtmlHeader from '$components/HtmlHeader.svelte';
	import Icon from '$components/Icon.svelte';
	import PageSection from '$components/PageSection.svelte';
</script>

<HtmlHeader title="Welcome" />

<PageSection>
	<div class="grid grid-cols-2">
		<div>
			<Heading class="mb-4 text-5xl leading-tight font-extrabold" tag="h1"
				>The <span class="text-orange-700">FlagFlow</span> empowers you to control feature flags effortlessly</Heading
			>
			<P class="mb-6 pl-16 text-2xl"
				>Define, manage and control them in one UI to enable dynamic application behavior and A/B
				testing.</P
			>
			<div class="flex flex-row gap-8 pl-16">
				<Kbd class="text-md px-4 font-light"
					># docker run ghcr.io/flagflow/flagflow:{__APP_VERSION__}</Kbd
				>
				<Button href="/docs">
					Get started
					<Icon id="arrowRight" align="right" />
				</Button>
			</div>
		</div>
		<Img class="mx-auto my-4 w-1/2" alt="Flagflow logo" src="/favicon.png" />
	</div>
</PageSection>

<PageSection bgColor="bg-gray-100" border>
	<div class="grid grid-cols-2">
		<div>
			<Heading class="mb-4 text-4xl leading-tight font-extrabold" tag="h2"
				>Color your feature flags with <span class="text-orange-700">FlagFlow</span></Heading
			>
			<P class="mb-6 pl-16 text-2xl"
				>Assign colors to your feature flags for better visibility and organization.</P
			>
		</div>
		<Img class="mx-auto my-4 w-1/2" alt="Flagflow logo" src="/favicon.png" />
	</div>
</PageSection>

<PageSection>XXX</PageSection>
