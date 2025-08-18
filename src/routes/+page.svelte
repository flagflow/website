<script lang="ts">
	/* eslint-disable no-undef */
	import { Button, Heading, Img, Kbd, P } from 'flowbite-svelte';

	import CodeBlock from '$components/CodeBlock.svelte';
	import HtmlHeader from '$components/HtmlHeader.svelte';
	import Icon from '$components/Icon.svelte';
	import PageSection from '$components/PageSection.svelte';

	import graphViewImage800 from './graph-view.png?w=800&format=webp&imagetools';
	import hierarchicalViewImage800 from './hierarchical-view.png?w=800&format=webp&imagetools';
	import killSwitchImage800 from './killswitch.png?w=800&format=webp&imagetools';
	import migrationImage800 from './migration.png?w=800&format=webp&imagetools';
	import flagWizardImage800 from './newflagwizard.png?w=800&format=webp&imagetools';
	import flagWizardNameImage800 from './newflagwizard-name.png?w=800&format=webp&imagetools';
	import setValueViewImage800 from './setvalue-view.png?w=800&format=webp&imagetools';
</script>

<HtmlHeader
	description="FlagFlow empowers you to control feature flags effortlessly. Manage boolean, number, string, and JSON flags with hierarchical organization, kill switches, TypeScript integration, and seamless migration tools in one powerful UI."
	keywords="flagflow, feature flag management platform, feature toggles, feature flags ui, boolean flags, json flags, hierarchical flags, kill switch, typescript feature flags, migration tools, developer tools, feature rollout, a b testing"
	title="Welcome"
/>

<!-- Hero Section -->
<PageSection>
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<div class="order-2 lg:order-1">
			<Heading class="mb-4 text-3xl leading-tight font-extrabold md:text-4xl lg:text-5xl" tag="h1">
				The <span class="text-orange-700">FlagFlow</span> empowers you to control feature flags effortlessly
			</Heading>
			<P class="mb-6 pl-0 text-lg md:text-xl lg:pl-16 lg:text-2xl">
				Define, manage and control them in one UI to enable dynamic application behavior and A/B
				testing.
			</P>
		</div>
		<div class="order-1 flex justify-center lg:order-2 lg:justify-end">
			<Img class="w-32 md:w-48 lg:w-1/2" alt="Flagflow logo" src="/favicon.png" />
		</div>
	</div>
	<div class="flex flex-col gap-4 pl-0 sm:flex-row sm:gap-8">
		<Kbd class="text-md px-4 font-light">
			# docker pull ghcr.io/flagflow/flagflow:{__APP_VERSION__}
		</Kbd>
		<Button href="/docs">
			Get started
			<Icon id="arrowRight" align="right" />
		</Button>
	</div>
</PageSection>

