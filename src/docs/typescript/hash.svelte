<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Hash-Based Schema Validation"
		>Ensuring type safety and cache consistency with SHA-1 hashing</PageTitle
	>

	<DocsPageSection id="overview" title="What is Hash Validation?">
		<p class="mb-4">
			FlagFlow implements a sophisticated hash-based validation system that ensures your client-side
			TypeScript types remain in sync with server-side flag schemas. This prevents runtime errors
			and provides automatic cache invalidation when flag schemas change.
		</p>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Core Concept:</strong> Each flag group has a unique SHA-1 hash based on its structure.
				When schemas change, hashes change, automatically invalidating outdated client code.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="how-it-works" title="How Hash Validation Works">
		<h3 class="mb-3 text-lg font-semibold">1. Hash Generation Process</h3>
		<p class="mb-4">FlagFlow generates SHA-1 hashes for each flag group using a combination of:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Flag names</strong> - The unique identifier for each flag</li>
			<li>
				<strong>Flag types</strong> - The TypeScript type signature (boolean, number, enum, etc.)
			</li>
			<li><strong>Hierarchical structure</strong> - Group organization and nesting</li>
			<li><strong>Schema details</strong> - Enum values, constraints, and validation rules</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">2. Hierarchical Group Hashing</h3>
		<p class="mb-4">
			Flags are organized hierarchically using forward slashes as separators. Each level gets its
			own hash:
		</p>
		<CodeBlock
			code={`// Example flag structure and their hashes
accounting/                    -> HASH_FLAGFLOW__ACCOUNTING
accounting/huf/                -> HASH_FLAGFLOW__ACCOUNTING__HUF
accounting/huf/allow_exchange  -> Individual flag in group

// Generated hash constants
export const HASH_FLAGFLOW = '2a3e205e597f33fd493563b6db4543a40e1ec986';
export const HASH_FLAGFLOW__ACCOUNTING = 'a004c5733c25be5995e918335aa777b1c5c0d4f4';
export const HASH_FLAGFLOW__ACCOUNTING__HUF = 'b12f456a789c012d345e678f901a234b567c890d';`}
			title="Hash Generation Example"
		/>

		<h3 class="mb-3 text-lg font-semibold">3. Client-Server Hash Exchange</h3>
		<p class="mb-4">The validation process uses HTTP headers for hash exchange:</p>
		<div class="overflow-x-auto">
			<table class="mb-4 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Header</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Direction</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Purpose</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm"
							>x-accept-flaggroup-hash</td
						>
						<td class="border border-gray-300 px-4 py-2">Client → Server</td>
						<td class="border border-gray-300 px-4 py-2">Expected hash from client's perspective</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">x-flaggroup-hash</td>
						<td class="border border-gray-300 px-4 py-2">Server → Client</td>
						<td class="border border-gray-300 px-4 py-2">Current hash from server's perspective</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="benefits" title="Key Benefits">
		<div class="grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Type Safety</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Prevents runtime type mismatches</li>
					<li>Catches schema changes at request time</li>
					<li>Ensures client code compatibility</li>
					<li>Eliminates silent type errors</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Automatic Cache Invalidation</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>No manual cache clearing needed</li>
					<li>Instant detection of schema changes</li>
					<li>Prevents stale data issues</li>
					<li>Automatic client updates</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Development Safety</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Early error detection</li>
					<li>Clear error messages</li>
					<li>Prevents production issues</li>
					<li>Team coordination made easy</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Performance</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Fast SHA-1 hash computation</li>
					<li>Minimal network overhead</li>
					<li>Efficient caching strategy</li>
					<li>Reduced unnecessary requests</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="implementation" title="Implementation in Client Code">
		<p class="mb-4">
			When you generate TypeScript definitions from FlagFlow, hash constants are automatically
			included for use in your client applications:
		</p>
		<CodeBlock
			code={`import axios from "axios";
import { flagFlow_Descriptors, FlagFlow_DescriptorTypeMap } from "./flagflowTypes";

const FLAGFLOW_BASE_URL = 'http://localhost:5173/flags';

export const fetchData = async <K extends keyof FlagFlow_DescriptorTypeMap>(
    key: K
): Promise<FlagFlow_DescriptorTypeMap[K]> => {
    const { uri, hash } = flagFlow_Descriptors[key];
    const { data } = await axios.get<FlagFlow_DescriptorTypeMap[K]>(
        FLAGFLOW_BASE_URL + uri, {
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
            'x-accept-flaggroup-hash': hash,  // <- Hash validation
        }
    })
    return data
}`}
			title="Generated Client Code with Hash Validation"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Hash Descriptor Map</h3>
		<p class="mb-4">
			The generated TypeScript includes a descriptor map that connects flag groups to their URIs and
			hashes:
		</p>
		<CodeBlock
			code={`export const flagFlow_Descriptors = {
    '#root': { 
        uri: '/', 
        hash: HASH_FLAGFLOW 
    },
    'accounting': { 
        uri: '/accounting', 
        hash: HASH_FLAGFLOW__ACCOUNTING 
    },
    'accounting/huf': { 
        uri: '/accounting/huf', 
        hash: HASH_FLAGFLOW__ACCOUNTING__HUF 
    }
} as const;`}
			title="Generated Hash Descriptors"
		/>
	</DocsPageSection>

	<DocsPageSection id="error-handling" title="Error Handling">
		<h3 class="mb-3 text-lg font-semibold">409 Conflict Response</h3>
		<p class="mb-4">
			When hashes don't match, FlagFlow returns a <code>409 Conflict</code> status with detailed information:
		</p>
		<CodeBlock
			code={`// Server response when hashes don't match
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": "Hash mismatch detected",
  "details": {
    "expected": "2a3e205e597f33fd493563b6db4543a40e1ec986",
    "actual": "3b4f306f608g44ge504674c7ec5654b51f2fd097",
    "group": "accounting/huf",
    "message": "Flag schema has changed. Please update your TypeScript definitions."
  }
}`}
			title="Hash Mismatch Error Response"
		/>

		<h3 class="mb-3 text-lg font-semibold">Client Error Handling</h3>
		<CodeBlock
			code={`export const fetchDataWithErrorHandling = async <K extends keyof FlagFlow_DescriptorTypeMap>(
    key: K
): Promise<FlagFlow_DescriptorTypeMap[K]> => {
    try {
        return await fetchData(key);
    } catch (error) {
        if (error.response?.status === 409) {
            console.error('🚨 Schema hash mismatch!');
            console.error('Please regenerate your TypeScript definitions:');
            console.error('curl http://localhost:5173/type/typescript > flagflowTypes.ts');
            throw new Error('Flag schema out of date. Please update TypeScript definitions.');
        }
        throw error;
    }
}`}
			title="Recommended Error Handling"
		/>
	</DocsPageSection>

	<DocsPageSection id="hash-api" title="Hash API Endpoints">
		<p class="mb-4">FlagFlow provides dedicated endpoints for working with hashes:</p>
		<div class="overflow-x-auto">
			<table class="mb-4 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Endpoint</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Response</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">GET /type/hash</td>
						<td class="border border-gray-300 px-4 py-2">Get hash map for all flag groups</td>
						<td class="border border-gray-300 px-4 py-2">JSON with group → hash mapping</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">GET /flags/[group]</td>
						<td class="border border-gray-300 px-4 py-2">Get flag values with hash validation</td>
						<td class="border border-gray-300 px-4 py-2">Flag data or 409 if hash mismatch</td>
					</tr>
				</tbody>
			</table>
		</div>

		<CodeBlock
			code={`// Get current hash map
curl http://localhost:5173/type/hash

// Response
{
  "#root": "2a3e205e597f33fd493563b6db4543a40e1ec986",
  "accounting": "a004c5733c25be5995e918335aa777b1c5c0d4f4",
  "accounting/huf": "b12f456a789c012d345e678f901a234b567c890d"
}`}
			title="Hash Map API Response"
		/>
	</DocsPageSection>

	<DocsPageSection id="best-practices" title="Best Practices">
		<h3 class="mb-3 text-lg font-semibold">Development Workflow</h3>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>
				<strong>Always use hash validation</strong> - Include hash headers in all flag requests
			</li>
			<li>
				<strong>Handle 409 errors gracefully</strong> - Provide clear error messages to developers
			</li>
			<li>
				<strong>Automate type regeneration</strong> - Set up scripts to update TypeScript definitions
			</li>
			<li>
				<strong>Monitor hash changes</strong> - Track when schemas change in your CI/CD pipeline
			</li>
		</ol>

		<h3 class="mb-3 text-lg font-semibold">Automation Scripts</h3>
		<CodeBlock
			code={`#!/bin/bash
# update-flagflow-types.sh

echo "🔄 Checking for FlagFlow schema changes..."

# Download current TypeScript definitions
curl -s http://localhost:5173/type/typescript > flagflowTypes.new.ts

# Compare with existing file
if ! cmp -s flagflowTypes.ts flagflowTypes.new.ts; then
    echo "📝 Schema changes detected, updating types..."
    mv flagflowTypes.new.ts flagflowTypes.ts
    echo "✅ TypeScript definitions updated!"
else
    echo "✅ No schema changes detected."
    rm flagflowTypes.new.ts
fi`}
			title="Automated Type Update Script"
		/>

		<h3 class="mb-3 text-lg font-semibold">CI/CD Integration</h3>
		<CodeBlock
			code={`# In your CI pipeline (e.g., GitHub Actions)
name: Check FlagFlow Schema
on: [push, pull_request]

jobs:
  check-flagflow:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Check FlagFlow schema sync
        run: |
          # Download current schema
          curl $FLAGFLOW_URL/type/typescript > current-schema.ts
          
          # Compare with committed version
          if ! cmp -s flagflowTypes.ts current-schema.ts; then
            echo "❌ FlagFlow schema out of sync!"
            echo "Run: curl $FLAGFLOW_URL/type/typescript > flagflowTypes.ts"
            exit 1
          fi
          
          echo "✅ FlagFlow schema is up to date"`}
			title="CI/CD Schema Validation"
		/>
	</DocsPageSection>

	<DocsPageSection id="troubleshooting" title="Troubleshooting">
		<div class="space-y-4">
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Frequent 409 Errors</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Check if flag schemas were recently modified</li>
					<li>Regenerate TypeScript definitions from <code>/type/typescript</code></li>
					<li>Verify you're connecting to the correct FlagFlow instance</li>
					<li>Clear any intermediate caches or proxies</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Hash Generation Issues</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Ensure flag names don't contain invalid characters</li>
					<li>Check for duplicate flag names in the same group</li>
					<li>Verify enum values are properly formatted</li>
					<li>Look for circular dependencies in flag hierarchies</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Client-Side Debugging</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Log hash values being sent in headers</li>
					<li>Compare client hash with server response</li>
					<li>Check network tab for actual HTTP headers</li>
					<li>Verify TypeScript definitions are properly imported</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>
</DocsPage>
