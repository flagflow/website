<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageRoundedBox from '$components/docs/DocsPageRoundedBox.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Flag Hierarchy">
		Organizing and structuring feature flags for better management and maintainability
	</PageTitle>

	<DocsPageSection id="overview" title="What is Flag Hierarchy?">
		<p class="mb-4">
			Flag hierarchy in FlagFlow allows you to organize feature flags in a nested, tree-like
			structure using forward slashes as separators. This organizational system helps manage large
			numbers of flags by grouping related functionality and creating logical namespaces.
		</p>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Key Concept:</strong> Hierarchical flags use path-like naming (e.g.,
				<code>ui/dashboard/new_layout</code>) to create organized, searchable, and maintainable flag
				structures.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="hierarchy-examples" title="Hierarchy Structure Examples">
		<p class="mb-4">
			Here are practical examples of how flag hierarchy can organize your feature flags:
		</p>

		<CodeBlock
			code={`// Feature-based hierarchy
ui/dashboard/new_layout: boolean
ui/dashboard/dark_mode: boolean
ui/sidebar/collapsible: boolean
ui/sidebar/quick_actions: boolean

// Service-based hierarchy
api/auth/oauth2_enabled: boolean
api/auth/session_timeout: number
api/payment/stripe_enabled: boolean
api/payment/max_retry_attempts: number

// Environment-specific hierarchy
experiments/checkout/ab_test_flow: "A" | "B"
experiments/pricing/discount_banner: boolean
experiments/search/ai_suggestions: boolean

// Team-based hierarchy
marketing/campaigns/holiday_banner: boolean
marketing/analytics/conversion_tracking: boolean
devops/monitoring/detailed_logging: boolean
devops/performance/cache_enabled: boolean`}
			title="Hierarchical Flag Organization"
		/>
	</DocsPageSection>

	<DocsPageSection id="pros-cons" title="Pros and Cons of Flag Hierarchy">
		<div class="grid gap-6 md:grid-cols-2">
			<div class="rounded-lg border border-green-200 bg-green-50 p-4">
				<h3 class="mb-3 text-lg font-semibold text-green-800">✅ Advantages</h3>
				<ul class="list-inside list-disc space-y-2 text-sm text-green-700">
					<li>
						<strong>Selective Access:</strong> You can access specific parts of the hierarchy without
						loading the entire flag set, improving performance
					</li>
					<li>
						<strong>Logical Grouping:</strong> Group related flags together for easier management
						and understanding (e.g., all UI flags under <code>ui/</code>)
					</li>
					<li>
						<strong>Clear Structure:</strong> Hierarchical paths show relationships and dependencies
						between features visually
					</li>
					<li>
						<strong>Easier Navigation:</strong> Tree-like structure makes finding specific flags faster
						in large codebases
					</li>
					<li>
						<strong>Team Organization:</strong> Different teams can own different branches of the hierarchy
						independently
					</li>
					<li>
						<strong>Bulk Operations:</strong> Apply changes or permissions to entire hierarchy branches
						at once
					</li>
				</ul>
			</div>
			<div class="rounded-lg border border-orange-200 bg-orange-50 p-4">
				<h3 class="mb-3 text-lg font-semibold text-orange-800">⚠️ Better to Avoid</h3>
				<ul class="list-inside list-disc space-y-2 text-sm text-orange-700">
					<li>
						<strong>Over-nesting:</strong> Keep hierarchies shallow (2-3 levels) to maintain simplicity
						and readability
					</li>
					<li>
						<strong>Inconsistent naming:</strong> Establish clear naming conventions early and document
						them for your team
					</li>
					<li>
						<strong>Premature organization:</strong> Start simple and evolve hierarchy as your flag usage
						patterns become clear
					</li>
					<li>
						<strong>Mixing organizational schemes:</strong> Choose one approach per branch (by feature,
						by team, etc.) and stick to it
					</li>
					<li>
						<strong>Frequent restructuring:</strong> Plan hierarchy changes carefully and communicate
						them well to minimize disruption
					</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="selective-access" title="Selective Access Benefits">
		<p class="mb-4">
			One of the key advantages of flag hierarchy is the ability to access specific portions of your
			flag tree without loading the entire configuration:
		</p>

		<CodeBlock
			code={`// Access only UI-related flags
const uiFlags = await flagClient.getFlags('ui');
// Returns: ui/dashboard/*, ui/sidebar/*, etc.

// Access only dashboard-specific flags  
const dashboardFlags = await flagClient.getFlags('ui/dashboard');
// Returns: ui/dashboard/new_layout, ui/dashboard/dark_mode

// Access a specific flag directly (constant from generated TS code)
const newLayout = await flagClient.getFlag('ui/dashboard/new_layout');

// Access multiple related flags efficiently
const experimentFlags = await flagClient.getFlags('experiments');
// Returns all experiment flags without loading API or UI flags`}
			title="Selective Flag Access"
		/>

		<div class="mt-4 rounded-lg bg-green-50 p-4">
			<h4 class="mb-2 text-lg font-semibold text-green-800">Performance Benefits</h4>
			<ul class="list-inside list-disc space-y-1 text-green-700">
				<li>Reduced network traffic by fetching only needed flag subsets</li>
				<li>Faster application startup when loading specific feature areas</li>
				<li>Lower memory usage by avoiding unused flag data</li>
				<li>Improved cache efficiency with targeted flag updates</li>
			</ul>
		</div>
	</DocsPageSection>

	<DocsPageSection id="grouping-strategies" title="Effective Grouping Strategies">
		<h3 class="mb-3 text-lg font-semibold">Recommended Grouping Approaches</h3>

		<div class="grid gap-6 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">By Application Area</h4>
				<CodeBlock
					code={`ui/header/search_enabled
ui/footer/social_links
api/auth/rate_limiting
api/database/connection_pool
notifications/email/enabled
notifications/push/badge_count`}
					title="Area-based Organization"
				/>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">By Team Ownership</h4>
				<CodeBlock
					code={`frontend/dashboard/widgets
frontend/mobile/responsive
backend/payments/processor
backend/analytics/tracking
devops/monitoring/alerts
devops/deployment/canary`}
					title="Team-based Organization"
				/>
			</DocsPageRoundedBox>
			<div class="rounded-lg border border-red-200 bg-red-50 p-4">
				<h4 class="mb-2 font-semibold text-red-800">❌ By Feature Lifecycle (Not Recommended)</h4>
				<div class="mb-2 rounded-lg bg-red-100 p-2">
					<p class="text-sm text-red-700">
						<strong>Obsolete approach:</strong> Organizing by lifecycle stages is not the proper way
						as it creates artificial boundaries that don't reflect actual feature relationships.
					</p>
				</div>
				<CodeBlock
					code={`# Avoid this pattern
stable/core/authentication
stable/billing/invoices
experimental/ai/suggestions
experimental/social/sharing
deprecated/legacy/old_ui
deprecated/v1/api_endpoints`}
					title="Lifecycle-based Organization (Don't Use)"
				/>
			</div>
			<div class="rounded-lg border border-red-200 bg-red-50 p-4">
				<h4 class="mb-2 font-semibold text-red-800">❌ By Environment Context (Not Recommended)</h4>
				<div class="mb-2 rounded-lg bg-red-100 p-2">
					<p class="text-sm text-red-700">
						<strong>Wrong approach:</strong> You should install one FlagFlow instance per environment
						rather than organizing flags by environment within a single instance.
					</p>
				</div>
				<CodeBlock
					code={`# Avoid this pattern - use separate FlagFlow instances instead
production/performance/caching
production/security/encryption
development/debug/logging
development/testing/mock_data
staging/integration/external_apis
staging/qa/feature_testing`}
					title="Environment-based Organization (Don't Use)"
				/>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="typescript-benefits" title="TypeScript Integration with Hierarchy">
		<p class="mb-4">
			FlagFlow's TypeScript integration provides full IntelliSense support for hierarchical flags.
			All flag path constants are automatically generated from your TypeScript interface:
		</p>

		<CodeBlock
			code={`// Generated TypeScript interface maintains hierarchy
export interface FLAGS {
  'ui/dashboard/new_layout': boolean;
  'ui/dashboard/dark_mode': boolean;
  'ui/sidebar/collapsible': boolean;
  'api/auth/oauth2_enabled': boolean;
  'api/auth/session_timeout': number;
  'experiments/checkout/ab_test_flow': "A" | "B";
}

// Type-safe flag access with autocompletion (constants from generated TS code)
const dashboardLayout = getFlagValue('ui/dashboard/new_layout');
//                                    ↑ Full IntelliSense support from FLAGS interface

// Bulk access with type safety (path prefixes from generated constants)
const uiFlags = getFlags('ui'); // Returns UI flags with correct types
const authFlags = getFlags('api/auth'); // Returns auth flags`}
			title="TypeScript Hierarchy Support"
		/>

		<div class="mt-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Generated Constants:</strong> All flag path strings like
				<code>'ui/dashboard/new_layout'</code>, <code>'api/auth/oauth2_enabled'</code>, etc. are
				automatically generated from your TypeScript FLAGS interface, ensuring type safety and
				preventing typos.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="best-practices" title="Hierarchy Best Practices">
		<div class="space-y-4">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">✅ Do's</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>
						<strong>Keep it shallow:</strong> Aim for 2-3 levels deep maximum for most use cases
					</li>
					<li>
						<strong>Use consistent naming:</strong> Establish naming conventions and stick to them
					</li>
					<li>
						<strong>Group by functionality:</strong> Related features should be in the same branch
					</li>
					<li><strong>Plan for growth:</strong> Design hierarchy with future expansion in mind</li>
					<li>
						<strong>Document structure:</strong> Maintain documentation of your hierarchy organization
					</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">❌ Don'ts</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>
						<strong>Avoid over-nesting:</strong> Don't create unnecessary depth for simple flags
					</li>
					<li>
						<strong>Don't use special characters:</strong> Stick to letters, numbers, and underscores
					</li>
					<li>
						<strong>Avoid ambiguous names:</strong> Each level should clearly indicate its purpose
					</li>
					<li>
						<strong>Don't mix organizational schemes:</strong> Be consistent within each branch
					</li>
					<li>
						<strong>Avoid frequent restructuring:</strong> Plan changes carefully to minimize disruption
					</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>

	<DocsPageSection id="migration-strategy" title="Hierarchy Migration Strategy">
		<p class="mb-4">
			When introducing hierarchy to existing flat flag structures or reorganizing existing
			hierarchies:
		</p>

		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>
				<strong>Plan the new structure:</strong> Design your target hierarchy before making changes
			</li>
			<li><strong>Create aliases:</strong> Maintain backward compatibility during transition</li>
			<li><strong>Gradual migration:</strong> Move flags in batches rather than all at once</li>
			<li><strong>Update documentation:</strong> Keep team informed of structure changes</li>
			<li><strong>Monitor usage:</strong> Ensure all applications adapt to the new structure</li>
			<li>
				<strong>Clean up aliases:</strong> Remove deprecated paths after migration is complete
			</li>
		</ol>

		<CodeBlock
			code={`// Example migration from flat to hierarchical structure

// Before: Flat structure
enable_dashboard_v2: boolean
enable_dark_mode: boolean
enable_sidebar_collapse: boolean
auth_oauth_enabled: boolean

// After: Hierarchical structure
ui/dashboard/v2_enabled: boolean
ui/theme/dark_mode: boolean  
ui/sidebar/collapsible: boolean
api/auth/oauth_enabled: boolean

// During migration: Support both (with aliases)
enable_dashboard_v2 → ui/dashboard/v2_enabled
enable_dark_mode → ui/theme/dark_mode`}
			title="Migration Example"
		/>
	</DocsPageSection>

	<DocsPageSection id="performance-considerations" title="Performance Considerations">
		<div class="grid gap-6 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Optimization Tips</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Load only required hierarchy branches</li>
					<li>Use caching for frequently accessed flag groups</li>
					<li>Implement lazy loading for deep hierarchies</li>
					<li>Monitor flag access patterns to optimize structure</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Monitoring Metrics</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Track which hierarchy branches are accessed most</li>
					<li>Monitor flag resolution times by depth</li>
					<li>Measure memory usage of loaded flag subsets</li>
					<li>Analyze network traffic patterns for hierarchy access</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>
</DocsPage>