<PageSection>
	<div class="mx-auto max-w-6xl">
		<!-- Hero Section: Beyond Booleans -->
		<div class="mb-12 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-8">
			<div class="text-center">
				<Heading class="mb-4 text-xl font-semibold text-gray-800 md:text-2xl" tag="h2">
					More Than Just On/Off Switches
				</Heading>
				<P class="mb-6 text-base text-gray-700 md:text-lg">
					While feature flags started as simple boolean toggles, modern applications need much more.
					FlagFlow supports a rich variety of flag types to handle any use case.
				</P>

				<!-- Flag Types Grid -->
				<div class="mb-6 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
					<div class="p-4 text-center">
						<div class="mb-2 flex justify-center">
							<Icon id="boolean" color="#059669" size={32} />
						</div>
						<Heading class="mb-2 text-base font-semibold text-gray-800 md:text-lg" tag="h3"
							>Boolean</Heading
						>
						<P class="text-xs text-gray-600 md:text-sm"
							>True/false toggles for simple feature switches</P
						>
					</div>
					<div class="p-4 text-center">
						<div class="mb-2 flex justify-center">
							<Icon id="number" color="#2563eb" size={32} />
						</div>
						<Heading class="mb-2 text-base font-semibold text-gray-800 md:text-lg" tag="h3"
							>Number</Heading
						>
						<P class="text-xs text-gray-600 md:text-sm"
							>Numeric values for limits, percentages, and thresholds</P
						>
					</div>
					<div class="p-4 text-center">
						<div class="mb-2 flex justify-center">
							<Icon id="string" color="#7c3aed" size={32} />
						</div>
						<Heading class="mb-2 text-base font-semibold text-gray-800 md:text-lg" tag="h3"
							>String</Heading
						>
						<P class="text-xs text-gray-600 md:text-sm"
							>Text values for API endpoints, messages, and configurations</P
						>
					</div>
					<div class="p-4 text-center">
						<div class="mb-2 flex justify-center">
							<Icon id="json" color="#ea580c" size={32} />
						</div>
						<Heading class="mb-2 text-base font-semibold text-gray-800 md:text-lg" tag="h3"
							>JSON</Heading
						>
						<P class="text-xs text-gray-600 md:text-sm"
							>Complex objects for advanced configurations</P
						>
					</div>
				</div>

				<Button href="/docs/flags/flag-types">Explore Flag Types</Button>
			</div>
		</div>

		<!-- New Flag Wizard -->
		<div class="mb-12">
			<Heading
				class="mb-6 text-center text-xl font-semibold text-gray-800 md:mb-8 md:text-2xl"
				tag="h2"
			>
				New Flag Wizard
			</Heading>
			<div class="grid gap-4 md:grid-cols-2 md:gap-8">
				<div class="rounded-lg bg-blue-50 p-6">
					<Img
						class="mb-4 w-full rounded-lg shadow-lg"
						alt="New Flag Wizard"
						src={flagWizardImage800}
					/>
					<Heading class="mb-3 text-base font-semibold text-blue-900 md:text-lg" tag="h3">
						Step-by-Step Creation
					</Heading>
					<P class="text-sm text-blue-800 md:text-base">
						Our intuitive wizard guides you through flag creation with clear steps, validation, and
						helpful hints.
					</P>
				</div>
				<div class="rounded-lg bg-green-50 p-6">
					<Img
						class="mb-4 w-full rounded-lg shadow-lg"
						alt="Flag Naming Step"
						src={flagWizardNameImage800}
					/>
					<Heading class="mb-3 text-base font-semibold text-green-900 md:text-lg" tag="h3">
						Smart Naming Conventions
					</Heading>
					<P class="text-sm text-green-800 md:text-base">
						Autocomplete, validation, and suggestions help you follow consistent naming patterns.
					</P>
				</div>
			</div>
		</div>

		<!-- Hierarchical Structure and Value Management - Side by Side -->
		<div class="mb-8 md:mb-12">
			<div class="grid gap-4 md:grid-cols-2 md:gap-8">
				<div class="rounded-lg bg-green-50 p-6">
					<Img
						class="mb-4 w-full rounded-lg shadow-lg"
						alt="Hierarchical Structure"
						src={hierarchicalViewImage800}
					/>
					<Heading class="mb-3 text-base font-semibold text-green-900 md:text-lg" tag="h3">
						Hierarchical Structure
					</Heading>
					<P class="mb-4 text-sm text-green-800 md:text-base">
						Organize flags in a tree structure for logical grouping, easier navigation, and
						team-based management.
					</P>
					<Button color="green" href="/docs/flags/hierarchy" size="xs">Learn More</Button>
				</div>
				<div class="rounded-lg bg-blue-50 p-6">
					<Img
						class="mb-4 w-full rounded-lg shadow-lg"
						alt="Easy Flag Value Setting"
						src={setValueViewImage800}
					/>
					<Heading class="mb-3 text-base font-semibold text-blue-900 md:text-lg" tag="h3">
						Easy Flag Value Management
					</Heading>
					<P class="mb-4 text-sm text-blue-800 md:text-base">
						Update flag values with a single click. Toggle booleans, adjust numbers, edit strings,
						or modify JSON objects instantly.
					</P>
				</div>
			</div>
		</div>

		<!-- Graph Overview - Standalone -->
		<div class="mb-8 md:mb-12">
			<div class="flex justify-center">
				<div class="w-full max-w-md rounded-lg bg-purple-50 p-4 md:p-6">
					<Img
						class="mb-4 w-full rounded-lg shadow-lg"
						alt="Graph Overview"
						src={graphViewImage800}
					/>
					<Heading
						class="mb-3 text-center text-base font-semibold text-purple-900 md:text-lg"
						tag="h3"
					>
						Graph Overview
					</Heading>
					<P class="text-center text-sm text-purple-800 md:text-base">
						Visual graph showing flag usage patterns at a glance.
					</P>
				</div>
			</div>
		</div>
		<div class="text-center">
			<Button
				class="mb-4"
				color="orange"
				href="https://demo.flagflow.net"
				size="lg"
				target="_blank"
			>
				I want to see the Demo
			</Button>
		</div>
	</div>
