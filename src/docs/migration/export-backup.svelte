<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Export and Backup"
		>Create comprehensive backups of your feature flags and configuration</PageTitle
	>

	<DocsPageSection id="overview" title="Export Overview">
		<p class="mb-4">
			FlagFlow's export functionality allows you to create complete backups of your feature flag
			configuration, including schemas, values, and metadata. These exports serve multiple purposes:
			creating backups, migrating between environments, and maintaining version control of your flag
			configurations.
		</p>
		<div class="mb-4 rounded-lg bg-green-50 p-4">
			<p class="text-green-800">
				<strong>Complete Data Export:</strong> The export includes all flag definitions, schemas, current
				values, default values, and type-specific constraints in a single JSON file.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="what-gets-exported" title="What Gets Exported">
		<p class="mb-4">
			When you export your FlagFlow configuration, the system creates a comprehensive snapshot
			containing:
		</p>
		<div class="grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Flag Definitions</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>All flag names and hierarchical structure</li>
					<li>Flag types (BOOLEAN, INTEGER, STRING, etc.)</li>
					<li>Flag descriptions and documentation</li>
					<li>Default values for each flag</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Schema Information</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Type-specific constraints and validation rules</li>
					<li>Enum values and available options</li>
					<li>Min/max values for numeric flags</li>
					<li>String length limits and regex patterns</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Current Values</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Active flag values (if set)</li>
					<li>Value existence status</li>
					<li>AB-test configurations</li>
					<li>Tag selections and arrays</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Metadata</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Environment identifier</li>
					<li>FlagFlow version information</li>
					<li>Export timestamp</li>
					<li>File format version</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="export-methods" title="How to Export">
		<h3 class="mb-3 text-lg font-semibold">Web Interface Export</h3>
		<p class="mb-4">The easiest way to create an export is through the FlagFlow web interface:</p>
		<ol class="mb-6 list-inside list-decimal space-y-2">
			<li>Navigate to the <strong>Migration</strong> page in your FlagFlow instance</li>
			<li>Locate the <strong>Export</strong> section at the top of the page</li>
			<li>Click the <strong>Download Export</strong> button</li>
			<li>Your browser will download a JSON file with the current timestamp</li>
		</ol>

		<h3 class="mb-3 text-lg font-semibold">API Export</h3>
		<p class="mb-4">You can also export programmatically using the REST API:</p>
		<p class="mb-4 rounded-lg bg-blue-50 p-4 text-blue-800">
			<strong>Note:</strong> Export functionality is available without authentication - anyone with network
			access to your FlagFlow instance can download configuration exports.
		</p>
		<CodeBlock
			code={`# Direct download via curl
curl -O http://localhost:3000/migration/export

# Save to specific filename
curl -o my-backup-$(date +%Y%m%d).json \\
     http://localhost:3000/migration/export`}
			title="API Export Commands"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Automated Backup Scripts</h3>
		<CodeBlock
			code={`#!/bin/bash
# automated-backup.sh

FLAGFLOW_URL="http://localhost:3000"
BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y%m%d-%H%M%S)
ENVIRONMENT="production"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Download backup with timestamp
FILENAME="flagflow_backup_{ENVIRONMENT}_{DATE}.json"
curl -s "$FLAGFLOW_URL/migration/export" -o "$BACKUP_DIR/$FILENAME"

if [ $? -eq 0 ]; then
    echo "✅ Backup created successfully: $FILENAME"
    # Optional: Clean up old backups (keep last 30 days)
    find "$BACKUP_DIR" -name "flagflow_backup_*.json" -mtime +30 -delete
else
    echo "❌ Backup failed!"
    exit 1
fi`}
			title="Automated Backup Script"
		/>
	</DocsPageSection>

	<DocsPageSection id="file-format" title="Export File Format">
		<p class="mb-4">
			FlagFlow exports create JSON files with a standardized structure that includes all necessary
			information for backup and migration purposes:
		</p>
		<CodeBlock
			code={`{
  "environment": "production",
  "version": "1.0.0",
  "createdAt": "2024-08-10T14:30:25.123Z",
  "flags": {
    "enable_new_feature": {
      "description": "Enable the new dashboard feature",
      "type": "BOOLEAN",
      "defaultValue": false,
      "valueExists": true,
      "value": true
    },
    "max_retries": {
      "description": "Maximum number of retry attempts",
      "type": "INTEGER", 
      "defaultValue": 3,
      "valueExists": true,
      "value": 5,
      "minValue": 1,
      "maxValue": 10
    },
    "theme_selection": {
      "description": "UI theme options",
      "type": "ENUM",
      "defaultValue": "auto",
      "valueExists": false,
      "enumValues": ["light", "dark", "auto"]
    },
    "enabled_features": {
      "description": "List of enabled feature modules",
      "type": "TAG",
      "defaultValue": ["core"],
      "valueExists": true,
      "value": ["core", "analytics", "notifications"],
      "enumValues": ["core", "analytics", "notifications", "chat"],
      "minCount": 1,
      "maxCount": 4
    },
    "ab_test_experiment": {
      "description": "A/B test for new checkout flow",
      "type": "AB-TEST",
      "defaultValue": "A",
      "valueExists": true,
      "value": "B",
      "chancePercentB": 25.0
    }
  }
}`}
			title="Export File Structure"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">File Naming Convention</h3>
		<p class="mb-4">
			Export files follow a consistent naming pattern that includes environment and timestamp
			information:
		</p>
		<CodeBlock
			code={`# Naming pattern
flagflow_migration_{ENVIRONMENT}_{YYYYMMDD-HHMMSS}.json

# Examples
flagflow_migration_production_20240810-143025.json
flagflow_migration_staging_20240810-143025.json
flagflow_migration_development_20240810-143025.json`}
			title="File Naming Examples"
		/>
	</DocsPageSection>

	<DocsPageSection id="flag-types-detail" title="Flag Type Export Details">
		<p class="mb-4">
			Different flag types include specific properties in the export file to preserve all
			configuration details:
		</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Flag Type</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Additional Properties</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Example Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2">BOOLEAN</td>
						<td class="border border-gray-300 px-4 py-2">None (simple true/false)</td>
						<td class="border border-gray-300 px-4 py-2"><code>true</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">INTEGER</td>
						<td class="border border-gray-300 px-4 py-2"
							><code>minValue</code>, <code>maxValue</code></td
						>
						<td class="border border-gray-300 px-4 py-2"><code>42</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">STRING</td>
						<td class="border border-gray-300 px-4 py-2">
							<code>maxLength</code>, <code>regexPattern</code>
						</td>
						<td class="border border-gray-300 px-4 py-2"><code>"hello world"</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">ENUM</td>
						<td class="border border-gray-300 px-4 py-2"><code>enumValues</code> array</td>
						<td class="border border-gray-300 px-4 py-2"><code>"option1"</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">TAG</td>
						<td class="border border-gray-300 px-4 py-2">
							<code>enumValues</code>, <code>minCount</code>, <code>maxCount</code>
						</td>
						<td class="border border-gray-300 px-4 py-2"><code>["tag1", "tag2"]</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">AB-TEST</td>
						<td class="border border-gray-300 px-4 py-2"><code>chancePercentB</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>"A"</code> or <code>"B"</code></td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="backup-strategies" title="Backup Strategies">
		<h3 class="mb-3 text-lg font-semibold">Regular Automated Backups</h3>
		<p class="mb-4">
			Set up automated backups to ensure you always have recent copies of your flag configurations:
		</p>
		<CodeBlock
			code={`# Add to crontab for daily backups at 2 AM
0 2 * * * /path/to/automated-backup.sh

# Weekly backups with rotation
0 2 * * 0 /path/to/weekly-backup.sh

# Pre-deployment backups
# Add to your CI/CD pipeline before deployments
curl -o "backup-pre-deploy-$(date +%Y%m%d-%H%M%S).json" \\
     "$FLAGFLOW_URL/migration/export"`}
			title="Cron Backup Examples"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Environment-Specific Backup Plans</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Production:</strong> Daily automated backups with 30-day retention
			</li>
			<li>
				<strong>Staging:</strong> Weekly backups before major testing cycles
			</li>
			<li>
				<strong>Development:</strong> Manual backups before experimental changes
			</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Backup Verification</h3>
		<CodeBlock
			code={`#!/bin/bash
# verify-backup.sh - Verify backup file integrity

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Check if file is valid JSON
if jq empty "$BACKUP_FILE" 2>/dev/null; then
    echo "✅ Valid JSON format"
else
    echo "❌ Invalid JSON format"
    exit 1
fi

# Check required fields
ENVIRONMENT=$(jq -r '.environment' "$BACKUP_FILE")
VERSION=$(jq -r '.version' "$BACKUP_FILE")
FLAG_COUNT=$(jq '.flags | length' "$BACKUP_FILE")

echo "📊 Backup Summary:"
echo "   Environment: $ENVIRONMENT"
echo "   Version: $VERSION"
echo "   Flag Count: $FLAG_COUNT"

if [ "$FLAG_COUNT" -gt 0 ]; then
    echo "✅ Backup verification successful"
else
    echo "❌ No flags found in backup"
    exit 1
fi`}
			title="Backup Verification Script"
		/>
	</DocsPageSection>

	<DocsPageSection id="storage-recommendations" title="Storage and Security">
		<h3 class="mb-3 text-lg font-semibold">Storage Recommendations</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Local Storage:</strong> Keep recent backups on the same server for quick recovery
			</li>
			<li>
				<strong>Remote Storage:</strong> Upload to cloud storage (AWS S3, Google Cloud, etc.) for disaster
				recovery
			</li>
			<li>
				<strong>Version Control:</strong> Consider storing exports in Git repositories for change tracking
			</li>
			<li>
				<strong>Multiple Locations:</strong> Store copies in different geographic locations
			</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Security Considerations</h3>
		<div class="mb-4 rounded-lg bg-yellow-50 p-4">
			<h4 class="mb-2 text-lg font-semibold text-yellow-800">Important Security Notes</h4>
			<ul class="list-inside list-disc space-y-2 text-yellow-700">
				<li>
					<strong>Access Control:</strong> Limit who can create and access backup files
				</li>
				<li>
					<strong>Encryption:</strong> Encrypt backup files if they contain sensitive configuration
				</li>
				<li>
					<strong>Network Security:</strong> Use HTTPS for API-based exports
				</li>
				<li>
					<strong>Audit Trail:</strong> Log all export operations for security auditing
				</li>
			</ul>
		</div>

		<CodeBlock
			code={`# Encrypt backup files
gpg --cipher-algo AES256 --compress-algo 1 --symmetric \\
    --output backup.json.gpg backup.json

# Upload to secure storage
aws s3 cp backup.json.gpg s3://my-flagflow-backups/ \\
    --server-side-encryption AES256

# Decrypt when needed
gpg --decrypt backup.json.gpg > restored-backup.json`}
			title="Backup Encryption Example"
		/>
	</DocsPageSection>

	<DocsPageSection id="troubleshooting-export" title="Troubleshooting">
		<div class="space-y-4">
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Export Download Fails</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Check that FlagFlow service is running and accessible</li>
					<li>Verify network connectivity to the FlagFlow instance</li>
					<li>Ensure you have proper permissions for export operations</li>
					<li>Check server logs for any etcd connectivity issues</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Large Export Files</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Export files grow with the number of flags and complexity</li>
					<li>Consider implementing flag archiving for unused flags</li>
					<li>Use compression when storing large backup files</li>
					<li>Monitor disk space for automated backup directories</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Corrupted Export Files</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Always verify JSON validity after downloading exports</li>
					<li>Use checksums or file integrity checks for important backups</li>
					<li>Keep multiple backup versions to avoid single points of failure</li>
					<li>Test backup restoration regularly in non-production environments</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="next-steps" title="Next Steps">
		<p class="mb-4">After creating your backup export files, you can use them for:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Environment Migration:</strong> Transfer flag configurations between different FlagFlow
				environments
			</li>
			<li>
				<strong>Disaster Recovery:</strong> Restore your flag configuration after system failures
			</li>
			<li>
				<strong>Configuration Versioning:</strong> Track changes to your flag setup over time
			</li>
			<li>
				<strong>Testing:</strong> Create isolated test environments with production flag configurations
			</li>
		</ul>
		<p class="text-sm text-gray-600">
			Learn more about using these exports in the
			<a class="text-blue-600 hover:underline" href="/docs/migration/migration">Migration</a> and
			<a class="text-blue-600 hover:underline" href="/docs/migration/restore">Restore</a> documentation.
		</p>
	</DocsPageSection>
</DocsPage>
