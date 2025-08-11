<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageRoundedBox from '$components/docs/DocsPageRoundedBox.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Access Flags">
		Retrieving feature flags and flag groups through various access methods and formats
	</PageTitle>

	<DocsPageSection id="overview" title="Flag Access Overview">
		<p class="mb-4">
			FlagFlow provides flexible access to feature flags through multiple methods and formats. All
			flag reading operations are publicly accessible without authentication, making integration
			simple while maintaining security for administrative operations.
		</p>
		<div class="mb-4 rounded-lg bg-green-50 p-4">
			<p class="text-green-800">
				<strong>Open Access:</strong> Flag values can be read freely by any application or service that
				can reach your FlagFlow instance, enabling easy integration without credential management.
			</p>
		</div>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Hierarchical Access:</strong> Use flag hierarchy to access specific portions of your
				flag tree without loading unnecessary data. See
				<a class="text-blue-600 hover:underline" href="/docs/flags/hierarchy">Flag Hierarchy</a>
				for organizational strategies.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="single-flag-access" title="Single Flag Access">
		<p class="mb-4">
			Access individual flags using the flag name as the URL path. FlagFlow supports multiple output
			formats to suit different integration needs:
		</p>

		<h3 class="mb-3 text-lg font-semibold">JSON Format</h3>
		<p class="mb-4">Returns the flag value in hierarchical JSON structure:</p>
		<CodeBlock
			code={`# Request
GET http://localhost:3000/flag/accounting/huf/ff_allow_exchange

# Response
{
  "accounting": {
    "huf": {
      "ff_allow_exchange": false
    }
  }
}`}
			title="JSON Flag Access"
		/>

		<h3 class="mb-3 text-lg font-semibold">Environment Variable Format</h3>
		<p class="mb-4">Returns flag value in environment variable format:</p>
		<CodeBlock
			code={`# Request
GET http://localhost:3000/flag/accounting/huf/ff_allow_exchange?format=env

# Response
accounting/huf/ff_allow_exchange=false`}
			title="Environment Variable Format"
		/>

		<h3 class="mb-3 text-lg font-semibold">Plain Value Format</h3>
		<p class="mb-4">Returns only the flag value as plain text:</p>
		<CodeBlock
			code={`# Request
GET http://localhost:3000/flag/accounting/huf/ff_allow_exchange?format=plain

# Response
false`}
			title="Plain Value Format"
		/>
	</DocsPageSection>

	<DocsPageSection id="flag-group-access" title="Flag Group Access">
		<p class="mb-4">
			Access multiple related flags by specifying a hierarchy prefix. This is particularly useful
			for loading all flags within a specific feature area or organizational boundary.
		</p>

		<h3 class="mb-3 text-lg font-semibold">JSON Group Format</h3>
		<p class="mb-4">
			Returns all flag values within a hierarchy as structured JSON (only contains the subset under
			the requested path):
		</p>
		<CodeBlock
			code={`# Request - Access all UI flags
GET http://localhost:3000/flags/ui

# Response
{
  "dashboard": {
    "new_layout": true,
    "dark_mode": false,
    "widget_count": 6
  }
}`}
			title="JSON Group Access Example"
		/>

		<h3 class="mb-3 text-lg font-semibold">Environment Variable Group Format</h3>
		<p class="mb-4">Returns all flags in the group as environment variables:</p>
		<CodeBlock
			code={`# Request
GET http://localhost:3000/flags/ui?format=env

# Response
ui/dashboard/new_layout=true
ui/dashboard/dark_mode=false
ui/dashboard/widget_count=6`}
			title="Environment Variable Group Format"
		/>
	</DocsPageSection>

	<DocsPageSection id="url-structure" title="URL Structure and Examples">
		<p class="mb-4">FlagFlow uses predictable URL patterns for flag access:</p>

		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Access Type</th>
						<th class="border border-gray-300 px-4 py-2 text-left">URL Pattern</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Example URL</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2">Single Flag</td>
						<td class="border border-gray-300 px-4 py-2">
							<code>/flag/[flag_name][?format=json|env|plain]</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="text-sm"
								>http://localhost:3000/flag/accounting/huf/ff_allow_exchange</code
							>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">Flag Group</td>
						<td class="border border-gray-300 px-4 py-2">
							<code>/flags/[prefix][?format=json|env]</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="text-sm">http://localhost:3000/flags/ui</code>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">All Flags</td>
						<td class="border border-gray-300 px-4 py-2">
							<code>/flags[?format=json|env]</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="text-sm">http://localhost:3000/flags</code>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3 class="mb-3 text-lg font-semibold">Common Group Access Examples</h3>
		<CodeBlock
			code={`# Access all UI-related flags
http://localhost:3000/flags/ui

# Access all API configuration flags
http://localhost:3000/flags/api

# Access all authentication flags
http://localhost:3000/flags/api/auth

# Access all experimental features
http://localhost:3000/flags/experiments

# Access all flags in environment variable format
http://localhost:3000/flags?format=env`}
			title="Group Access URL Examples"
		/>
	</DocsPageSection>

	<DocsPageSection id="integration-examples" title="Integration Examples">
		<h3 class="mb-3 text-lg font-semibold">JavaScript/TypeScript Integration</h3>
		<CodeBlock
			code={`// Fetch a single flag
const response = await fetch('http://localhost:3000/flag/accounting/huf/ff_allow_exchange');
const flagData = await response.json();
const isEnabled = flagData.accounting.huf.ff_allow_exchange;

// Fetch flag group
const groupResponse = await fetch('http://localhost:3000/flags/ui');
const uiFlags = await groupResponse.json();
// uiFlags = { "dashboard": { "new_layout": true, "dark_mode": false, "widget_count": 6 } }

// Using environment variable format for configuration
const envResponse = await fetch('http://localhost:3000/flags/api?format=env');
const envVars = await envResponse.text();
// Parse and set environment variables as needed`}
			title="JavaScript Flag Access"
		/>

		<h3 class="mb-3 text-lg font-semibold">Shell Script Integration</h3>
		<CodeBlock
			code={`#!/bin/bash

# Get a single flag value
ALLOW_EXCHANGE=$(curl -s http://localhost:3000/flag/accounting/huf/ff_allow_exchange?format=plain)

if [ "$ALLOW_EXCHANGE" = "true" ]; then
    echo "Currency exchange allowed"
else
    echo "Currency exchange disabled"
fi

# Load all environment flags as variables (note: paths with slashes in env format)
eval $(curl -s "http://localhost:3000/flags/deployment?format=env")
echo "Deployment timeout: $deployment_timeout"
echo "Max retries: $deployment_max_retries"`}
			title="Shell Script Integration"
		/>

		<h3 class="mb-3 text-lg font-semibold">Docker Container Integration</h3>
		<CodeBlock
			code={`# Dockerfile - Load environment variables from FlagFlow
FROM node:18-alpine

# Install curl for flag fetching
RUN apk add --no-cache curl

# Create startup script
RUN echo '#!/bin/sh' > /startup.sh && \
    echo 'eval $(curl -s "$FLAGFLOW_URL/flags/app?format=env")' >> /startup.sh && \
    echo 'exec "$@"' >> /startup.sh && \
    chmod +x /startup.sh

ENTRYPOINT ["/startup.sh"]
CMD ["npm", "start"]

# Usage:
# docker run -e FLAGFLOW_URL=http://flagflow:3000 myapp`}
			title="Docker Integration"
		/>
	</DocsPageSection>

	<DocsPageSection id="performance-optimization" title="Performance and Optimization">
		<div class="grid gap-6 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Efficient Access Patterns</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Use group access to reduce HTTP requests</li>
					<li>Fetch only needed hierarchy branches</li>
					<li>Cache flag values with appropriate TTL</li>
					<li>Use environment variable format for simple configs</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Caching Strategies</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>HTTP caching headers are included in responses</li>
					<li>Implement client-side caching with refresh intervals</li>
					<li>Use ETags for conditional requests</li>
					<li>Consider real-time updates via WebSocket for critical flags</li>
				</ul>
			</DocsPageRoundedBox>
		</div>

		<div class="mt-4 rounded-lg bg-yellow-50 p-4">
			<h4 class="mb-2 text-lg font-semibold text-yellow-800">Best Practices</h4>
			<ul class="list-inside list-disc space-y-1 text-yellow-700">
				<li>
					<strong>Graceful Degradation:</strong> Always handle cases where FlagFlow is unreachable
				</li>
				<li>
					<strong>Default Values:</strong> Use sensible defaults when flag values are unavailable
				</li>
				<li>
					<strong>Error Handling:</strong> Implement proper error handling for network failures
				</li>
				<li><strong>Monitoring:</strong> Monitor flag access patterns and performance</li>
			</ul>
		</div>
	</DocsPageSection>

	<DocsPageSection id="related-documentation" title="Related Documentation">
		<p class="mb-4">Explore these related topics for comprehensive FlagFlow usage:</p>
		<div class="grid gap-4 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">
					<a class="text-blue-600 hover:underline" href="/docs/flags/flag-types"> Flag Types </a>
				</h4>
				<p class="text-sm text-gray-600">
					Understand different flag types and their constraints to properly handle returned values.
				</p>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">
					<a class="text-blue-600 hover:underline" href="/docs/flags/hierarchy"> Flag Hierarchy </a>
				</h4>
				<p class="text-sm text-gray-600">
					Learn how to organize flags hierarchically for efficient group access and management.
				</p>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">
					<a class="text-blue-600 hover:underline" href="/docs/typescript/ts-schema">
						TypeScript Schema
					</a>
				</h4>
				<p class="text-sm text-gray-600">
					Generate type-safe clients for accessing flags with full IntelliSense support.
				</p>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">
					<a class="text-blue-600 hover:underline" href="/docs/user-management/authentication">
						Authentication
					</a>
				</h4>
				<p class="text-sm text-gray-600">
					Understand which operations require authentication versus public flag reading access.
				</p>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>
</DocsPage>