</PageSection>

<!-- Kill Switch - Full Width Gray Section -->
<div class="bg-gray-100 py-16">
	<div class="mx-auto max-w-6xl px-4">
		<div class="grid gap-4 md:grid-cols-2 md:items-center md:gap-8">
			<div class="space-y-4">
				<Heading class="text-xl font-semibold text-red-800 md:text-2xl" tag="h2">
					⚠️ Emergency Kill Switch
				</Heading>
				<P class="text-sm leading-relaxed text-gray-700 md:text-base">
					Quickly disable problematic features with our prominently placed kill switch on the main
					dashboard. No hunting through menus when every second counts.
				</P>
				<div class="rounded-lg bg-red-50 p-4">
					<ul class="space-y-2 text-sm text-red-700">
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
							One-click emergency disable
						</li>
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
							Prominently displayed on main page
						</li>
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
							Immediate global effect
						</li>
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
							Audit trail for accountability
						</li>
					</ul>
				</div>
			</div>
			<div>
				<Img
					class="w-full rounded-lg shadow-lg"
					alt="Kill Switch Interface"
					src={killSwitchImage800}
				/>
			</div>
		</div>
	</div>
</div>

<PageSection>
	<div class="mx-auto max-w-6xl">
		<!-- Migration Tools -->
		<div class="mb-12">
			<div class="grid gap-4 md:grid-cols-2 md:items-center md:gap-8">
				<div>
					<Img class="w-full rounded-lg shadow-lg" alt="Migration Tools" src={migrationImage800} />
				</div>
				<div class="space-y-4">
					<Heading class="text-xl font-semibold text-gray-800 md:text-2xl" tag="h2">
						Migration & Environment Management
					</Heading>
					<P class="text-sm leading-relaxed text-gray-700 md:text-base">
						Move configurations between environments with confidence. Export, backup, restore, and
						migrate your flags with granular control and comprehensive validation.
					</P>
					<div class="grid grid-cols-2 gap-3">
						<Button href="/docs/migration/migration" size="xs">Migration Guide</Button>
						<Button color="alternative" href="/docs/migration/restore" size="xs">
							Restore Process
						</Button>
						<Button color="alternative" href="/docs/migration/export-backup" size="xs">
							Backup Tools
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</PageSection>

<!-- Type-Safe Code Integration - Full Width Gray Section -->
<div class="bg-gray-100 py-16">
	<div class="mx-auto max-w-6xl px-4">
		<Heading
			class="mb-6 text-center text-xl font-semibold text-gray-800 md:mb-8 md:text-2xl"
			tag="h2"
		>
			Type-Safe Code Integration
		</Heading>
		<div class="grid gap-4 md:grid-cols-2 md:gap-8">
			<div class="p-4 md:p-6">
				<Heading class="mb-4 text-base font-semibold text-gray-900 md:text-lg" tag="h3">
					<Icon id="typescript" align="left" color="#3178c6" size={20} />
					TypeScript Integration
				</Heading>
				<P class="mb-4 text-sm text-gray-700 md:text-base">
					Generate type-safe interfaces automatically from your flags:
				</P>
				<CodeBlock
					code={`// Auto-generated TypeScript interface
interface FeatureFlags {
  darkMode: boolean;
  maxUsers: number;
  apiEndpoint: string;
  uiConfig: {
    theme: 'light' | 'dark';
    beta: boolean;
  };
}

// Type-safe access
const flags: FeatureFlags = await getFlags();
if (flags.darkMode) {
  applyDarkTheme();
}`}
					title="TypeScript Example"
				/>
				<div class="mt-4">
					<Button href="/docs/typescript/ts-schema" size="xs">TS Schema Docs</Button>
				</div>
			</div>

			<div class="p-4 md:p-6">
				<Heading class="mb-4 text-base font-semibold text-gray-900 md:text-lg" tag="h3">
					<Icon id="validation" align="left" color="#16a34a" size={20} />
					Zod Runtime Validation
				</Heading>
				<P class="mb-4 text-sm text-gray-700 md:text-base">
					Validate flag data at runtime with automatically generated Zod schemas:
				</P>
				<CodeBlock
					code={`import { z } from 'zod';

// Auto-generated Zod schema
const FlagsSchema = z.object({
  darkMode: z.boolean(),
  maxUsers: z.number().min(1),
  apiEndpoint: z.string().url(),
  uiConfig: z.object({
    theme: z.enum(['light', 'dark']),
    beta: z.boolean()
  })
});

// Runtime validation
const result = FlagsSchema.safeParse(flagData);
if (result.success) {
  // Type-safe flag usage
  console.log(result.data.darkMode);
}`}
					title="Zod Validation Example"
				/>
				<div class="mt-4">
					<Button href="/docs/typescript/zod-schema" size="xs">Zod Schema Docs</Button>
				</div>
			</div>
		</div>
	</div>
