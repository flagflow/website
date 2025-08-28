<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageRoundedBox from '$components/docs/DocsPageRoundedBox.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Flag Types">
		Understanding FlagFlow's comprehensive flag type system for different use cases
	</PageTitle>

	<DocsPageSection id="overview" title="Overview">
		<p class="mb-4">
			FlagFlow supports 7 different flag types, each designed for specific use cases and providing
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
							<code class="bg-indigo-100 font-mono text-sm">OBJECT</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							Complex structured data with JavaScript object syntax. Supports nested objects,
							arrays, and complex type definitions with schema validation. Perfect for configuration
							objects, nested settings, API payloads, and any structured data requirements.
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">{'{ server: string; port: number }'}</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">{'{ server: "api.example.com", port: 8080 }'}</code>
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
							<code class="font-mono text-sm">OBJECT</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code>objectSchema</code> (JavaScript object syntax)
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm"
								>objectSchema: "{'{ server: string, port: number }'}"</code
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
  api_config: {                           // OBJECT type
    server: string;
    port: number;
    timeout: number;
  };
  ab_test_variant: "A" | "B";             // AB-TEST type
}

// Runtime Zod schemas for validation
const FLAGS_SCHEMA = {
  enable_new_dashboard: z.boolean().default(false),
  max_retries: z.number().min(1).max(10).default(3),
  api_endpoint: z.string().max(255).regex(/^https?:///).default("https://api.example.com"),
  theme_mode: z.enum(["light", "dark", "auto"]).default("auto"),
  enabled_modules: z.array(z.enum(["core", "analytics", "notifications", "reporting"])).min(1).max(4).default(["core"]),
  api_config: z.object({                  // OBJECT type with schema
    server: z.string(),
    port: z.number(),
    timeout: z.number()
  }).default({
    server: "api.example.com",
    port: 8080,
    timeout: 5000
  }),
  ab_test_variant: z.string().default("A") // Runtime logic handles A/B distribution
};`}
			title="Generated TypeScript Types and Schemas"
		/>
	</DocsPageSection>

	<DocsPageSection id="validation-behavior" title="Validation and Error Handling">
		<div class="grid gap-6 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Schema Validation</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Runtime validation using Zod schemas</li>
					<li>Type coercion and default value handling</li>
					<li>Constraint validation (min/max, regex, enum values)</li>
					<li>Detailed error messages for invalid values</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Hash Validation</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Generated hash constants for schema integrity</li>
					<li>Compile-time detection of schema changes</li>
					<li>Prevents runtime errors from schema mismatches</li>
					<li>Ensures client-server schema synchronization</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>

	<DocsPageSection id="object-flags-detail" title="Object Flags Deep Dive">
		<p class="mb-4">
			Object flags represent FlagFlow's most powerful flag type, supporting complex structured data
			with full TypeScript integration and runtime validation. They use JavaScript object syntax for
			schema definition and support nested objects, arrays, and all primitive types.
		</p>

		<h4 class="mb-3 text-lg font-semibold">JavaScript Object Syntax</h4>
		<p class="mb-4">
			Object flags use familiar JavaScript object syntax for schema definition, making them
			intuitive for developers:
		</p>
		<CodeBlock
			code={`// Simple object schema
{ server: string, port: number }

// Database configuration with optional properties
{
  database: {
    host: string,
    port: number,
    name: string,
    ssl?: boolean,
    timeout: number
  }
}

// API configuration with nested settings
{
  api: {
    endpoint: string,
    timeout: number,
    retries: number,
    headers: { [key: string]: string }
  },
  cache: {
    enabled: boolean,
    ttl: number,
    providers: ("memory" | "redis" | "disk")[]
  }
}`}
			title="Object Schema Examples"
		/>

		<h4 class="mt-6 mb-3 text-lg font-semibold">Type Generation and Validation</h4>
		<p class="mb-4">
			FlagFlow automatically generates TypeScript interfaces and Zod schemas for object flags,
			providing complete type safety and runtime validation:
		</p>
		<CodeBlock
			code={`// Generated TypeScript interface
export interface DatabaseConfig {
  database: {
    host: string;
    port: number;
    name: string;
    ssl?: boolean;
    timeout: number;
  };
}

// Generated Zod schema
const DatabaseConfigSchema = z.object({
  database: z.object({
    host: z.string(),
    port: z.number(),
    name: z.string(),
    ssl: z.boolean().optional(),
    timeout: z.number()
  })
});

// Usage with full type safety
const config: DatabaseConfig = FLAGS.database_config;
console.log(config.database.host);     // TypeScript IntelliSense available
console.log(config.database.port);     // Number type fully validated`}
			title="Generated Types and Usage"
		/>

		<h4 class="mt-6 mb-3 text-lg font-semibold">Practical Use Cases</h4>
		<div class="space-y-4">
			<DocsPageRoundedBox>
				<h5 class="mb-2 font-semibold">Service Configuration</h5>
				<CodeBlock
					code={`{
  redis: {
    host: string,
    port: number,
    password: string,
    database: number
  },
  api: {
    baseUrl: string,
    timeout: number,
    retries: number
  }
}`}
				/>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h5 class="mb-2 font-semibold">Feature Settings</h5>
				<CodeBlock
					code={`{
  email: {
    provider: "smtp" | "sendgrid" | "ses",
    host: string,
    port: number,
    secure: boolean
  },
  logging: {
    level: "error" | "warn" | "info" | "debug",
    destinations: string[]
  }
}`}
				/>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>

	<DocsPageSection id="best-practices" title="Best Practices">
		<div class="space-y-4">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Choosing the Right Type</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li><strong>BOOLEAN</strong>: Use for simple on/off features and kill switches</li>
					<li><strong>INTEGER</strong>: Use for numeric configs that need range validation</li>
					<li><strong>STRING</strong>: Use for text configs that may need format validation</li>
					<li>
						<strong>OBJECT</strong>: Use for complex structured data, nested configurations, and API
						payloads
					</li>
					<li><strong>ENUM</strong>: Use when you need to restrict to specific valid options</li>
					<li><strong>TAG</strong>: Use for multi-selection scenarios with validation</li>
					<li><strong>AB-TEST</strong>: Use for split testing and gradual rollouts</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Performance Considerations</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>All types have minimal runtime overhead</li>
					<li>AB-TEST uses deterministic hashing for consistent results</li>
					<li>ENUM and TAG types use efficient union type checking</li>
					<li>OBJECT types use optimized parsing with comprehensive validation</li>
					<li>Schema validation happens only during flag updates</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>
</DocsPage>
