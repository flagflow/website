<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Restore from Backup"
		>Restore feature flag configurations from backup files within the same environment</PageTitle
	>

	<DocsPageSection id="overview" title="Restore Overview">
		<p class="mb-4">
			FlagFlow's restore functionality allows you to recover your feature flag configuration from
			previously created backup files within the same environment. Unlike cross-environment
			migration, restore operations work within a single environment to recover from data loss,
			configuration errors, or to roll back changes.
		</p>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Same-Environment Restore:</strong> Restore operations are designed for disaster recovery
				within the same environment. For transferring configurations between different environments,
				use the Migration functionality instead.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="restore-vs-migration" title="Restore vs Migration">
		<p class="mb-4">
			Understanding the difference between restore and migration operations is crucial for using the
			right tool for your needs:
		</p>
		<div class="grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Restore Operation</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Works within the same environment</li>
					<li>Used for disaster recovery and rollbacks</li>
					<li>Replaces current configuration completely</li>
					<li>Source and target environment must match</li>
					<li>Simpler validation and fewer safety checks</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Migration Operation</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Works between different environments</li>
					<li>Used for promoting changes across stages</li>
					<li>Analyzes differences and creates specific steps</li>
					<li>Source and target environments must be different</li>
					<li>Comprehensive validation and dependency checking</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="when-to-use-restore" title="When to Use Restore">
		<h3 class="mb-3 text-lg font-semibold">Common Restore Scenarios</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Data Loss Recovery:</strong> Restore after etcd data corruption or accidental deletion
			</li>
			<li>
				<strong>Configuration Rollback:</strong> Return to a known good configuration after problematic
				changes
			</li>
			<li>
				<strong>Environment Recovery:</strong> Rebuild flag configuration after system failures
			</li>
			<li>
				<strong>Testing Cleanup:</strong> Reset development environment to baseline state
			</li>
			<li>
				<strong>Hotfix Reversal:</strong> Quickly undo emergency changes that caused issues
			</li>
		</ul>

		<div class="mb-4 rounded-lg bg-yellow-50 p-4">
			<p class="text-yellow-800">
				<strong>Before Restoring:</strong> Always create a current backup before performing a restore
				operation. Restore operations completely replace your existing configuration.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="restore-process" title="Restore Process">
		<h3 class="mb-3 text-lg font-semibold">Step 1: Verify Backup File</h3>
		<p class="mb-4">
			Before restoring, ensure your backup file is valid and matches the current environment:
		</p>
		<CodeBlock
			code={`# Verify backup file integrity
jq empty backup.json && echo "✅ Valid JSON" || echo "❌ Invalid JSON"

# Check environment match
BACKUP_ENV=$(jq -r '.environment' backup.json)
CURRENT_ENV={ENVIRONMENT:-development}

if [ "$BACKUP_ENV" = "$CURRENT_ENV" ]; then
    echo "✅ Environment matches: $BACKUP_ENV"
else
    echo "❌ Environment mismatch: $BACKUP_ENV != $CURRENT_ENV"
fi

# Check backup contents
echo "📊 Backup contains $(jq '.flags | length' backup.json) flags"`}
			title="Backup Verification"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Step 2: Create Pre-Restore Backup</h3>
		<p class="mb-4">Always create a backup of the current state before restoring:</p>
		<CodeBlock
			code={`# Create pre-restore backup
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
curl -o "pre-restore-backup-$TIMESTAMP.json" \
     "http://localhost:3000/migration/export"

echo "📦 Pre-restore backup saved: pre-restore-backup-$TIMESTAMP.json"`}
			title="Pre-Restore Backup"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Step 3: Perform Restore via Web Interface</h3>
		<p class="mb-4">Use the FlagFlow web interface to perform the restore:</p>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Navigate to the <strong>Migration</strong> page in your FlagFlow instance</li>
			<li>Locate the <strong>File-based Migration</strong> section</li>
			<li>Click <strong>Choose File</strong> and select your backup file</li>
			<li>Click <strong>Analyze Migration</strong> - the system will detect this is a restore</li>
			<li>Review the restore steps and click <strong>Execute Migration</strong></li>
		</ol>

		<div class="mb-4 rounded-lg bg-green-50 p-4">
			<p class="text-green-800">
				<strong>Automatic Detection:</strong> FlagFlow automatically detects when you're uploading a
				backup from the same environment and treats it as a restore operation rather than a migration.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="restore-validation" title="Restore Validation">
		<h3 class="mb-3 text-lg font-semibold">Environment Verification</h3>
		<p class="mb-4">
			FlagFlow performs specific validations for restore operations to ensure safety:
		</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Environment Match:</strong> Backup environment must match current environment
			</li>
			<li><strong>File Integrity:</strong> JSON structure and required fields validation</li>
			<li><strong>Schema Validation:</strong> All flag types and constraints must be valid</li>
			<li>
				<strong>Value Validation:</strong> Backup values must comply with their schema definitions
			</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Restore Step Generation</h3>
		<p class="mb-4">
			During restore, FlagFlow analyzes the differences between current state and backup to generate
			restoration steps:
		</p>
		<CodeBlock
			code={`Example restore steps for production environment:

1. DELETE current_only_flag (exists in current, not in backup)
2. CREATE_DEFAULTVALUE backup_flag (exists in backup, not current)
3. SET_VALUE backup_flag = true (restore backed up value)
4. UPDATE_SCHEMA_DEFAULTVALUE changed_flag (schema changed)
5. SET_VALUE changed_flag = "restored_value" (restore backed up value)

✅ All steps will be selected by default for complete restoration`}
			title="Restore Step Analysis"
		/>
	</DocsPageSection>

	<DocsPageSection id="restore-strategies" title="Restore Strategies">
		<h3 class="mb-3 text-lg font-semibold">Complete Restore (Recommended)</h3>
		<p class="mb-4">The default and recommended approach for disaster recovery:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Restores all flags exactly as they were in the backup</li>
			<li>Removes any flags created after the backup</li>
			<li>Updates all values to match the backup state</li>
			<li>Ensures complete consistency with the backup point-in-time</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Selective Restore</h3>
		<p class="mb-4">For more granular control over what gets restored:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Uncheck specific restoration steps you don't want to execute</li>
			<li>Useful when you want to keep some recent changes</li>
			<li>Restore only specific flags or flag groups</li>
			<li>Requires careful consideration of dependencies</li>
		</ul>

		<div class="mb-4 rounded-lg bg-red-50 p-4">
			<p class="text-red-800">
				<strong>Caution with Selective Restore:</strong> Selective restoration may result in an inconsistent
				state. Only use this approach if you fully understand the implications.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="restore-scenarios" title="Common Restore Scenarios">
		<h3 class="mb-3 text-lg font-semibold">Disaster Recovery</h3>
		<CodeBlock
			code={`# Scenario: Complete data loss in production
# Situation: etcd cluster failure, all flag data lost

1. Identify most recent backup file
   - flagflow_migration_production_20240810-020000.json (daily backup)
   
2. Verify backup integrity and environment match
   - Environment: production ✓
   - 47 flags in backup ✓
   - JSON structure valid ✓

3. Restore steps generated:
   - CREATE_DEFAULTVALUE for all 47 flags
   - SET_VALUE for all flags with non-default values
   
4. Execute complete restore to rebuild entire configuration`}
			title="Complete Disaster Recovery"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Configuration Rollback</h3>
		<CodeBlock
			code={`# Scenario: Recent changes caused issues, need to rollback
# Situation: Bad deployment 2 hours ago, rollback to pre-deploy state

1. Use pre-deployment backup
   - flagflow_migration_production_20240810-140000.json
   
2. Restore will generate steps to:
   - DELETE new flags created during deployment
   - UPDATE_SCHEMA_DEFAULTVALUE for modified flags
   - SET_VALUE to restore previous values
   
3. Execute to return to known good state`}
			title="Configuration Rollback"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Development Environment Reset</h3>
		<CodeBlock
			code={`# Scenario: Reset development environment to baseline
# Situation: Development environment cluttered with test flags

1. Use baseline configuration backup
   - flagflow_migration_development_baseline.json
   
2. Restore will clean up:
   - DELETE all experimental flags
   - Reset all values to baseline state
   - Restore original flag schemas
   
3. Development environment returns to clean state`}
			title="Development Reset"
		/>
	</DocsPageSection>

	<DocsPageSection id="restore-automation" title="Automated Restore Scripts">
		<h3 class="mb-3 text-lg font-semibold">Emergency Restore Script</h3>
		<CodeBlock
			code={`#!/bin/bash
# emergency-restore.sh - Quick restore for disaster recovery

BACKUP_FILE=$1
FLAGFLOW_URL="http://localhost:3000"

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: $0 <backup-file.json>"
    exit 1
fi

echo "🚨 Emergency Restore Starting..."
echo "📁 Backup file: $BACKUP_FILE"

# Verify backup file
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Validate JSON
if ! jq empty "$BACKUP_FILE" 2>/dev/null; then
    echo "❌ Invalid JSON in backup file"
    exit 1
fi

# Check environment match
BACKUP_ENV=$(jq -r '.environment' "$BACKUP_FILE")
CURRENT_ENV={ENVIRONMENT:-development}

if [ "$BACKUP_ENV" != "$CURRENT_ENV" ]; then
    echo "❌ Environment mismatch: $BACKUP_ENV != $CURRENT_ENV"
    echo "   Use migration instead of restore for cross-environment operations"
    exit 1
fi

echo "✅ Environment verified: $CURRENT_ENV"
echo "📊 Backup contains $(jq '.flags | length' "$BACKUP_FILE") flags"

# Create pre-restore backup
echo "📦 Creating pre-restore backup..."
PRE_RESTORE_BACKUP="pre-restore-backup-$(date +%Y%m%d-%H%M%S).json"
curl -s "$FLAGFLOW_URL/migration/export" -o "$PRE_RESTORE_BACKUP"

if [ $? -eq 0 ]; then
    echo "✅ Pre-restore backup created: $PRE_RESTORE_BACKUP"
else
    echo "❌ Failed to create pre-restore backup"
    exit 1
fi

echo "🎯 Ready for restore. Upload $BACKUP_FILE to FlagFlow migration interface."
echo "🔄 Pre-restore backup available at: $PRE_RESTORE_BACKUP"
echo ""
echo "Manual steps:"
echo "1. Open $FLAGFLOW_URL/ui/migration"
echo "2. Upload $BACKUP_FILE"
echo "3. Click 'Analyze Migration'"
echo "4. Review restore steps and execute"`}
			title="Emergency Restore Script"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Scheduled Restore Validation</h3>
		<CodeBlock
			code={`#!/bin/bash
# validate-restore-readiness.sh - Test restore capability regularly

BACKUP_DIR="/path/to/backups"
FLAGFLOW_URL="http://localhost:3000"
TEST_BACKUP=""

# Find most recent backup
TEST_BACKUP=$(ls -t "$BACKUP_DIR"/flagflow_migration_*.json | head -1)

if [ -z "$TEST_BACKUP" ]; then
    echo "❌ No backup files found in $BACKUP_DIR"
    exit 1
fi

echo "🧪 Testing restore readiness with: $(basename "$TEST_BACKUP")"

# Verify backup can be loaded by migration system
# Note: This would require API endpoint to validate without executing
curl -s -X POST "$FLAGFLOW_URL/migration/validate" \
     -F "file=@$TEST_BACKUP" | jq .

echo "✅ Restore validation completed"`}
			title="Restore Validation Test"
		/>
	</DocsPageSection>

	<DocsPageSection id="best-practices" title="Best Practices">
		<h3 class="mb-3 text-lg font-semibold">Before Restore</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Create Backup:</strong> Always backup current state before restoring</li>
			<li><strong>Verify Environment:</strong> Confirm backup matches current environment</li>
			<li><strong>Check Backup Age:</strong> Ensure backup is from the desired point in time</li>
			<li><strong>Plan Downtime:</strong> Notify users of potential service disruption</li>
			<li><strong>Test First:</strong> If possible, test restore in staging environment</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">During Restore</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Complete Restore:</strong> Use complete restore for disaster recovery</li>
			<li><strong>Monitor Progress:</strong> Watch for any errors during restore execution</li>
			<li><strong>Avoid Interruption:</strong> Don't modify flags while restore is running</li>
			<li><strong>Document Actions:</strong> Record what backup was restored and why</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">After Restore</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Verify Completion:</strong> Check that all expected flags are present</li>
			<li>
				<strong>Test Applications:</strong> Ensure applications work with restored configuration
			</li>
			<li><strong>Monitor Behavior:</strong> Watch for any unexpected application behavior</li>
			<li><strong>Update Documentation:</strong> Record the restore operation in logs</li>
			<li><strong>Resume Backups:</strong> Ensure backup schedule continues normally</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="troubleshooting-restore" title="Troubleshooting">
		<div class="space-y-4">
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Environment Mismatch Error</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Verify backup environment matches ENVIRONMENT variable</li>
					<li>Check backup file was created from the correct environment</li>
					<li>Use migration instead of restore for cross-environment operations</li>
					<li>Confirm backup file hasn't been modified or corrupted</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Restore Execution Failures</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Check etcd connectivity and storage availability</li>
					<li>Verify user has 'migration' permission for restore operations</li>
					<li>Look for disk space issues that prevent flag creation</li>
					<li>Review server logs for detailed error messages</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Incomplete Restore Results</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Check if some restore steps were unselected or failed</li>
					<li>Verify backup file contains all expected flags</li>
					<li>Look for validation errors that prevented some flag creation</li>
					<li>Consider re-running restore with missing steps selected</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Application Issues After Restore</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Check if applications expect flags created after the backup</li>
					<li>Verify restored flag values are appropriate for current application version</li>
					<li>Look for new application features that depend on missing flags</li>
					<li>Consider selective restore to preserve some current flags</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="recovery-scenarios" title="Advanced Recovery Scenarios">
		<h3 class="mb-3 text-lg font-semibold">Partial Data Loss</h3>
		<p class="mb-4">When only some flags are lost or corrupted:</p>
		<CodeBlock
			code={`# Scenario: Specific flags corrupted, others intact
# Strategy: Selective restore to recover only affected flags

1. Identify affected flags through application errors or monitoring
2. Load backup file and analyze which flags need restoration
3. Use selective restore:
   - Uncheck CREATE/DELETE steps for unaffected flags
   - Include only UPDATE and SET_VALUE steps for corrupted flags
4. Execute selective restore to fix specific issues`}
			title="Selective Recovery"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Schema Corruption Recovery</h3>
		<CodeBlock
			code={`# Scenario: Flag schemas corrupted but values intact
# Strategy: Restore schemas while preserving current values

1. Load backup with correct schemas
2. Use migration analysis to identify schema differences
3. Execute only UPDATE_SCHEMA_DEFAULTVALUE steps
4. Skip SET_VALUE steps to preserve current values
5. Manually verify and adjust values if needed`}
			title="Schema-Only Recovery"
		/>
	</DocsPageSection>

	<DocsPageSection id="next-steps" title="Next Steps">
		<p class="mb-4">After completing a restore operation, consider these follow-up actions:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Monitor Applications:</strong> Ensure all applications work correctly with restored flags
			</li>
			<li>
				<strong>Update Team:</strong> Notify team members of the restore operation and its scope
			</li>
			<li>
				<strong>Resume Normal Operations:</strong> Re-enable any monitoring or automated processes
			</li>
			<li>
				<strong>Document Incident:</strong> Record the restore operation for future reference
			</li>
			<li>
				<strong>Review Backup Strategy:</strong> Assess if backup frequency needs adjustment
			</li>
		</ul>
		<p class="text-sm text-gray-600">
			For creating backups, see the
			<a class="text-blue-600 hover:underline" href="/docs/migration/export-backup"
				>Export and Backup</a
			>
			documentation. For cross-environment operations, see the
			<a class="text-blue-600 hover:underline" href="/docs/migration/migration">Migration</a>
			documentation.
		</p>
	</DocsPageSection>
</DocsPage>