</div>

<PageSection>
	<div class="mx-auto max-w-6xl">
		<!-- Call to Action -->
		<div class="p-8 text-center">
			<Heading class="mb-4 text-xl font-bold text-gray-900 md:text-2xl" tag="h2">
				Ready to Experience These Features?
			</Heading>
			<P class="mb-6 text-center text-base text-gray-700 md:text-lg">
				Get started with FlagFlow today and see how easy feature flag management can be.
			</P>
			<div class="flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-4">
				<Button href="/docs" size="lg">Get Started</Button>
				<Button color="alternative" href="/docs/installation/docker" size="lg">Docker Setup</Button>
				<Button color="alternative" href="/oss-open-source" size="lg">Open Source</Button>
				<Button color="orange" href="https://demo.flagflow.net" size="lg" target="_blank">
					Demo
				</Button>
			</div>
		</div>
	</div>
</PageSection>

<!-- Quick Links Section -->
<div class="bg-gray-100 py-16">
	<div class="mx-auto max-w-6xl px-4 text-center">
		<div class="mb-12">
			<Heading class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl" tag="h2"
				>Explore FlagFlow</Heading
			>
			<P class="text-center text-base text-gray-700 md:text-lg">
				Discover all the powerful features that make FlagFlow the ideal choice for feature flag
				management
			</P>
		</div>
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
			<div class="p-4 text-center md:p-6">
				<div class="flex justify-center">
					<Icon id="rocket2" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-base font-semibold text-gray-900 md:text-lg" tag="h3"
					>Features</Heading
				>
				<P class="mb-3 text-xs text-gray-700 md:text-sm">Explore all FlagFlow capabilities</P>
				<Button href="/docs" size="xs">View Features</Button>
			</div>
			<div class="p-4 text-center md:p-6">
				<div class="flex justify-center">
					<Icon id="api" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-base font-semibold text-gray-900 md:text-lg" tag="h3"
					>Integrations</Heading
				>
				<P class="mb-3 text-xs text-gray-700 md:text-sm">Connect with your favorite tools</P>
				<Button href="/integration" size="xs">View Integrations</Button>
			</div>
			<div class="p-4 text-center md:p-6">
				<div class="flex justify-center">
					<Icon id="deploy" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-base font-semibold text-gray-900 md:text-lg" tag="h3"
					>CI/CD</Heading
				>
				<P class="mb-3 text-xs text-gray-700 md:text-sm">Perfect for DevOps workflows</P>
				<Button href="/ci-cd" size="xs">CI/CD Guide</Button>
			</div>
			<div class="p-4 text-center md:p-6">
				<div class="flex justify-center">
					<Icon id="book" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-base font-semibold text-gray-900 md:text-lg" tag="h3"
					>Documentation</Heading
				>
				<P class="mb-3 text-xs text-gray-700 md:text-sm">Complete guides and references</P>
				<Button href="/docs" size="xs">Read Docs</Button>
			</div>
		</div>
	</div>
</div>
