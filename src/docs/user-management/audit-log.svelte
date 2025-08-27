<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import DocsPageSubSection from '$components/docs/DocsPageSubSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Audit Log"
		>Comprehensive audit logging system for tracking user actions and system changes with detailed
		input/output information for compliance and security monitoring</PageTitle
	>

	<DocsPageSection id="overview" title="Overview">
		<p class="mb-4">
			FlagFlow's audit logging system, introduced in version 1.5.0, provides comprehensive tracking
			of all user actions and system changes. This feature is essential for:
		</p>
		<ul class="mb-6 list-inside list-disc space-y-2">
			<li>
				<strong>Compliance requirements</strong> - Meet regulatory standards with detailed audit trails
			</li>
			<li>
				<strong>Security monitoring</strong> - Track unauthorized access attempts and suspicious activities
			</li>
			<li><strong>Change tracking</strong> - Monitor who changed what flags and when</li>
			<li><strong>Debugging</strong> - Understand the sequence of actions leading to issues</li>
			<li><strong>Accountability</strong> - Maintain clear records of user actions</li>
		</ul>

		<div class="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
			<h4 class="mb-2 font-semibold text-yellow-800">⚠️ Important: Audit Log Size</h4>
			<p class="text-sm text-yellow-700">
				<strong>Audit logs can become very large!</strong> Every user action with full input and output
				data is logged. Plan for adequate storage capacity and consider log rotation policies for production
				deployments.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="configuration" title="Configuration">
		<p class="mb-4">
			Audit logging is controlled by the <code>AUDITLOG_ENABLED</code> environment variable and operates
			at log level 100 (a special level for audit events).
		</p>

		<DocsPageSubSection subTitle="Environment Variable" title="Enable Audit Logging">
			<CodeBlock
				code={`# Enable audit logging
AUDITLOG_ENABLED=true

# Optional: Set general log level (audit logs use level 100 regardless)
LOGLEVEL=info`}
				title="Environment Configuration"
			/>

			<p class="mt-4 text-sm text-gray-600">
				<strong>Note:</strong> Audit logs operate at log level 100, which is separate from the
				general
				<code>LOGLEVEL</code> setting. This ensures audit events are always captured when audit logging
				is enabled.
			</p>
		</DocsPageSubSection>

		<DocsPageSubSection subTitle="Log Routing" title="Routing to Special Log Storage">
			<p class="mb-4">
				Since audit logs use a specific log level (100), they can be easily routed to specialized
				storage systems using log management tools:
			</p>

			<h5 class="mb-2 font-semibold">Using Fluentd/Fluent Bit</h5>
			<CodeBlock
				code={`<filter flagflow.**>
  @type grep
  <regexp>
    key level
    pattern ^100$
  </regexp>
</filter>

<match flagflow.audit>
  @type s3
  s3_bucket audit-logs-bucket
  s3_region us-west-2
  path audit-logs/flagflow/
  time_slice_format %Y%m%d
</match>`}
				title="fluentd-audit-routing.conf"
			/>

			<h5 class="mt-6 mb-2 font-semibold">Using Logstash</h5>
			<CodeBlock
				code={`filter {
  if [level] == 100 {
    mutate {
      add_tag => ["audit"]
    }
  }
}

output {
  if "audit" in [tags] {
    elasticsearch {
      hosts => ["audit-elasticsearch:9200"]
      index => "flagflow-audit-%{+YYYY.MM.dd}"
    }
  }
}`}
				title="logstash-audit-routing.conf"
			/>

			<h5 class="mt-6 mb-2 font-semibold">Using Docker Logging Driver</h5>
			<CodeBlock
				code={`version: '3.8'
services:
  flagflow:
    image: flagflow/flagflow:latest
    environment:
      - AUDITLOG_ENABLED=true
    logging:
      driver: "fluentd"
      options:
        fluentd-address: "audit-collector:24224"
        tag: "flagflow.audit"
        labels: "service"
        env: "ENVIRONMENT"`}
				title="docker-compose.yml with audit log routing"
			/>
		</DocsPageSubSection>
	</DocsPageSection>

	<DocsPageSection id="log-format" title="Audit Log Format">
		<p class="mb-4">
			Audit logs are structured JSON entries containing comprehensive information about each user
			action. Here's the format and examples:
		</p>

		<DocsPageSubSection subTitle="Standard Format" title="Audit Log Entry Structure">
			<CodeBlock
				code={`{
  "level": 100,
  "time": "2024-12-01T15:30:45.123Z",
  "hostname": "flagflow-prod-01",
  "pid": 1234,
  "service": "flagflow",
  "traceId": "abc123def456",
  "userId": "admin",
  "userPermissions": ["flags:read", "flags:write", "users:manage"],
  "action": "flag.update",
  "resource": "feature_flags/payment/allow_crypto",
  "method": "PUT",
  "endpoint": "/rpc/protected/flag.update",
  "inputs": {
    "flagName": "payment/allow_crypto",
    "value": true,
    "previousValue": false
  },
  "outputs": {
    "success": true,
    "flagId": "payment_allow_crypto_001",
    "updatedAt": "2024-12-01T15:30:45.120Z"
  },
  "clientIp": "192.168.1.100",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  "sessionId": "sess_xyz789",
  "duration": 45,
  "status": "success"
}`}
				title="Complete Audit Log Entry"
			/>
		</DocsPageSubSection>

		<DocsPageSubSection subTitle="Field Descriptions" title="Audit Log Fields">
			<div class="overflow-x-auto">
				<table class="mb-6 w-full border-collapse border border-gray-300">
					<thead>
						<tr class="bg-gray-100">
							<th class="border border-gray-300 px-4 py-2 text-left">Field</th>
							<th class="border border-gray-300 px-4 py-2 text-left">Type</th>
							<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">level</td>
							<td class="border border-gray-300 px-4 py-2">number</td>
							<td class="border border-gray-300 px-4 py-2">Always 100 for audit logs</td>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">time</td>
							<td class="border border-gray-300 px-4 py-2">string</td>
							<td class="border border-gray-300 px-4 py-2">ISO 8601 timestamp of the action</td>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">traceId</td>
							<td class="border border-gray-300 px-4 py-2">string</td>
							<td class="border border-gray-300 px-4 py-2">Unique identifier for request tracing</td
							>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">userId</td>
							<td class="border border-gray-300 px-4 py-2">string</td>
							<td class="border border-gray-300 px-4 py-2">User who performed the action</td>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">userPermissions</td>
							<td class="border border-gray-300 px-4 py-2">array</td>
							<td class="border border-gray-300 px-4 py-2">User's permissions at time of action</td>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">action</td>
							<td class="border border-gray-300 px-4 py-2">string</td>
							<td class="border border-gray-300 px-4 py-2"
								>Type of action performed (flag.create, flag.update, user.delete, etc.)</td
							>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">resource</td>
							<td class="border border-gray-300 px-4 py-2">string</td>
							<td class="border border-gray-300 px-4 py-2">Resource affected by the action</td>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">inputs</td>
							<td class="border border-gray-300 px-4 py-2">object</td>
							<td class="border border-gray-300 px-4 py-2">Complete input data for the action</td>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">outputs</td>
							<td class="border border-gray-300 px-4 py-2">object</td>
							<td class="border border-gray-300 px-4 py-2">Complete output/response data</td>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">clientIp</td>
							<td class="border border-gray-300 px-4 py-2">string</td>
							<td class="border border-gray-300 px-4 py-2">IP address of the client</td>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">duration</td>
							<td class="border border-gray-300 px-4 py-2">number</td>
							<td class="border border-gray-300 px-4 py-2">Action duration in milliseconds</td>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2 font-mono text-sm">status</td>
							<td class="border border-gray-300 px-4 py-2">string</td>
							<td class="border border-gray-300 px-4 py-2">success, error, or warning</td>
						</tr>
					</tbody>
				</table>
			</div>
		</DocsPageSubSection>
	</DocsPageSection>

	<DocsPageSection id="examples" title="Example Audit Log Entries">
		<DocsPageSubSection subTitle="Flag Operations" title="Flag Creation">
			<CodeBlock
				code={`{
  "level": 100,
  "time": "2024-12-01T14:15:30.456Z",
  "traceId": "trace_001",
  "userId": "developer_jane",
  "action": "flag.create",
  "resource": "features/new_checkout_flow",
  "inputs": {
    "flagName": "features/new_checkout_flow",
    "type": "boolean",
    "defaultValue": false,
    "description": "Enable new checkout flow for testing"
  },
  "outputs": {
    "success": true,
    "flagId": "features_new_checkout_flow_001",
    "createdAt": "2024-12-01T14:15:30.450Z"
  },
  "status": "success",
  "duration": 23
}`}
				title="Flag Creation Audit Log"
			/>
		</DocsPageSubSection>

		<DocsPageSubSection subTitle="Flag Updates" title="Flag Value Change">
			<CodeBlock
				code={`{
  "level": 100,
  "time": "2024-12-01T16:45:12.789Z",
  "traceId": "trace_002",
  "userId": "admin",
  "action": "flag.update",
  "resource": "features/new_checkout_flow",
  "inputs": {
    "flagName": "features/new_checkout_flow",
    "value": true,
    "previousValue": false
  },
  "outputs": {
    "success": true,
    "flagId": "features_new_checkout_flow_001",
    "updatedAt": "2024-12-01T16:45:12.785Z",
    "propagatedToInstances": 3
  },
  "status": "success",
  "duration": 67
}`}
				title="Flag Update Audit Log"
			/>
		</DocsPageSubSection>

		<DocsPageSubSection subTitle="User Management" title="User Creation">
			<CodeBlock
				code={`{
  "level": 100,
  "time": "2024-12-01T10:30:45.123Z",
  "traceId": "trace_003",
  "userId": "admin",
  "action": "user.create",
  "resource": "users/developer_bob",
  "inputs": {
    "username": "developer_bob",
    "permissions": ["flags:read", "flags:write"],
    "roles": ["developer"]
  },
  "outputs": {
    "success": true,
    "userId": "user_dev_bob_001",
    "createdAt": "2024-12-01T10:30:45.120Z"
  },
  "status": "success",
  "duration": 34
}`}
				title="User Creation Audit Log"
			/>
		</DocsPageSubSection>

		<DocsPageSubSection subTitle="Failed Actions" title="Unauthorized Access Attempt">
			<CodeBlock
				code={`{
  "level": 100,
  "time": "2024-12-01T18:22:15.666Z",
  "traceId": "trace_004",
  "userId": "guest_user",
  "userPermissions": ["flags:read"],
  "action": "flag.delete",
  "resource": "critical/payment_enabled",
  "inputs": {
    "flagName": "critical/payment_enabled"
  },
  "outputs": {
    "success": false,
    "error": "Insufficient permissions",
    "errorCode": "PERMISSION_DENIED",
    "requiredPermission": "flags:delete"
  },
  "clientIp": "203.0.113.45",
  "status": "error",
  "duration": 12
}`}
				title="Failed Action Audit Log"
			/>
		</DocsPageSubSection>

		<DocsPageSubSection subTitle="System Events" title="Migration Import">
			<CodeBlock
				code={`{
  "level": 100,
  "time": "2024-12-01T09:00:00.000Z",
  "traceId": "trace_005",
  "userId": "system_migration",
  "action": "migration.import",
  "resource": "migration/staging_to_prod_20241201",
  "inputs": {
    "sourceEnvironment": "staging",
    "flagsCount": 47,
    "usersCount": 12,
    "migrationFile": "flagflow_migration_staging_20241201-090000.json"
  },
  "outputs": {
    "success": true,
    "importedFlags": 47,
    "importedUsers": 12,
    "skippedDuplicates": 3,
    "completedAt": "2024-12-01T09:00:15.456Z"
  },
  "status": "success",
  "duration": 15456
}`}
				title="Migration Import Audit Log"
			/>
		</DocsPageSubSection>
	</DocsPageSection>

	<DocsPageSection id="storage-considerations" title="Storage and Performance Considerations">
		<div class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
			<h4 class="mb-2 font-semibold text-red-800">⚠️ Storage Requirements</h4>
			<p class="mb-2 text-sm text-red-700">
				<strong>Audit logs can consume significant storage space.</strong> Consider these factors:
			</p>
			<ul class="list-inside list-disc space-y-1 text-sm text-red-700">
				<li>Every user action generates a complete audit entry with full input/output data</li>
				<li>High-activity environments can generate thousands of audit entries per day</li>
				<li>Each entry can be 1-5KB depending on the complexity of inputs/outputs</li>
			</ul>
		</div>

		<DocsPageSubSection subTitle="Storage Planning" title="Capacity Planning">
			<p class="mb-4">Estimate your audit log storage needs:</p>
			<div class="mb-4 rounded-lg bg-gray-50 p-4">
				<h5 class="mb-2 font-semibold">Example Calculations:</h5>
				<ul class="space-y-2 text-sm">
					<li>
						<strong>Small team (10 users, 50 actions/day):</strong> ~250KB/day, ~90MB/year
					</li>
					<li>
						<strong>Medium team (50 users, 500 actions/day):</strong> ~2.5MB/day, ~900MB/year
					</li>
					<li>
						<strong>Large organization (200 users, 2000 actions/day):</strong> ~10MB/day, ~3.6GB/year
					</li>
				</ul>
			</div>
		</DocsPageSubSection>

		<DocsPageSubSection subTitle="Best Practices" title="Log Management Best Practices">
			<ul class="mb-4 list-inside list-disc space-y-2">
				<li>
					<strong>Implement log rotation:</strong> Archive old audit logs to cold storage after 90 days
				</li>
				<li>
					<strong>Use compression:</strong> Compress archived audit logs to save 70-80% space
				</li>
				<li>
					<strong>Monitor disk space:</strong> Set up alerts when audit log storage exceeds thresholds
				</li>
				<li>
					<strong>Index efficiently:</strong> When using search systems, index key fields (time, userId,
					action)
				</li>
				<li>
					<strong>Regular cleanup:</strong> Establish retention policies (e.g., keep for 7 years for
					compliance)
				</li>
			</ul>
		</DocsPageSubSection>
	</DocsPageSection>

	<DocsPageSection id="compliance" title="Compliance and Security">
		<p class="mb-4">
			FlagFlow's audit logging supports various compliance requirements and security standards:
		</p>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="rounded-lg border border-green-200 bg-green-50 p-4">
				<h4 class="mb-3 text-lg font-semibold text-green-700">Compliance Standards</h4>
				<ul class="space-y-2 text-sm">
					<li>✅ <strong>SOX (Sarbanes-Oxley):</strong> Complete change tracking</li>
					<li>✅ <strong>GDPR:</strong> User action accountability</li>
					<li>✅ <strong>HIPAA:</strong> Access logging for protected data</li>
					<li>✅ <strong>ISO 27001:</strong> Information security management</li>
					<li>✅ <strong>PCI DSS:</strong> Access control monitoring</li>
				</ul>
			</div>
			<div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
				<h4 class="mb-3 text-lg font-semibold text-blue-700">Security Features</h4>
				<ul class="space-y-2 text-sm">
					<li>🔒 <strong>Immutable logs:</strong> Cannot be modified after creation</li>
					<li>🔍 <strong>Complete context:</strong> Full input/output capture</li>
					<li>👤 <strong>User attribution:</strong> Every action tied to a user</li>
					<li>⏱️ <strong>Precise timing:</strong> Millisecond-accurate timestamps</li>
					<li>📍 <strong>Request tracing:</strong> Trace IDs for correlation</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="troubleshooting" title="Troubleshooting">
		<DocsPageSubSection subTitle="Common Issues" title="Audit Logging Not Working">
			<div class="space-y-4">
				<div class="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
					<h5 class="font-semibold text-yellow-800">No Audit Logs Appearing</h5>
					<p class="mt-2 text-sm text-yellow-700">
						Check that <code>AUDITLOG_ENABLED=true</code> is set and the application has restarted. Verify
						your log level configuration allows level 100 messages.
					</p>
				</div>

				<div class="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
					<h5 class="font-semibold text-yellow-800">Audit Logs Too Large</h5>
					<p class="mt-2 text-sm text-yellow-700">
						This is expected behavior. Implement log rotation and archiving. Consider filtering
						specific actions if needed using your log management system.
					</p>
				</div>

				<div class="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
					<h5 class="font-semibold text-yellow-800">Missing Trace IDs</h5>
					<p class="mt-2 text-sm text-yellow-700">
						Trace IDs are automatically generated for each request. If missing, check that the
						request is going through FlagFlow's standard middleware pipeline.
					</p>
				</div>
			</div>
		</DocsPageSubSection>
	</DocsPageSection>
</DocsPage>
