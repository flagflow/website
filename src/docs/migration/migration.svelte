<script lang="ts">
	import { resolve } from '$app/paths';
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageRoundedBox from '$components/docs/DocsPageRoundedBox.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Cross-Environment Migration"
		>Transfer feature flag configurations between different FlagFlow environments</PageTitle
	>

	<DocsPageSection id="overview" title="Migration Overview">
		<p class="mb-4">
			FlagFlow's migration system enables you to transfer feature flag configurations between
			different environments, such as promoting flags from development to staging or from staging to
			production. The system intelligently compares flag configurations and generates specific
			migration steps to synchronize environments safely.
		</p>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Smart Migration:</strong> The system analyzes differences between source and target environments
				and generates only the necessary steps to bring them into sync, preserving existing configurations
				where appropriate.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="migration-types" title="Migration Types">
		<div class="grid gap-4 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">File-Based Migration</h3>
				<p class="mb-3 text-gray-600">Upload an export file from another environment</p>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Use exported JSON files from source environment</li>
					<li>Full control over what gets migrated</li>
					<li>Works across network boundaries</li>
					<li>Suitable for air-gapped environments</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Remote Migration</h3>
				<p class="mb-3 text-gray-600">Direct connection to another FlagFlow instance</p>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Real-time fetching from source environment</li>
					<li>Always gets the latest configuration</li>
					<li>Requires network connectivity</li>
					<li>Streamlined one-step process</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>

	<DocsPageSection id="migration-steps" title="Migration Step Types">
		<p class="mb-4">
			FlagFlow analyzes the differences between source and target environments and generates
			specific migration steps:
		</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Step Type</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Purpose</th>
						<th class="border border-gray-300 px-4 py-2 text-left">When Generated</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">CREATE_DEFAULTVALUE</td>
						<td class="border border-gray-300 px-4 py-2">Create new flag with default value</td>
						<td class="border border-gray-300 px-4 py-2">Flag exists in source but not target</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm"
							>UPDATE_SCHEMA_DEFAULTVALUE</td
						>
						<td class="border border-gray-300 px-4 py-2">Update flag schema, reset to default</td>
						<td class="border border-gray-300 px-4 py-2">Flag type or schema changed</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">SET_VALUE</td>
						<td class="border border-gray-300 px-4 py-2">Set specific value for existing flag</td>
						<td class="border border-gray-300 px-4 py-2">Flag value differs between environments</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">DELETE</td>
						<td class="border border-gray-300 px-4 py-2"
							>Remove flag that doesn't exist in source</td
						>
						<td class="border border-gray-300 px-4 py-2">Flag exists in target but not source</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="file-migration" title="File-Based Migration">
		<h3 class="mb-3 text-lg font-semibold">Step 1: Export from Source Environment</h3>
		<p class="mb-4">
			First, create an export from your source environment (e.g., development or staging):
		</p>
		<CodeBlock
			code={`# Export from source environment
curl -O http://staging.flagflow.com/migration/export

# This creates a file like:
# flagflow_migration_staging_20240810-143025.json`}
			title="Export from Source"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Step 2: Upload to Target Environment</h3>
		<p class="mb-4">In your target environment's FlagFlow interface:</p>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Navigate to the <strong>Migration</strong> page</li>
			<li>Locate the <strong>File-based Migration</strong> section</li>
			<li>Click <strong>Choose File</strong> and select your exported JSON file</li>
			<li>Click <strong>Analyze Migration</strong> to generate migration steps</li>
		</ol>

		<h3 class="mb-3 text-lg font-semibold">Step 3: Review and Execute Migration Steps</h3>
		<p class="mb-4">The migration executor will show you all the changes that will be made:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Environment flow indicator showing source → target</li>
			<li>Complete list of migration steps with checkboxes</li>
			<li>Dependencies between steps shown with indentation</li>
			<li>Option to include or exclude value-setting steps</li>
		</ul>

		<div class="mb-4 rounded-lg bg-yellow-50 p-4">
			<p class="text-yellow-800">
				<strong>Default Behavior:</strong> Migrations exclude SET_VALUE steps by default, meaning only
				schemas are migrated. You can optionally include value migrations using the "Add value steps"
				button.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="remote-migration" title="Remote Migration">
		<h3 class="mb-3 text-lg font-semibold">Configuration</h3>
		<p class="mb-4">
			To enable remote migration, configure the source environment URL in your target environment:
		</p>
		<CodeBlock
			code={`# Environment variables for target environment
MIGRATION_SOURCE_URL=http://staging.flagflow.com
MIGRATION_SOURCE_ENVIRONMENT=staging

# Other standard configuration
ENVIRONMENT=production
LOGLEVEL=info`}
			title="Remote Migration Configuration"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Using Remote Migration</h3>
		<p class="mb-4">
			When properly configured, remote migration provides a streamlined experience:
		</p>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Navigate to the <strong>Migration</strong> page in your target environment</li>
			<li>You'll see a <strong>Remote Migration</strong> section with your configured source</li>
			<li>Click <strong>Fetch and Analyze</strong> to retrieve the latest configuration</li>
			<li>Review and execute the generated migration steps</li>
		</ol>

		<div class="mb-4 rounded-lg bg-green-50 p-4">
			<p class="text-green-800">
				<strong>Real-time Sync:</strong> Remote migration always fetches the latest configuration from
				the source, ensuring you're migrating the most current flag states.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="migration-validation" title="Validation and Safety">
		<h3 class="mb-3 text-lg font-semibold">Pre-Migration Validation</h3>
		<p class="mb-4">FlagFlow performs comprehensive validation before allowing migration:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Environment Check:</strong> Ensures source and target environments are different
			</li>
			<li><strong>File Format:</strong> Validates JSON structure and required fields</li>
			<li><strong>Flag Schema:</strong> Validates all flag types and constraints</li>
			<li><strong>Flag Values:</strong> Ensures values match their respective schemas</li>
			<li><strong>Dependencies:</strong> Checks that all step dependencies can be satisfied</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Step Dependencies</h3>
		<p class="mb-4">Some migration steps depend on others and are automatically ordered:</p>
		<CodeBlock
			code={`Example migration with dependencies:

1. DELETE old_feature_flag
   └── 2. CREATE_DEFAULTVALUE new_feature_flag  (depends on #1)
       └── 3. SET_VALUE new_feature_flag = true (depends on #2)

4. UPDATE_SCHEMA_DEFAULTVALUE max_connections
   └── 5. SET_VALUE max_connections = 100      (depends on #4)`}
			title="Step Dependency Example"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Rollback Considerations</h3>
		<div class="mb-4 rounded-lg bg-red-50 p-4">
			<p class="text-red-800">
				<strong>Important:</strong> FlagFlow migrations are not automatically reversible. Always create
				a backup of your target environment before performing migrations, especially in production.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="migration-strategies" title="Migration Strategies">
		<h3 class="mb-3 text-lg font-semibold">Schema-Only Migration</h3>
		<p class="mb-4">
			The default migration approach transfers only flag schemas and structures, not values:
		</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Ensures consistent flag definitions across environments</li>
			<li>Preserves environment-specific value configurations</li>
			<li>Safer for production deployments</li>
			<li>Allows gradual value updates after schema migration</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Full Migration (Schema + Values)</h3>
		<p class="mb-4">Use the "Add value steps" option to include value migrations:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Completely synchronizes environments</li>
			<li>Useful for replicating testing configurations</li>
			<li>May override important environment-specific settings</li>
			<li>Requires careful review before execution</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Selective Migration</h3>
		<p class="mb-4">Choose which migration steps to execute:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Uncheck steps you don't want to execute</li>
			<li>Migrate only specific flags or changes</li>
			<li>Useful for gradual rollouts or testing</li>
			<li>Dependencies must still be satisfied</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="common-scenarios" title="Common Migration Scenarios">
		<h3 class="mb-3 text-lg font-semibold">Development → Staging</h3>
		<CodeBlock
			code={`# Scenario: Promote new feature flags to staging
# Steps typically generated:

1. CREATE_DEFAULTVALUE new_feature_toggle (BOOLEAN)
2. CREATE_DEFAULTVALUE feature_rollout_percent (INTEGER) 
3. CREATE_DEFAULTVALUE supported_regions (TAG)

# Values are NOT migrated by default
# Staging team can set appropriate values for their environment`}
			title="Dev to Staging Migration"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Staging → Production</h3>
		<CodeBlock
			code={`# Scenario: Promote tested features to production
# More careful approach with schema-only migration

1. UPDATE_SCHEMA_DEFAULTVALUE existing_feature (new enum values)
2. CREATE_DEFAULTVALUE production_ready_feature (BOOLEAN)
3. DELETE experimental_flag (removed in staging)

# Production values remain unchanged
# Operations team sets production-appropriate values`}
			title="Staging to Production Migration"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Hotfix Deployment</h3>
		<CodeBlock
			code={`# Scenario: Emergency flag changes across environments
# Include values for immediate effect

1. CREATE_DEFAULTVALUE emergency_circuit_breaker (BOOLEAN)
2. SET_VALUE emergency_circuit_breaker = true

# Execute immediately with values to enable circuit breaker`}
			title="Hotfix Migration"
		/>
	</DocsPageSection>

	<DocsPageSection id="best-practices" title="Best Practices">
		<h3 class="mb-3 text-lg font-semibold">Pre-Migration</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Create Backup:</strong> Always export current target environment configuration first
			</li>
			<li><strong>Review Changes:</strong> Carefully examine all generated migration steps</li>
			<li><strong>Test First:</strong> Run migrations on development/staging before production</li>
			<li><strong>Communication:</strong> Notify team members of planned migrations</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">During Migration</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Selective Execution:</strong> Consider excluding value-setting steps initially
			</li>
			<li><strong>Monitor Dependencies:</strong> Ensure all required steps are selected</li>
			<li><strong>Verify Steps:</strong> Double-check critical flag changes</li>
			<li><strong>Gradual Rollout:</strong> Consider migrating flags in phases</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Post-Migration</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Verification:</strong> Confirm all flags migrated correctly</li>
			<li>
				<strong>Value Configuration:</strong> Set appropriate values for the target environment
			</li>
			<li><strong>Testing:</strong> Validate application behavior with new flag configurations</li>
			<li><strong>Documentation:</strong> Update team documentation with changes</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="troubleshooting-migration" title="Troubleshooting">
		<div class="space-y-4">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Environment Validation Errors</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Check that source and target environments have different names</li>
					<li>Verify ENVIRONMENT variable is set correctly in both environments</li>
					<li>Ensure export file contains the expected environment identifier</li>
					<li>Confirm remote URL points to a different environment</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Step Dependency Issues</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>All dependent steps must be selected for execution</li>
					<li>Check for missing or unselected prerequisite steps</li>
					<li>Review step ordering and dependencies in the UI</li>
					<li>Ensure DELETE steps come before CREATE steps for the same flag</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Migration Execution Failures</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Check etcd connectivity and permissions</li>
					<li>Verify user has 'migration' permission</li>
					<li>Look for conflicts with existing flag values</li>
					<li>Check server logs for detailed error messages</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Remote Migration Connection Issues</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Verify MIGRATION_SOURCE_URL is reachable from target environment</li>
					<li>Check network connectivity and firewall rules</li>
					<li>Ensure source FlagFlow instance is running and responsive</li>
					<li>Validate URL format and protocol (HTTP/HTTPS)</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>

	<DocsPageSection id="migration-automation" title="Automation and CI/CD Integration">
		<h3 class="mb-3 text-lg font-semibold">Automated Migration Scripts</h3>
		<CodeBlock
			code={`#!/bin/bash
# automated-migration.sh
# Automate flag migrations in CI/CD pipelines

SOURCE_ENV="staging"
TARGET_ENV="production"
BACKUP_DIR="/tmp/flagflow-backups"

echo "🚀 Starting automated migration: $SOURCE_ENV → $TARGET_ENV"

# Step 1: Create backup of target environment
echo "📦 Creating backup of $TARGET_ENV..."
mkdir -p "$BACKUP_DIR"
BACKUP_FILE="$BACKUP_DIR/pre-migration-backup-$(date +%Y%m%d-%H%M%S).json"
curl -s "http://$TARGET_ENV.flagflow.com/migration/export" -o "$BACKUP_FILE"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Failed to create backup"
    exit 1
fi

echo "✅ Backup created: $BACKUP_FILE"

# Step 2: Fetch source configuration
echo "📥 Fetching source configuration from $SOURCE_ENV..."
SOURCE_FILE="$BACKUP_DIR/source-config-$(date +%Y%m%d-%H%M%S).json"
curl -s "http://$SOURCE_ENV.flagflow.com/migration/export" -o "$SOURCE_FILE"

if [ ! -f "$SOURCE_FILE" ]; then
    echo "❌ Failed to fetch source configuration"
    exit 1
fi

echo "✅ Source configuration fetched: $SOURCE_FILE"

# Step 3: Validate files
echo "🔍 Validating configuration files..."
jq empty "$BACKUP_FILE" && jq empty "$SOURCE_FILE"
if [ $? -ne 0 ]; then
    echo "❌ Invalid JSON in configuration files"
    exit 1
fi

echo "✅ Configuration files validated"
echo "🎯 Migration ready. Upload $SOURCE_FILE to $TARGET_ENV manually or via API"
echo "🔄 Backup available at: $BACKUP_FILE"`}
			title="Automated Migration Preparation"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">CI/CD Pipeline Integration</h3>
		<CodeBlock
			code={`# GitHub Actions example
name: Deploy Feature Flags
on:
  push:
    branches: [main]

jobs:
  migrate-flags:
    runs-on: ubuntu-latest
    steps:
      - name: Backup Production Flags
        run: |
          curl -o prod-backup-$(date +%Y%m%d).json \\
            {{ secrets.PROD_FLAGFLOW_URL }}/migration/export
      
      - name: Export Staging Flags  
        run: |
          curl -o staging-export.json \\
            {{ secrets.STAGING_FLAGFLOW_URL }}/migration/export
      
      - name: Upload Migration Artifacts
        uses: actions/upload-artifact@v2
        with:
          name: migration-files
          path: |
            prod-backup-*.json
            staging-export.json
      
      # Manual approval step before production migration
      - name: Wait for Approval
        uses: trstringer/manual-approval@v1
        with:
          secret: {{ github.TOKEN }}
          approvers: production-team
          
      # Note: Actual migration execution should be done manually
      # or through a separate secure process`}
			title="CI/CD Pipeline Example"
		/>
	</DocsPageSection>

	<DocsPageSection id="next-steps" title="Next Steps">
		<p class="mb-4">After completing a migration, consider these follow-up actions:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Configure Values:</strong> Set appropriate flag values for the target environment
			</li>
			<li>
				<strong>Test Applications:</strong> Verify that applications work correctly with migrated flags
			</li>
			<li>
				<strong>Update Documentation:</strong> Document any environment-specific flag configurations
			</li>
			<li>
				<strong>Plan Rollbacks:</strong> Keep backups ready in case rollback is needed
			</li>
		</ul>
		<p class="text-sm text-gray-600">
			For restoring from backups within the same environment, see the
			<a class="text-blue-600 hover:underline" href={resolve('/docs/migration/restore', {})}
				>Restore</a
			>
			documentation. For creating backups, see the
			<a class="text-blue-600 hover:underline" href={resolve('/docs/migration/export-backup', {})}
				>Export and Backup</a
			>
			documentation.
		</p>
	</DocsPageSection>
</DocsPage>
