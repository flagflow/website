<script lang="ts">
	import { Button, Heading, Img, P } from 'flowbite-svelte';

	import HtmlHeader from '$components/HtmlHeader.svelte';
	import PageSection from '$components/PageSection.svelte';

	import opensourceImage400 from './opensource.jpg?w=400&format=webp&imagetools';
</script>

<HtmlHeader description="" keywords="" title="Open Source at FlagFlow" />

<PageSection>
	<div class="mx-auto max-w-4xl">
		<div class="mb-8 text-center">
			<Heading class="mb-4 text-4xl font-bold text-gray-900" tag="h1">
				FlagFlow: Powering Innovation Through Open Source
			</Heading>
			<P class="text-center text-xl text-gray-600"
				>Building the future of feature flag management, together</P
			>
		</div>

		<div class="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
			<div>
				<Img
					class="w-full rounded-lg shadow-lg"
					alt="Open source collaboration"
					src={opensourceImage400}
				/>
			</div>
			<div class="space-y-4">
				<Heading class="text-2xl font-semibold text-gray-800" tag="h2">
					Why Open Source Matters
				</Heading>
				<P class="leading-relaxed text-gray-700">
					Open source software forms the backbone of modern technology. It democratizes innovation,
					enabling developers worldwide to collaborate, learn, and build upon each other's work.
					From the operating systems that run our servers to the frameworks that power our
					applications, open source creates a shared foundation where transparency, security, and
					rapid iteration thrive.
				</P>
			</div>
		</div>

		<div class="mb-12 grid gap-8 md:grid-cols-2">
			<div class="rounded-lg bg-blue-50 p-6">
				<Heading class="mb-4 text-xl font-semibold text-blue-900" tag="h3">
					Benefits of Contributing to Open Source
				</Heading>
				<ul class="space-y-3 text-blue-800">
					<li class="flex items-start">
						<span class="mt-1 mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
						<span
							><strong>Skill Development:</strong> Sharpen your coding abilities by working on real-world
							projects</span
						>
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
						<span
							><strong>Career Growth:</strong> Build a portfolio that showcases your expertise to potential
							employers</span
						>
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
						<span
							><strong>Global Network:</strong> Connect with developers and maintainers from around the
							world</span
						>
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
						<span
							><strong>Impact:</strong> Create solutions that benefit thousands of developers and businesses</span
						>
					</li>
				</ul>
			</div>

			<div class="rounded-lg bg-green-50 p-6">
				<Heading class="mb-4 text-xl font-semibold text-green-900" tag="h3">
					FlagFlow: Free and Open Source
				</Heading>
				<P class="mb-4 text-green-800">
					FlagFlow is proudly open source and completely free to use. We believe that feature flag
					management should be accessible to teams of all sizes, from solo developers building side
					projects to enterprise organizations scaling globally.
				</P>
				<P class="mb-4 text-green-800">
					By keeping FlagFlow open source, we ensure transparency in how your feature flags are
					managed, allow for community-driven improvements, and provide the flexibility to customize
					the platform to your specific needs.
				</P>
				<div class="flex flex-wrap gap-3">
					<Button color="green" href="https://github.com/flagflow/flagflow" target="_blank">
						View on GitHub
					</Button>
					<Button color="alternative" href="/docs">Get Started</Button>
				</div>
			</div>
		</div>

		<div class="rounded-lg bg-orange-50 p-8 text-center">
			<Heading class="mb-4 text-2xl font-semibold text-orange-900" tag="h2">
				Join Our Community
			</Heading>
			<P class="mb-6 text-lg text-orange-800">
				Whether you're fixing bugs, adding features, improving documentation, or simply sharing
				ideas, every contribution makes FlagFlow better for everyone.
			</P>
			<div class="flex flex-wrap justify-center gap-4">
				<Button color="orange" href="https://github.com/flagflow/flagflow/issues" target="_blank">
					Report Issues
				</Button>
				<Button color="orange" href="https://github.com/flagflow/flagflow/pulls" target="_blank">
					Submit Pull Request
				</Button>
				<Button
					color="orange"
					href="https://github.com/flagflow/flagflow/discussions"
					target="_blank"
				>
					Join Discussions
				</Button>
			</div>
		</div>
	</div>
</PageSection>
