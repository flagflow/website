<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageRoundedBox from '$components/docs/DocsPageRoundedBox.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="TypeScript Schema Generation"
		>Automatic type-safe interfaces for your feature flags with complete client code</PageTitle
	>

	<DocsPageSection id="overview" title="TypeScript Integration Overview">
		<p class="mb-4">
			FlagFlow automatically generates complete TypeScript definitions for your feature flags,
			providing full type safety and IntelliSense support. The generated code includes type
			definitions, default values, hash constants, and ready-to-use client functions.
		</p>
		<div class="mb-4 rounded-lg bg-green-50 p-4">
			<p class="text-green-800">
				<strong>Zero Configuration:</strong> Simply download the generated TypeScript file and start
				using fully-typed feature flags in your application immediately.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="generated-content" title="What Gets Generated">
		<p class="mb-4">
			When you access <code>/type/typescript</code>, FlagFlow generates a complete TypeScript file
			containing:
		</p>
		<div class="grid gap-4 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Type Definitions</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Hierarchical TypeScript interfaces</li>
					<li>Union types for enums</li>
					<li>Array types for tags</li>
					<li>Readonly properties for immutability</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Runtime Objects</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Default value objects</li>
					<li>Hash constants for validation</li>
					<li>Group descriptor mappings</li>
					<li>Type-to-group associations</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Client Functions</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Basic fetch functions</li>
					<li>Factory functions</li>
					<li>Cached implementations</li>
					<li>Error handling utilities</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Complete Examples</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Ready-to-use code snippets</li>
					<li>Integration patterns</li>
					<li>Best practices</li>
					<li>Performance optimizations</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>

	<DocsPageSection id="type-mapping" title="Flag Type Mapping">
		<p class="mb-4">FlagFlow maps its internal flag types to appropriate TypeScript types:</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">FlagFlow Type</th>
						<th class="border border-gray-300 px-4 py-2 text-left">TypeScript Type</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Example</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2">BOOLEAN</td>
						<td class="border border-gray-300 px-4 py-2"><code>boolean</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>true | false</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">INTEGER</td>
						<td class="border border-gray-300 px-4 py-2"><code>number</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>42</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">STRING</td>
						<td class="border border-gray-300 px-4 py-2"><code>string</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>"hello world"</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">ENUM</td>
						<td class="border border-gray-300 px-4 py-2">Union Type</td>
						<td class="border border-gray-300 px-4 py-2"><code>"red" | "green" | "blue"</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">TAG</td>
						<td class="border border-gray-300 px-4 py-2">Array of Union</td>
						<td class="border border-gray-300 px-4 py-2"
							><code>("red" | "green" | "blue")[]</code></td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">AB-TEST</td>
						<td class="border border-gray-300 px-4 py-2"><code>string</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>"A" | "B"</code> (runtime)</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="example-generated-types" title="Example Generated Types">
		<p class="mb-4">
			Here's an example of the TypeScript types generated for a hierarchical flag structure:
		</p>
		<CodeBlock
			code={`// Generated TypeScript Definitions

// Root type for all flags
export type FlagFlow = {
  readonly enableNewFeature: boolean;
  readonly maxRetries: number;
  readonly theme: "light" | "dark" | "auto";
  readonly enabledFeatures: ("analytics" | "chat" | "notifications")[];
  readonly abTestVariant: string; // AB-TEST type
  readonly accounting: FlagFlow__Accounting;
};

// Nested group type
export type FlagFlow__Accounting = {
  readonly enableCurrencyExchange: boolean;
  readonly defaultCurrency: "USD" | "EUR" | "HUF";
  readonly huf: FlagFlow__Accounting__Huf;
};

// Deeply nested group type
export type FlagFlow__Accounting__Huf = {
  readonly exchangeRate: number;
  readonly allowExchange: boolean;
};

// Complete type mapping for all groups
export type FlagFlow_DescriptorTypeMap = {
  '#root': FlagFlow;
  'accounting': FlagFlow__Accounting;
  'accounting/huf': FlagFlow__Accounting__Huf;
};`}
			title="Generated Type Definitions"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Default Value Objects</h3>
		<CodeBlock
			code={`// Generated default value objects for runtime use
export const defaultFlagFlow: FlagFlow = {
  enableNewFeature: false,
  maxRetries: 3,
  theme: "auto",
  enabledFeatures: ["analytics"],
  abTestVariant: "A", // Default for AB-TEST
  accounting: defaultFlagFlow__Accounting,
};

export const defaultFlagFlow__Accounting: FlagFlow__Accounting = {
  enableCurrencyExchange: true,
  defaultCurrency: "USD",
  huf: defaultFlagFlow__Accounting__Huf,
};

export const defaultFlagFlow__Accounting__Huf: FlagFlow__Accounting__Huf = {
  exchangeRate: 380.5,
  allowExchange: false,
};`}
			title="Generated Default Values"
		/>
	</DocsPageSection>

	<DocsPageSection id="client-code" title="Generated Client Code">
		<p class="mb-4">
			The TypeScript file includes complete, ready-to-use client code with full type safety:
		</p>
		<CodeBlock
			code={`import axios from "axios";

import { flagFlow_Descriptors, FlagFlow_DescriptorTypeMap } from "./flagflowTypes";

const FLAGFLOW_BASE_URL = 'http://localhost:3000/flags';

// Basic fetch function with full type safety
export const fetchData = async <K extends keyof FlagFlow_DescriptorTypeMap>(
    key: K
): Promise<FlagFlow_DescriptorTypeMap[K]> => {
    const { uri, hash } = flagFlow_Descriptors[key];
    const { data } = await axios.get<FlagFlow_DescriptorTypeMap[K]>(
        FLAGFLOW_BASE_URL + uri, {
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
            'x-accept-flaggroup-hash': hash,
        }
    })
    return data
}

// Factory function for creating fetch functions
export const createFetchFunction = <K extends keyof FlagFlow_DescriptorTypeMap>(
    key: K
): (() => Promise<FlagFlow_DescriptorTypeMap[K]>) => () => fetchData(key);

// Cached fetch function with TTL support
export const createFetchFunctionWithCache = <K extends keyof FlagFlow_DescriptorTypeMap>(
    key: K,
    ttlSeconds: number = 60
) => {
    const fetchDataFn = createFetchFunction(key);
    let data: FlagFlow_DescriptorTypeMap[K] | undefined;
    let lastFetchTime: number = 0;
    return async (): Promise<FlagFlow_DescriptorTypeMap[K]> => {
        const now = Date.now();
        if (data && (now - lastFetchTime < ttlSeconds * 1000)) return data;

        data = await fetchDataFn();
        lastFetchTime = now;
        return data;
    }
}`}
			title="Generated Client Functions"
		/>
	</DocsPageSection>

	<DocsPageSection id="usage-examples" title="Usage Examples">
		<h3 class="mb-3 text-lg font-semibold">Basic Usage</h3>
		<CodeBlock
			code={`import { fetchData, FlagFlow } from './flagflowTypes';

// Fetch all root flags with full type safety
const flags: FlagFlow = await fetchData('#root');

// Access flags with IntelliSense support
if (flags.enableNewFeature) {
  console.log('New feature is enabled!');
}

// Type-safe enum access
console.log(\`Current theme: \${flags.theme}\`); // "light" | "dark" | "auto"

// Array type support
if (flags.enabledFeatures.includes('analytics')) {
  initializeAnalytics();
}

// Nested group access
const accountingFlags = await fetchData('accounting');
console.log(\`Exchange enabled: \${accountingFlags.enableCurrencyExchange}\`);`}
			title="Basic Flag Usage"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">With Caching</h3>
		<CodeBlock
			code={`import { createFetchFunctionWithCache } from './flagflowTypes';

// Create cached fetch function (30 second TTL)
const getCachedFlags = createFetchFunctionWithCache('#root', 30);

// Use in your application
async function checkFeatures() {
  const flags = await getCachedFlags(); // Uses cache if fresh
  
  return {
    showNewUI: flags.enableNewFeature,
    theme: flags.theme,
    maxRetries: flags.maxRetries
  };
}

// Multiple calls within 30 seconds use cached data
const features1 = await checkFeatures(); // Network request
const features2 = await checkFeatures(); // From cache
const features3 = await checkFeatures(); // From cache`}
			title="Cached Flag Usage"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">React Hook Example</h3>
		<CodeBlock
			code={`import React, { useState, useEffect } from 'react';
import { createFetchFunctionWithCache, FlagFlow } from './flagflowTypes';

// Create cached fetcher outside component
const getCachedFlags = createFetchFunctionWithCache('#root', 60);

export function useFeatureFlags() {
  const [flags, setFlags] = useState<FlagFlow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    
    getCachedFlags()
      .then(data => {
        if (mounted) {
          setFlags(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => { mounted = false; };
  }, []);

  return { flags, loading, error };
}

// Usage in component
function MyComponent() {
  const { flags, loading, error } = useFeatureFlags();
  
  if (loading) return <div>Loading flags...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!flags) return null;
  
  return (
    <div className={flags.theme}>
      {flags.enableNewFeature && <NewFeatureComponent />}
      <Analytics enabled={flags.enabledFeatures.includes('analytics')} />
    </div>
  );
}`}
			title="React Hook Integration"
		/>
	</DocsPageSection>

	<DocsPageSection id="generation-api" title="Generation API">
		<h3 class="mb-3 text-lg font-semibold">TypeScript Generation Endpoint</h3>
		<CodeBlock
			code={`# Get TypeScript definitions
curl http://localhost:3000/type/typescript

# Save to file
curl http://localhost:3000/type/typescript > flagflowTypes.ts

# Download as file attachment
curl http://localhost:3000/type/typescript?download=1`}
			title="API Usage"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">File Header Information</h3>
		<p class="mb-4">The generated file includes helpful metadata:</p>
		<CodeBlock
			code={`// This file is auto-generated by FlagFlow
// Generated at: 2024-08-10T14:30:25.123Z
// FlagFlow Version: 1.0.0
// Total Flags: 15
// Total Groups: 4
// 
// To regenerate this file:
// curl http://localhost:3000/type/typescript > flagflowTypes.ts
//
// ⚠️  Do not edit this file manually - changes will be lost!`}
			title="Generated File Header"
		/>
	</DocsPageSection>

	<DocsPageSection id="integration-patterns" title="Integration Patterns">
		<h3 class="mb-3 text-lg font-semibold">Application Initialization</h3>
		<CodeBlock
			code={`// flagService.ts
import { createFetchFunctionWithCache, FlagFlow } from './flagflowTypes';

class FlagService {
  private getCachedFlags = createFetchFunctionWithCache('#root', 300); // 5 minutes
  private flags: FlagFlow | null = null;
  
  async initialize(): Promise<void> {
    try {
      this.flags = await this.getCachedFlags();
      console.log('✅ Feature flags loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load feature flags:', error);
      throw error;
    }
  }
  
  isEnabled(feature: keyof FlagFlow): boolean {
    return this.flags?.[feature] === true;
  }
  
  getValue<K extends keyof FlagFlow>(key: K): FlagFlow[K] | null {
    return this.flags?.[key] || null;
  }
  
  async refresh(): Promise<void> {
    // Force refresh by creating new fetcher
    this.getCachedFlags = createFetchFunctionWithCache('#root', 300);
    await this.initialize();
  }
}

export const flagService = new FlagService();

// Initialize at app startup
flagService.initialize().catch(console.error);`}
			title="Service Pattern"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Environment-Specific Configuration</h3>
		<CodeBlock
			code={`// config.ts
const FLAGFLOW_URLS = {
  development: 'http://localhost:3000',
  staging: 'https://staging-flags.example.com',
  production: 'https://flags.example.com'
};

const environment = process.env.NODE_ENV || 'development';
export const FLAGFLOW_BASE_URL = FLAGFLOW_URLS[environment] + '/flags';

// flagService.ts - Updated with environment config
import { FLAGFLOW_BASE_URL } from './config';

// Override the generated base URL
const originalFetchData = fetchData;
export const fetchData = async <K extends keyof FlagFlow_DescriptorTypeMap>(
  key: K
): Promise<FlagFlow_DescriptorTypeMap[K]> => {
  const { uri, hash } = flagFlow_Descriptors[key];
  const { data } = await axios.get<FlagFlow_DescriptorTypeMap[K]>(
    FLAGFLOW_BASE_URL + uri, {
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'x-accept-flaggroup-hash': hash,
    }
  });
  return data;
};`}
			title="Environment Configuration"
		/>
	</DocsPageSection>

	<DocsPageSection id="best-practices" title="Best Practices">
		<h3 class="mb-3 text-lg font-semibold">Code Organization</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Keep generated file separate</strong> - Don't modify the generated TypeScript file
			</li>
			<li>
				<strong>Create wrapper services</strong> - Abstract flag access behind service interfaces
			</li>
			<li><strong>Use caching wisely</strong> - Balance freshness with performance needs</li>
			<li>
				<strong>Handle errors gracefully</strong> - Provide fallback behavior when flags are unavailable
			</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Type Safety Tips</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Leverage IntelliSense</strong> - Use IDE autocompletion for flag names and values
			</li>
			<li><strong>Type guards</strong> - Create type guards for runtime flag validation</li>
			<li><strong>Const assertions</strong> - Use 'as const' for flag group keys</li>
			<li><strong>Generic constraints</strong> - Constrain generic types to valid flag groups</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Performance Optimization</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Group-specific fetching</strong> - Fetch only needed flag groups</li>
			<li><strong>Appropriate cache TTLs</strong> - Balance freshness with request frequency</li>
			<li>
				<strong>Batch initialization</strong> - Load all required flags at application startup
			</li>
			<li><strong>Error boundary patterns</strong> - Isolate flag loading failures</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="troubleshooting-ts" title="Troubleshooting">
		<div class="space-y-4">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Type Errors After Schema Changes</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>
						Regenerate TypeScript definitions: <code>curl /type/typescript > flagflowTypes.ts</code>
					</li>
					<li>Clear TypeScript cache in your IDE</li>
					<li>Restart TypeScript language server</li>
					<li>Check for breaking changes in flag types</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Runtime Type Mismatches</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Verify hash validation is working (check 409 errors)</li>
					<li>Ensure you're using the latest generated types</li>
					<li>Check that default values match expected types</li>
					<li>Validate enum values are still valid</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Import/Module Issues</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Ensure flagflowTypes.ts is in the correct location</li>
					<li>Check TypeScript module resolution settings</li>
					<li>Verify file paths in import statements</li>
					<li>Check for circular dependency issues</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>
</DocsPage>
