<script lang="ts">
	import { Button, Heading, Img, P } from 'flowbite-svelte';

	import HtmlHeader from '$components/HtmlHeader.svelte';
	import Icon from '$components/Icon.svelte';
	import PageSection from '$components/PageSection.svelte';

	import restApiImage400 from '../integration/restapi.png?w=400&format=webp&imagetools';
	import cicdImage400 from './cicd.webp?w=400&format=webp&imagetools';
</script>

<HtmlHeader
	description="Integrate FlagFlow feature flag management into your CI/CD pipelines with TypeScript schema generation, Zod validation, hash-based error prevention, and automated migration tools for modern DevOps workflows."
	keywords="flagflow cicd, feature flags ci cd, devops feature flags, typescript feature flags, zod validation feature flags, pipeline integration, continuous integration feature flags, automated deployment flags, devops automation, feature flag automation"
	title="CI/CD with FlagFlow"
/>

<PageSection>
	<div class="mx-auto max-w-5xl">
		<div class="mb-8 text-center">
			<Heading class="mb-4 text-4xl font-bold text-gray-900" tag="h1">
				FlagFlow for CI/CD Pipelines
			</Heading>
			<P class="text-center text-xl text-gray-600">
				Seamlessly integrate feature flag management into your continuous integration and deployment
				workflows
			</P>
		</div>

		<!-- Hero Section -->
		<div class="mb-16 rounded-xl border border-gray-200 p-8 transition-all hover:shadow-lg">
			<div class="grid gap-8 md:grid-cols-2 md:items-center">
				<div>
					<Img
						class="w-full rounded-lg shadow-sm"
						alt="CI/CD Pipeline Integration"
						src={cicdImage400}
					/>
				</div>
				<div class="space-y-4">
					<Heading class="text-2xl font-semibold text-gray-900" tag="h2">
						Built for Modern DevOps
					</Heading>
					<P class="text-base leading-relaxed text-gray-600">
						FlagFlow is designed from the ground up for CI/CD workflows. As the name suggests, it
						enables feature flags to flow seamlessly through your development pipeline, ensuring
						type safety, consistency, and easy adoption of coding standards across your team.
					</P>
					<div class="flex flex-wrap gap-3">
						<Button href="/docs">Get Started</Button>
						<Button color="alternative" href="/docs/typescript/ts-schema">
							TypeScript Integration
						</Button>
					</div>
				</div>
			</div>
		</div>

		<!-- Available Features -->
		<div class="mb-16">
			<div class="mb-12 text-center">
				<Heading class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl" tag="h2">
					<Icon id="checkCircle" class="inline-flex" align="left" color="#16a34a" size={32} />
					Available Features
				</Heading>
				<P class="text-lg text-gray-600">
					Powerful tools ready to streamline your development workflow
				</P>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				<!-- TypeScript Integration -->
				<div class="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg">
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						<Icon id="typescript" class="inline-flex" align="left" color="#3178c6" size={24} />
						TypeScript Schema Generation
					</Heading>
					<P class="mb-4 text-base leading-relaxed text-gray-600">
						Generate type-safe TypeScript interfaces automatically from your feature flags. Keep
						your code synchronized and enable developers to update schemas effortlessly.
					</P>
					<ul class="mb-6 space-y-3 text-base text-gray-700">
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
							Automatic interface generation
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
							Type safety across your application
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
							Easy developer updates
						</li>
					</ul>
					<div class="flex gap-3">
						<Button href="/docs/typescript/ts-schema" size="sm">TS Schema Docs</Button>
						<Button color="alternative" href="/docs/typescript/zod-schema" size="sm">
							Zod Integration
						</Button>
					</div>
				</div>

				<!-- Zod Schema Validation -->
				<div class="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg">
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						<Icon id="validation" class="inline-flex" align="left" color="#16a34a" size={24} />
						Zod Schema Validation
					</Heading>
					<P class="mb-4 text-base leading-relaxed text-gray-600">
						Runtime type validation and parsing with automatically generated Zod schemas. Ensure
						data integrity and catch errors before they reach production.
					</P>
					<ul class="mb-6 space-y-3 text-base text-gray-700">
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
							Runtime validation
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
							Automatic schema generation
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
							Error prevention
						</li>
					</ul>
					<div class="flex gap-3">
						<Button href="/docs/typescript/zod-schema" size="sm">Zod Docs</Button>
					</div>
				</div>

				<!-- Hash Mechanism -->
				<div class="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg">
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						<Icon id="hash" class="inline-flex" align="left" color="#ea580c" size={24} />
						Hash-Based Error Prevention
					</Heading>
					<P class="mb-4 text-base leading-relaxed text-gray-600">
						SHA-1 hashing mechanism ensures type safety and cache consistency. Detect schema
						mismatches and prevent runtime errors before they impact users.
					</P>
					<ul class="mb-6 space-y-3 text-base text-gray-700">
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
							Schema mismatch detection
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
							Cache consistency validation
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
							Runtime error prevention
						</li>
					</ul>
					<div class="flex gap-3">
						<Button href="/docs/typescript/hash" size="sm">Hash Validation Docs</Button>
					</div>
				</div>

				<!-- Migration System -->
				<div class="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg">
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						<Icon id="migration" class="inline-flex" align="left" color="#16a34a" size={24} />
						Fine-Grained Migration
					</Heading>
					<P class="mb-4 text-base leading-relaxed text-gray-600">
						Granular migration tools make it easy to move configurations between environments.
						Export, backup, restore, and migrate with confidence.
					</P>
					<ul class="mb-6 space-y-3 text-base text-gray-700">
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
							Cross-environment migration
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
							Export and backup tools
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
							Easy restore processes
						</li>
					</ul>
					<div class="flex gap-3">
						<Button href="/docs/migration/migration" size="sm">Migration Docs</Button>
						<Button color="alternative" href="/docs/migration/export-backup" size="sm">
							Backup Guide
						</Button>
					</div>
				</div>
			</div>
		</div>

		<!-- Coming Soon: REST API -->
		<div class="mb-16">
			<div class="mb-12 text-center">
				<Heading class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl" tag="h2">
					<Icon id="rocket" class="inline-flex" align="left" color="#2563eb" size={32} />
					Coming Soon: Advanced Pipeline Integration
				</Heading>
				<P class="text-lg text-gray-600">
					Enhanced automation capabilities for the ultimate CI/CD experience
				</P>
			</div>

			<div class="rounded-xl border border-gray-200 p-8 transition-all hover:shadow-lg">
				<div class="grid gap-8 md:grid-cols-2 md:items-center">
					<div>
						<Img
							class="w-full rounded-lg shadow-sm"
							alt="REST API Integration"
							src={restApiImage400}
						/>
					</div>
					<div class="space-y-4">
						<Heading class="text-2xl font-semibold text-gray-900" tag="h3">
							REST API for Full Automation
						</Heading>
						<P class="text-base leading-relaxed text-gray-600">
							We're developing a comprehensive REST API that will enable complete automation of your
							feature flag workflows. Integrate directly with your CI/CD pipelines, automate flag
							toggles based on deployment stages, and build custom tooling around FlagFlow.
						</P>
						<ul class="mb-4 space-y-3 text-base text-gray-700">
							<li class="flex items-center">
								<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
								Programmatic flag management
							</li>
							<li class="flex items-center">
								<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
								Pipeline-triggered flag updates
							</li>
							<li class="flex items-center">
								<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
								Custom tooling integration
							</li>
							<li class="flex items-center">
								<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
								Client-to-client communication
							</li>
						</ul>
						<P class="text-base text-gray-600 italic">
							<Icon id="lightbulb" align="left" color="#2563eb" size={20} />
							Stay tuned for updates on this exciting feature!
						</P>
					</div>
				</div>
			</div>
		</div>

		<!-- Getting Started CTA -->
		<div class="rounded-lg bg-gray-100 p-8 text-center">
			<Heading class="mb-4 text-2xl font-semibold text-gray-900" tag="h2">
				Ready to Streamline Your CI/CD?
			</Heading>
			<P class="mb-6 text-lg text-gray-700">
				Get started with FlagFlow today and experience seamless feature flag management in your
				development pipeline.
			</P>
			<div class="flex flex-wrap justify-center gap-4">
				<Button href="/docs" size="lg">Get Started</Button>
				<Button color="alternative" href="/docs/installation/docker" size="lg">Docker Setup</Button>
				<Button color="alternative" href="/docs/installation/kubernetes" size="lg">
					Kubernetes Deploy
				</Button>
			</div>
		</div>
	</div>
</PageSection>
