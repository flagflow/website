<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Flag Types">
		Understanding FlagFlow's comprehensive flag type system for different use cases
	</PageTitle>

	<DocsPageSection id="overview" title="Overview">
		<p class="mb-4">
			FlagFlow supports 6 different flag types, each designed for specific use cases and providing
			type-safe configuration management. Each flag type includes built-in validation, TypeScript
			support, and configurable constraints to ensure data integrity.
		</p>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Type Safety:</strong> All flag types generate complete TypeScript definitions with IntelliSense
				support and runtime Zod schema validation.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="flag-types-table" title="Flag Types Reference">
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Type</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
						<th class="border border-gray-300 px-4 py-2 text-left">TypeScript Type</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Example Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="bg-blue-100 font-mono text-sm">BOOLEAN</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							Simple on/off features and kill switches. Perfect for feature toggles,
							enabling/disabling functionality, or binary configuration options. No additional
							constraints or properties required.
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">boolean</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">true</code>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="bg-green-100 font-mono text-sm">INTEGER</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							Numeric configuration values with optional min/max constraints. Ideal for retry
							counts, timeouts, rate limits, batch sizes, and any numeric thresholds that require
							validation within specific ranges.
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">number</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">42</code>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="bg-yellow-100 font-mono text-sm">STRING</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							Text-based configuration with optional length and regex pattern validation. Perfect
							for API endpoints, messages, identifiers, and any textual configuration that needs
							format validation or length constraints.
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">string</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">"api.example.com"</code>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="bg-purple-100 font-mono text-sm">ENUM</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							Select one option from a predefined set of choices. Excellent for theme selection,
							environment modes, algorithm choices, or any configuration where you need to restrict
							values to specific valid options with type safety.
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">"red" | "green" | "blue"</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">"red"</code>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="bg-orange-100 font-mono text-sm">TAG</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							Multiple selections from predefined choices with optional min/max count constraints.
							Ideal for feature module selection, multi-option configuration, categorization, or any
							scenario requiring multiple valid selections.
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm"
								>("analytics" | "chat" | "notifications" | "reporting")[]</code
							>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">["analytics", "notifications"]</code>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="bg-red-100 font-mono text-sm">AB-TEST</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							A/B testing and split testing with configurable probability distribution. Returns "A"
							or "B" based on specified percentage chance for variant B. Perfect for gradual
							rollouts, experimental features, and controlled testing.
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">"A" | "B"</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">"A"</code> (75% chance)<br />
							<code class="font-mono text-sm">"B"</code> (25% chance)
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="constraints" title="Type Constraints and Validation">
		<p class="mb-4">
			Each flag type supports specific constraints and validation rules to ensure data integrity:
		</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Type</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Available Constraints</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Example Configuration</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">BOOLEAN</code>
						</td>
						<td class="border border-gray-300 px-4 py-2"> No additional constraints </td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">defaultValue: true</code>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">INTEGER</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code>minValue</code>, <code>maxValue</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">minValue: 1, maxValue: 100</code>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">STRING</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code>maxLength</code>, <code>regexPattern</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">maxLength: 255, regexPattern: "^https?://"</code>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">ENUM</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code>enumValues</code> (required)
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">enumValues: ["light", "dark", "auto"]</code>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">TAG</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code>enumValues</code> (required), <code>minCount</code>, <code>maxCount</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm"
								>enumValues: ["core", "analytics", "notifications", "reporting"], minCount: 1,
								maxCount: 4</code
							>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">AB-TEST</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code>chancePercentB</code> (0-100)
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">chancePercentB: 25.0</code>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="typescript-integration" title="TypeScript Integration">
		<p class="mb-4">
			FlagFlow generates complete TypeScript definitions for all flag types, providing full
			IntelliSense support and compile-time type checking:
		</p>
		<CodeBlock
			code={`// Generated TypeScript definitions
export interface FLAGS {
  enable_new_dashboard: boolean;           // BOOLEAN type
  max_retries: number;                     // INTEGER type
  api_endpoint: string;                    // STRING type
  theme_mode: "light" | "dark" | "auto";   // ENUM type
  enabled_modules: ("core" | "analytics" | "notifications" | "reporting")[]; // TAG type
  ab_test_variant: "A" | "B";             // AB-TEST type
}

// Runtime Zod schemas for validation
const FLAGS_SCHEMA = {
  enable_new_dashboard: z.boolean().default(false),
  max_retries: z.number().min(1).max(10).default(3),
  api_endpoint: z.string().max(255).regex(/^https?:///).default("https://api.example.com"),
  theme_mode: z.enum(["light", "dark", "auto"]).default("auto"),
  enabled_modules: z.array(z.enum(["core", "analytics", "notifications", "reporting"])).min(1).max(4).default(["core"]),
  ab_test_variant: z.string().default("A") // Runtime logic handles A/B distribution
};`}
			title="Generated TypeScript Types and Schemas"
		/>
	</DocsPageSection>

	<DocsPageSection id="validation-behavior" title="Validation and Error Handling">
		<div class="grid gap-6 md:grid-cols-2">
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Schema Validation</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Runtime validation using Zod schemas</li>
					<li>Type coercion and default value handling</li>
					<li>Constraint validation (min/max, regex, enum values)</li>
					<li>Detailed error messages for invalid values</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Hash Validation</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Generated hash constants for schema integrity</li>
					<li>Compile-time detection of schema changes</li>
					<li>Prevents runtime errors from schema mismatches</li>
					<li>Ensures client-server schema synchronization</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="best-practices" title="Best Practices">
		<div class="space-y-4">
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Choosing the Right Type</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li><strong>BOOLEAN</strong>: Use for simple on/off features and kill switches</li>
					<li><strong>INTEGER</strong>: Use for numeric configs that need range validation</li>
					<li><strong>STRING</strong>: Use for text configs that may need format validation</li>
					<li><strong>ENUM</strong>: Use when you need to restrict to specific valid options</li>
					<li><strong>TAG</strong>: Use for multi-selection scenarios with validation</li>
					<li><strong>AB-TEST</strong>: Use for split testing and gradual rollouts</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Performance Considerations</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>All types have minimal runtime overhead</li>
					<li>AB-TEST uses deterministic hashing for consistent results</li>
					<li>ENUM and TAG types use efficient union type checking</li>
					<li>Schema validation happens only during flag updates</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>
</DocsPage>
