<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Zod Schema Validation"
		>Runtime type validation and parsing with automatically generated Zod schemas</PageTitle
	>

	<DocsPageSection id="overview" title="Zod Integration Overview">
		<p class="mb-4">
			FlagFlow automatically generates Zod schemas alongside TypeScript definitions, providing
			runtime type validation, parsing, and transformation capabilities. This ensures your feature
			flags are validated at runtime and provides robust error handling for external data sources.
		</p>
		<div class="mb-4 rounded-lg bg-purple-50 p-4">
			<p class="text-purple-800">
				<strong>Runtime Safety:</strong> Zod schemas provide compile-time TypeScript types AND runtime
				validation, catching type errors that static typing alone cannot prevent.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="zod-benefits" title="Why Use Zod with Feature Flags?">
		<div class="grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Runtime Validation</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Validates data from external APIs</li>
					<li>Catches malformed responses</li>
					<li>Ensures type consistency at runtime</li>
					<li>Prevents silent type coercion issues</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Data Transformation</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Automatic type coercion</li>
					<li>Default value application</li>
					<li>Data sanitization and cleaning</li>
					<li>Format normalization</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Error Handling</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Detailed validation error messages</li>
					<li>Field-level error reporting</li>
					<li>Safe parsing with fallbacks</li>
					<li>Graceful degradation options</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Development Experience</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>IntelliSense support</li>
					<li>Type inference from schemas</li>
					<li>Consistent with TypeScript types</li>
					<li>Zero configuration required</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="generated-schemas" title="Generated Zod Schemas">
		<p class="mb-4">
			FlagFlow generates complete Zod schemas that mirror your TypeScript types with runtime
			validation:
		</p>
		<CodeBlock
			code={`import { z } from 'zod';

// Generated Zod schemas with default values
export const FlagFlow__Accounting__Huf = z.object({
  exchangeRate: z.number().default(380.5),
  allowExchange: z.boolean().default(false),
});

export const FlagFlow__Accounting = z.object({
  enableCurrencyExchange: z.boolean().default(true),
  defaultCurrency: z.enum(["USD", "EUR", "HUF"]).default("USD"),
  huf: FlagFlow__Accounting__Huf,
});

export const FlagFlow = z.object({
  enableNewFeature: z.boolean().default(false),
  maxRetries: z.number().default(3),
  theme: z.enum(["light", "dark", "auto"]).default("auto"),
  enabledFeatures: z.array(z.enum(["analytics", "chat", "notifications"])).default(["analytics"]),
  abTestVariant: z.string().default("A"),
  accounting: FlagFlow__Accounting,
});

// TypeScript types inferred from Zod schemas
export type FlagFlow = z.infer<typeof FlagFlow>;
export type FlagFlow__Accounting = z.infer<typeof FlagFlow__Accounting>;
export type FlagFlow__Accounting__Huf = z.infer<typeof FlagFlow__Accounting__Huf>;`}
			title="Generated Zod Schemas"
		/>
	</DocsPageSection>

	<DocsPageSection id="zod-type-mapping" title="FlagFlow to Zod Type Mapping">
		<p class="mb-4">
			FlagFlow maps its internal types to appropriate Zod validators with built-in default values:
		</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">FlagFlow Type</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Zod Schema</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Example</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2">BOOLEAN</td>
						<td class="border border-gray-300 px-4 py-2"><code>z.boolean().default(value)</code></td
						>
						<td class="border border-gray-300 px-4 py-2"><code>z.boolean().default(false)</code></td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">INTEGER</td>
						<td class="border border-gray-300 px-4 py-2"><code>z.number().default(value)</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>z.number().default(42)</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">STRING</td>
						<td class="border border-gray-300 px-4 py-2"><code>z.string().default(value)</code></td>
						<td class="border border-gray-300 px-4 py-2"
							><code>z.string().default("hello")</code></td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">ENUM</td>
						<td class="border border-gray-300 px-4 py-2"
							><code>z.enum([...]).default(value)</code></td
						>
						<td class="border border-gray-300 px-4 py-2"
							><code>z.enum(["red", "blue"]).default("red")</code></td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">TAG</td>
						<td class="border border-gray-300 px-4 py-2"
							><code>z.array(z.enum([...])).default([])</code></td
						>
						<td class="border border-gray-300 px-4 py-2"
							><code>z.array(z.enum(["a", "b"])).default(["a"])</code></td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">AB-TEST</td>
						<td class="border border-gray-300 px-4 py-2"><code>z.string().default("A")</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>z.string().default("A")</code></td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="safe-parsing" title="Safe Parsing with Error Handling">
		<p class="mb-4">
			The primary advantage of Zod schemas is safe parsing - validating data and handling errors
			gracefully:
		</p>
		<CodeBlock
			code={`import { FlagFlow } from './flagflowZod';
import { fetchData } from './flagflowTypes';

// Safe parsing with error handling
export const fetchDataSafely = async <K extends keyof FlagFlow_DescriptorTypeMap>(
    key: K
): Promise<FlagFlow_DescriptorTypeMap[K]> => {
    const { uri, hash } = flagFlow_Descriptors[key];
    
    try {
        const { data } = await axios.get<FlagFlow_DescriptorTypeMap[K]>(
            FLAGFLOW_BASE_URL + uri, {
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'x-accept-flaggroup-hash': hash,
            }
        });

        // Validate the response using Zod schema
        const schema = getSchemaForKey(key); // Helper to get the right schema
        const result = schema.safeParse(data);
        
        if (result.success) {
            return result.data; // Fully validated and typed data
        } else {
            console.error('Flag validation failed:', result.error.format());
            // Return default values on validation failure
            return schema.parse({}); // Uses all default values
        }
        
    } catch (error) {
        console.error('Failed to fetch flags:', error);
        // Return defaults on network failure
        const schema = getSchemaForKey(key);
        return schema.parse({});
    }
}

// Helper function to get schema by key
function getSchemaForKey<K extends keyof FlagFlow_DescriptorTypeMap>(key: K) {
    const schemas = {
        '#root': FlagFlow,
        'accounting': FlagFlow__Accounting,
        'accounting/huf': FlagFlow__Accounting__Huf,
    } as const;
    
    return schemas[key];
}`}
			title="Safe Parsing Implementation"
		/>
	</DocsPageSection>

	<DocsPageSection id="validation-examples" title="Validation and Parsing Examples">
		<h3 class="mb-3 text-lg font-semibold">Basic Validation</h3>
		<CodeBlock
			code={`import { FlagFlow } from './flagflowZod';

// Validate complete flag object
const rawData = {
    enableNewFeature: true,
    maxRetries: "5", // String instead of number - Zod will coerce
    theme: "dark",
    enabledFeatures: ["analytics", "chat"],
    // Missing abTestVariant - will use default
    accounting: {
        enableCurrencyExchange: false,
        defaultCurrency: "EUR",
        huf: {
            exchangeRate: 385.2,
            allowExchange: true
        }
    }
};

// Parse and validate
const result = FlagFlow.safeParse(rawData);

if (result.success) {
    // result.data is fully typed and validated
    console.log('Max retries:', result.data.maxRetries); // 5 (coerced to number)
    console.log('AB test variant:', result.data.abTestVariant); // "A" (default)
    console.log('Theme:', result.data.theme); // "dark"
} else {
    // result.error contains detailed validation errors
    console.error('Validation errors:', result.error.format());
}`}
			title="Basic Validation Example"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Partial Updates with Zod</h3>
		<CodeBlock
			code={`import { FlagFlow } from './flagflowZod';

// Create partial schema for updates
const PartialFlagFlow = FlagFlow.partial();

// Update only specific fields
const update = {
    theme: "light",
    maxRetries: 10
};

const result = PartialFlagFlow.safeParse(update);

if (result.success) {
    // Merge with existing flags
    const currentFlags = await fetchData('#root');
    const updatedFlags = { ...currentFlags, ...result.data };
    console.log('Updated flags:', updatedFlags);
}

// Or use deepPartial for nested updates
const DeepPartialFlagFlow = FlagFlow.deepPartial();

const nestedUpdate = {
    accounting: {
        huf: {
            exchangeRate: 390.0
        }
    }
};

const nestedResult = DeepPartialFlagFlow.safeParse(nestedUpdate);`}
			title="Partial Updates"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Data Transformation</h3>
		<CodeBlock
			code={`import { FlagFlow } from './flagflowZod';

// Transform data during parsing
const FlagFlowWithTransform = FlagFlow.transform((data) => {
    return {
        ...data,
        // Add computed properties
        isDarkMode: data.theme === "dark",
        hasAnalytics: data.enabledFeatures.includes("analytics"),
        // Transform values
        maxRetriesString: data.maxRetries.toString(),
        // Add metadata
        _parsedAt: new Date().toISOString(),
    };
});

// Parse with transformation
const rawData = { /* flag data */ };
const result = FlagFlowWithTransform.safeParse(rawData);

if (result.success) {
    console.log('Is dark mode?', result.data.isDarkMode);
    console.log('Has analytics?', result.data.hasAnalytics);
    console.log('Parsed at:', result.data._parsedAt);
}`}
			title="Data Transformation"
		/>
	</DocsPageSection>

	<DocsPageSection id="error-handling-patterns" title="Error Handling Patterns">
		<h3 class="mb-3 text-lg font-semibold">Detailed Error Information</h3>
		<CodeBlock
			code={`import { FlagFlow } from './flagflowZod';

const invalidData = {
    enableNewFeature: "yes", // Should be boolean
    maxRetries: -5, // Invalid negative number
    theme: "purple", // Invalid enum value
    enabledFeatures: "analytics", // Should be array
};

const result = FlagFlow.safeParse(invalidData);

if (!result.success) {
    // Get formatted error details
    const errorDetails = result.error.format();
    
    console.error('Validation errors:');
    console.error('enableNewFeature:', errorDetails.enableNewFeature?._errors);
    console.error('maxRetries:', errorDetails.maxRetries?._errors);
    console.error('theme:', errorDetails.theme?._errors);
    console.error('enabledFeatures:', errorDetails.enabledFeatures?._errors);
    
    // Get flat list of all issues
    result.error.issues.forEach((issue) => {
        console.error(\`\${issue.path.join('.')}: \${issue.message}\`);
    });
    
    // Example output:
    // enableNewFeature: ["Expected boolean, received string"]
    // maxRetries: ["Number must be greater than or equal to 0"]
    // theme: ["Invalid enum value. Expected 'light' | 'dark' | 'auto', received 'purple'"]
    // enabledFeatures: ["Expected array, received string"]
}`}
			title="Error Details"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Graceful Fallback Strategy</h3>
		<CodeBlock
			code={`import { FlagFlow } from './flagflowZod';

export async function getFlagsWithFallback<K extends keyof FlagFlow_DescriptorTypeMap>(
    key: K,
    fallbackData?: Partial<FlagFlow_DescriptorTypeMap[K]>
): Promise<FlagFlow_DescriptorTypeMap[K]> {
    const schema = getSchemaForKey(key);
    
    try {
        // Try to fetch from server
        const serverData = await fetchData(key);
        const result = schema.safeParse(serverData);
        
        if (result.success) {
            return result.data;
        } else {
            console.warn('Server data validation failed, using fallback:', result.error.format());
        }
    } catch (error) {
        console.warn('Failed to fetch from server, using fallback:', error);
    }
    
    // Use fallback data or defaults
    const fallbackResult = schema.safeParse(fallbackData || {});
    
    if (fallbackResult.success) {
        return fallbackResult.data;
    } else {
        // Last resort: use all defaults
        console.error('Fallback data also invalid, using defaults');
        return schema.parse({}); // Will use all default values
    }
}

// Usage with custom fallback
const flags = await getFlagsWithFallback('#root', {
    enableNewFeature: true, // Override default
    theme: "dark"
});`}
			title="Fallback Strategy"
		/>
	</DocsPageSection>

	<DocsPageSection id="advanced-patterns" title="Advanced Zod Patterns">
		<h3 class="mb-3 text-lg font-semibold">Custom Validation Rules</h3>
		<CodeBlock
			code={`import { z } from 'zod';

// Extend generated schemas with custom validation
const EnhancedFlagFlow = FlagFlow.extend({
    // Add custom validation for maxRetries
    maxRetries: z.number()
        .min(1, "Must have at least 1 retry")
        .max(10, "Cannot exceed 10 retries")
        .default(3),
    
    // Add computed field with validation
    environment: z.enum(["development", "staging", "production"])
        .default("development"),
}).refine((data) => {
    // Cross-field validation
    if (data.environment === "production" && data.enableNewFeature) {
        return false; // New features shouldn't be enabled in prod
    }
    return true;
}, {
    message: "New features cannot be enabled in production",
    path: ["enableNewFeature"]
});

// Use enhanced schema
const result = EnhancedFlagFlow.safeParse(data);`}
			title="Custom Validation"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Schema Composition</h3>
		<CodeBlock
			code={`import { z } from 'zod';

// Create reusable schema pieces
const TimestampMixin = z.object({
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

const EnvironmentMixin = z.object({
    environment: z.enum(["dev", "staging", "prod"]).default("dev"),
    version: z.string().default("1.0.0"),
});

// Compose with generated schema
const ExtendedFlagFlow = FlagFlow
    .merge(TimestampMixin)
    .merge(EnvironmentMixin)
    .transform((data) => ({
        ...data,
        // Add computed properties
        isProduction: data.environment === "prod",
        displayName: \`Flags v\${data.version} (\${data.environment})\`,
    }));

type ExtendedFlagFlow = z.infer<typeof ExtendedFlagFlow>;`}
			title="Schema Composition"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Async Validation</h3>
		<CodeBlock
			code={`import { z } from 'zod';

// Create schema with async validation
const FlagFlowWithAsyncValidation = FlagFlow.refine(async (data) => {
    // Validate against external service
    if (data.abTestVariant) {
        try {
            const response = await fetch(\`/api/validate-variant/\${data.abTestVariant}\`);
            return response.ok;
        } catch {
            return false;
        }
    }
    return true;
}, {
    message: "Invalid AB test variant",
    path: ["abTestVariant"]
});

// Use async parsing
export async function parseWithAsyncValidation(data: unknown) {
    try {
        const result = await FlagFlowWithAsyncValidation.parseAsync(data);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error };
    }
}`}
			title="Async Validation"
		/>
	</DocsPageSection>

	<DocsPageSection id="integration-examples" title="Integration Examples">
		<h3 class="mb-3 text-lg font-semibold">React Hook with Zod</h3>
		<CodeBlock
			code={`import React, { useState, useEffect } from 'react';
import { FlagFlow } from './flagflowZod';

export function useValidatedFlags() {
    const [flags, setFlags] = useState<z.infer<typeof FlagFlow> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<any>(null);

    useEffect(() => {
        let mounted = true;

        async function loadFlags() {
            try {
                const rawData = await fetchData('#root');
                const result = FlagFlow.safeParse(rawData);
                
                if (!mounted) return;
                
                if (result.success) {
                    setFlags(result.data);
                    setValidationErrors(null);
                } else {
                    console.error('Flag validation failed:', result.error.format());
                    setValidationErrors(result.error.format());
                    // Use defaults on validation failure
                    const defaultData = FlagFlow.parse({});
                    setFlags(defaultData);
                }
                
                setError(null);
            } catch (err) {
                if (!mounted) return;
                
                setError(err instanceof Error ? err.message : 'Unknown error');
                // Use defaults on fetch failure
                const defaultData = FlagFlow.parse({});
                setFlags(defaultData);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadFlags();
        return () => { mounted = false; };
    }, []);

    return { flags, loading, error, validationErrors };
}

// Usage in component
function FlagAwareComponent() {
    const { flags, loading, error, validationErrors } = useValidatedFlags();
    
    if (loading) return <div>Loading flags...</div>;
    
    if (error && !flags) {
        return <div>Error loading flags: {error}</div>;
    }
    
    if (validationErrors) {
        console.warn('Using default flags due to validation errors:', validationErrors);
    }
    
    return (
        <div className={flags?.theme || 'auto'}>
            <h1>Feature Flags Status</h1>
            <p>New feature enabled: {flags?.enableNewFeature ? 'Yes' : 'No'}</p>
            <p>Max retries: {flags?.maxRetries}</p>
            <p>Theme: {flags?.theme}</p>
            {validationErrors && (
                <div className="warning">
                    Some flag values were invalid and defaults are being used.
                </div>
            )}
        </div>
    );
}`}
			title="React Hook with Validation"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Express.js Middleware</h3>
		<CodeBlock
			code={`import express from 'express';
import { FlagFlow } from './flagflowZod';

// Middleware to validate and attach flags to request
export function flagValidationMiddleware() {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            // Fetch flags for this request context
            const rawFlags = await fetchData('#root');
            const result = FlagFlow.safeParse(rawFlags);
            
            if (result.success) {
                // Attach validated flags to request
                req.flags = result.data;
            } else {
                console.error('Flag validation failed:', result.error.format());
                // Use defaults and log validation issues
                req.flags = FlagFlow.parse({});
                req.flagValidationErrors = result.error.format();
            }
            
            next();
        } catch (error) {
            console.error('Failed to load flags:', error);
            // Continue with defaults
            req.flags = FlagFlow.parse({});
            req.flagError = error;
            next();
        }
    };
}

// Usage in Express app
const app = express();
app.use(flagValidationMiddleware());

app.get('/api/data', (req, res) => {
    // req.flags is now typed and validated
    if (req.flags.enableNewFeature) {
        return res.json({ data: 'new feature data' });
    }
    
    res.json({ data: 'legacy data' });
});

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            flags: z.infer<typeof FlagFlow>;
            flagValidationErrors?: any;
            flagError?: any;
        }
    }
}`}
			title="Express.js Middleware"
		/>
	</DocsPageSection>

	<DocsPageSection id="zod-api" title="Zod Generation API">
		<h3 class="mb-3 text-lg font-semibold">Zod Schema Endpoint</h3>
		<CodeBlock
			code={`# Get Zod schemas
curl http://localhost:5173/type/zod

# Save to file
curl http://localhost:5173/type/zod > flagflowZod.ts

# Download as file attachment
curl http://localhost:5173/type/zod?download=1`}
			title="API Usage"
		/>

		<p class="mt-4 mb-4">
			The Zod file includes all necessary imports and is ready to use alongside the TypeScript
			definitions:
		</p>
		<CodeBlock
			code={`// Generated Zod file header
import { z } from 'zod';

// This file is auto-generated by FlagFlow
// Generated at: 2024-08-10T14:30:25.123Z
// Zod version: ^3.22.0
// 
// To regenerate this file:
// curl http://localhost:5173/type/zod > flagflowZod.ts
//
// ⚠️  Do not edit this file manually - changes will be lost!

// Install required dependency: npm install zod`}
			title="Generated File Header"
		/>
	</DocsPageSection>

	<DocsPageSection id="best-practices-zod" title="Best Practices">
		<h3 class="mb-3 text-lg font-semibold">Performance Considerations</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Use safeParse() for validation</strong> - Avoid throwing exceptions in normal flow
			</li>
			<li><strong>Cache parsed results</strong> - Don't re-validate the same data repeatedly</li>
			<li><strong>Validate at boundaries</strong> - Parse external data, trust internal data</li>
			<li><strong>Use partial schemas for updates</strong> - Don't validate unchanged data</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Error Handling</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Provide meaningful fallbacks</strong> - Don't fail completely on validation errors
			</li>
			<li><strong>Log validation issues</strong> - Help debug schema mismatches</li>
			<li><strong>Use error boundaries</strong> - Isolate validation failures</li>
			<li><strong>Monitor validation failures</strong> - Track schema drift over time</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Schema Management</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Keep schemas simple</strong> - Complex validation can hurt performance</li>
			<li><strong>Version your schemas</strong> - Handle breaking changes gracefully</li>
			<li><strong>Test validation logic</strong> - Unit test edge cases and error conditions</li>
			<li><strong>Document custom validations</strong> - Explain business rules in code</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="troubleshooting-zod" title="Troubleshooting">
		<div class="space-y-4">
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Zod Import Errors</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Install Zod dependency: <code>npm install zod</code></li>
					<li>Verify Zod version compatibility (^3.22.0 recommended)</li>
					<li>Check TypeScript configuration for proper module resolution</li>
					<li>Ensure the generated file path is correct</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Validation Performance Issues</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Use <code>safeParse()</code> instead of <code>parse()</code> to avoid exceptions</li>
					<li>Cache validation results to avoid re-parsing identical data</li>
					<li>Consider using <code>strict()</code> mode to fail fast on unknown properties</li>
					<li>Profile validation hot paths and optimize complex schemas</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Type Inference Issues</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Ensure TypeScript version is compatible (4.5+ recommended)</li>
					<li>Use <code>z.infer&lt;typeof Schema&gt;</code> for type extraction</li>
					<li>Avoid circular references in schema definitions</li>
					<li>Check for conflicts between TypeScript and Zod types</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>
</DocsPage>
