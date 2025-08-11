<script lang="ts">
	import { Button, Heading, Img, P } from 'flowbite-svelte';

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

<HtmlHeader title="FlagFlow Features" />

<PageSection>
	<div class="mx-auto max-w-6xl">
		<div class="mb-8 text-center">
			<Heading class="mb-4 text-4xl font-bold text-gray-900" tag="h1">FlagFlow Features</Heading>
			<P class="text-center text-xl text-gray-600">
				It's easy, it's only feature flags. But not everything is booleans!
			</P>
		</div>

		<!-- Hero Section: Beyond Booleans -->
		<div class="mb-12 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-8">
			<div class="text-center">
				<Heading class="mb-4 text-2xl font-semibold text-gray-800" tag="h2">
					More Than Just On/Off Switches
				</Heading>
				<P class="mb-6 text-lg text-gray-700">
					While feature flags started as simple boolean toggles, modern applications need much more.
					FlagFlow supports a rich variety of flag types to handle any use case.
				</P>

				<!-- Flag Types Grid -->
				<div class="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					<div class="p-4 text-center">
						<div class="mb-2 flex justify-center">
							<Icon id="boolean" color="#059669" size={32} />
						</div>
						<Heading class="mb-2 text-lg font-semibold text-gray-800" tag="h3">Boolean</Heading>
						<P class="text-sm text-gray-600">True/false toggles for simple feature switches</P>
					</div>
					<div class="p-4 text-center">
						<div class="mb-2 flex justify-center">
							<Icon id="number" color="#2563eb" size={32} />
						</div>
						<Heading class="mb-2 text-lg font-semibold text-gray-800" tag="h3">Number</Heading>
						<P class="text-sm text-gray-600"
							>Numeric values for limits, percentages, and thresholds</P
						>
					</div>
					<div class="p-4 text-center">
						<div class="mb-2 flex justify-center">
							<Icon id="string" color="#7c3aed" size={32} />
						</div>
						<Heading class="mb-2 text-lg font-semibold text-gray-800" tag="h3">String</Heading>
						<P class="text-sm text-gray-600"
							>Text values for API endpoints, messages, and configurations</P
						>
					</div>
					<div class="p-4 text-center">
						<div class="mb-2 flex justify-center">
							<Icon id="json" color="#ea580c" size={32} />
						</div>
						<Heading class="mb-2 text-lg font-semibold text-gray-800" tag="h3">JSON</Heading>
						<P class="text-sm text-gray-600">Complex objects for advanced configurations</P>
					</div>
				</div>

				<Button href="/docs/flags/flag-types">Explore Flag Types</Button>
			</div>
		</div>

		<!-- New Flag Wizard -->
		<div class="mb-12">
			<Heading class="mb-8 text-center text-2xl font-semibold text-gray-800" tag="h2">
				New Flag Wizard
			</Heading>
			<div class="grid gap-8 md:grid-cols-2">
				<div class="rounded-lg bg-blue-50 p-6">
					<Img
						class="mb-4 w-full rounded-lg shadow-lg"
						alt="New Flag Wizard"
						src={flagWizardImage800}
					/>
					<Heading class="mb-3 text-lg font-semibold text-blue-900" tag="h3">
						Step-by-Step Creation
					</Heading>
					<P class="text-blue-800">
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
					<Heading class="mb-3 text-lg font-semibold text-green-900" tag="h3">
						Smart Naming Conventions
					</Heading>
					<P class="text-green-800">
						Autocomplete, validation, and suggestions help you follow consistent naming patterns.
					</P>
				</div>
			</div>
		</div>

		<!-- Hierarchical Structure and Value Management - Side by Side -->
		<div class="mb-12">
			<div class="grid gap-8 md:grid-cols-2">
				<div class="rounded-lg bg-green-50 p-6">
					<Img
						class="mb-4 w-full rounded-lg shadow-lg"
						alt="Hierarchical Structure"
						src={hierarchicalViewImage800}
					/>
					<Heading class="mb-3 text-lg font-semibold text-green-900" tag="h3">
						Hierarchical Structure
					</Heading>
					<P class="mb-4 text-green-800">
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
					<Heading class="mb-3 text-lg font-semibold text-blue-900" tag="h3">
						Easy Flag Value Management
					</Heading>
					<P class="mb-4 text-blue-800">
						Update flag values with a single click. Toggle booleans, adjust numbers, edit strings,
						or modify JSON objects instantly.
					</P>
				</div>
			</div>
		</div>

		<!-- Graph Overview - Standalone -->
		<div class="mb-12">
			<div class="flex justify-center">
				<div class="max-w-md rounded-lg bg-purple-50 p-6">
					<Img
						class="mb-4 w-full rounded-lg shadow-lg"
						alt="Graph Overview"
						src={graphViewImage800}
					/>
					<Heading class="mb-3 text-center text-lg font-semibold text-purple-900" tag="h3">
						Graph Overview
					</Heading>
					<P class="text-center text-purple-800">
						Visual graph showing flag usage patterns at a glance.
					</P>
				</div>
			</div>
		</div>
	</div>
</PageSection>

<!-- Kill Switch - Full Width Gray Section -->
<div class="bg-gray-100 py-16">
	<div class="mx-auto max-w-6xl px-4">
		<div class="grid gap-8 md:grid-cols-2 md:items-center">
			<div class="space-y-4">
				<Heading class="text-2xl font-semibold text-red-800" tag="h2">
					⚠️ Emergency Kill Switch
				</Heading>
				<P class="leading-relaxed text-gray-700">
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
			<div class="grid gap-8 md:grid-cols-2 md:items-center">
				<div>
					<Img class="w-full rounded-lg shadow-lg" alt="Migration Tools" src={migrationImage800} />
				</div>
				<div class="space-y-4">
					<Heading class="text-2xl font-semibold text-gray-800" tag="h2">
						Migration & Environment Management
					</Heading>
					<P class="leading-relaxed text-gray-700">
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
		<Heading class="mb-8 text-center text-2xl font-semibold text-gray-800" tag="h2">
			Type-Safe Code Integration
		</Heading>
		<div class="grid gap-8 md:grid-cols-2">
			<div class="p-6">
				<Heading class="mb-4 text-lg font-semibold text-gray-900" tag="h3">
					<Icon id="typescript" align="left" color="#3178c6" size={20} />
					TypeScript Integration
				</Heading>
				<P class="mb-4 text-gray-700">
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

			<div class="p-6">
				<Heading class="mb-4 text-lg font-semibold text-gray-900" tag="h3">
					<Icon id="validation" align="left" color="#16a34a" size={20} />
					Zod Runtime Validation
				</Heading>
				<P class="mb-4 text-gray-700">
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
			<Heading class="mb-4 text-2xl font-bold text-gray-900" tag="h2">
				Ready to Experience These Features?
			</Heading>
			<P class="mb-6 text-center text-lg text-gray-700">
				Get started with FlagFlow today and see how easy feature flag management can be.
			</P>
			<div class="flex flex-wrap justify-center gap-4">
				<Button href="/docs" size="lg">Get Started</Button>
				<Button color="alternative" href="/docs/installation/docker" size="lg">Docker Setup</Button>
				<Button color="alternative" href="/oss-open-source" size="lg">Open Source</Button>
			</div>
		</div>
	</div>
</PageSection>
