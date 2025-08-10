<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Authentication Overview"
		>Understanding FlagFlow's authentication system and permission model</PageTitle
	>

	<DocsPageSection id="overview" title="Authentication Model">
		<p class="mb-4">
			FlagFlow implements a role-based authentication system with granular permissions. The system
			is designed with security in mind while maintaining ease of use for feature flag management.
		</p>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Key Principle:</strong> Flag values are readable without authentication, but all modifications
				require proper authentication and permissions.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="public-access" title="Public Access">
		<p class="mb-4">
			FlagFlow allows unauthenticated access to flag values for reading purposes. This design
			enables applications to fetch feature flags without requiring authentication credentials,
			simplifying integration while maintaining security for administrative operations.
		</p>
		<h3 class="mb-3 text-lg font-semibold">What's Publicly Accessible</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Flag values</strong> - Current state of feature flags</li>
			<li><strong>Flag schemas</strong> - Structure and metadata (read-only)</li>
			<li><strong>Environment data</strong> - Available environments and their configurations</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="protected-operations" title="Protected Operations">
		<p class="mb-4">
			All administrative and modification operations require authentication and appropriate
			permissions:
		</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Operation</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Required Permission</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2">Flag Creation/Deletion</td>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">flag-create</td>
						<td class="border border-gray-300 px-4 py-2"
							>Create new flags or delete existing ones</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">Schema Modification</td>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">flag-schema</td>
						<td class="border border-gray-300 px-4 py-2"
							>Modify flag schemas, types, and structure</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">Value Updates</td>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">flag-value</td>
						<td class="border border-gray-300 px-4 py-2">Update flag values and states</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">User Management</td>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">users</td>
						<td class="border border-gray-300 px-4 py-2"
							>Add, modify, or remove users and manage sessions</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">Data Migration</td>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">migration</td>
						<td class="border border-gray-300 px-4 py-2">
							Execute migrations and restore backups
							<small class="mt-1 block text-gray-500">
								See <a class="text-blue-600 hover:underline" href="/docs/migration/migration"
									>Migration</a
								>,
								<a class="text-blue-600 hover:underline" href="/docs/migration/export-backup"
									>Export & Backup</a
								>, and
								<a class="text-blue-600 hover:underline" href="/docs/migration/restore">Restore</a>
							</small>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="auth-methods" title="Authentication Methods">
		<p class="mb-4">FlagFlow supports two primary authentication methods:</p>
		<div class="grid gap-6 md:grid-cols-2">
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Built-in User Management</h3>
				<p class="mb-3 text-gray-600">
					Simple session-based authentication for small to medium deployments
				</p>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Session-based authentication</li>
					<li>Default user creation at startup</li>
					<li>Configurable session timeout</li>
					<li>Built-in user interface</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Keycloak Integration</h3>
				<p class="mb-3 text-gray-600">
					Enterprise-grade authentication with external identity provider
				</p>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>OAuth 2.0 / OpenID Connect</li>
					<li>Single Sign-On (SSO)</li>
					<li>Advanced role management</li>
					<li>Integration with existing identity systems</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="security-considerations" title="Security Considerations">
		<div class="mb-4 rounded-lg bg-yellow-50 p-4">
			<h3 class="mb-2 text-lg font-semibold text-yellow-800">Important Security Notes</h3>
			<ul class="list-inside list-disc space-y-2 text-yellow-700">
				<li>
					<strong>Network Security:</strong> While flag values are publicly readable, ensure FlagFlow
					is deployed in a secure network environment
				</li>
				<li>
					<strong>Administrative Access:</strong> Restrict administrative interface access to trusted
					networks or VPNs
				</li>
				<li>
					<strong>Session Management:</strong> Configure appropriate session timeouts based on your security
					requirements
				</li>
				<li>
					<strong>Audit Logging:</strong> Enable comprehensive logging for all administrative operations
				</li>
			</ul>
		</div>
	</DocsPageSection>

	<DocsPageSection id="configuration" title="Authentication Configuration">
		<p class="mb-4">Configure authentication through environment variables:</p>
		<CodeBlock
			code={`# Built-in User Management
SESSION_USERS_ENABLED=true
SESSION_DEFAULT_USERNAME=admin
SESSION_DEFAULT_PASSWORD=secure-password
SESSION_TIMEOUT_SEC=1800

# Keycloak Integration (Enterprise)
KEYCLOAK_HOST=https://auth.yourcompany.com
KEYCLOAK_REALM=flagflow
KEYCLOAK_CLIENT=flagflow-frontend`}
			title="Environment Variables"
		/>
		<p class="mt-4 text-sm text-gray-600">
			See the <a class="text-blue-600 hover:underline" href="/docs/installation/env-variables"
				>Environment Variables</a
			> documentation for complete configuration options.
		</p>
	</DocsPageSection>
</DocsPage>
