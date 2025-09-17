<script lang="ts">
	import { resolve } from '$app/paths';
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageRoundedBox from '$components/docs/DocsPageRoundedBox.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Built-in User Management"
		>Simple user management solution for small to medium-sized businesses</PageTitle
	>

	<DocsPageSection id="overview" title="Overview">
		<p class="mb-4">
			FlagFlow includes a built-in user management system designed for organizations that need
			straightforward authentication without the complexity of external identity providers. This
			system is ideal for small to medium-sized teams that want to get started quickly with secure
			feature flag management.
		</p>
		<div class="mb-4 rounded-lg bg-green-50 p-4">
			<p class="text-green-800">
				<strong>Perfect for:</strong> Teams of 5-50 users, development environments, proof-of-concepts,
				and organizations without existing identity infrastructure.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="features" title="Key Features">
		<div class="grid gap-4 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Session-Based Authentication</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Secure session management</li>
					<li>Configurable session timeouts</li>
					<li>Automatic session cleanup</li>
					<li>Remember me functionality</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">User Management</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Create, modify, and delete users</li>
					<li>Role-based permission assignment</li>
					<li>Password management</li>
					<li>User activity tracking</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Administrative Interface</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Web-based user management</li>
					<li>Bulk operations</li>
					<li>User permission overview</li>
					<li>Session monitoring</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Security Features</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Password hashing and salting</li>
					<li>Session token security</li>
					<li>Brute force protection</li>
					<li>Audit logging</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>

	<DocsPageSection id="configuration" title="Configuration">
		<p class="mb-4">Enable and configure the built-in user management system:</p>
		<CodeBlock
			code={`# Enable built-in user management
SESSION_USERS_ENABLED=true

# Default user created at startup
SESSION_DEFAULT_USERNAME=admin
SESSION_DEFAULT_PASSWORD=your-secure-password

# Session timeout (in seconds)
SESSION_TIMEOUT_SEC=1800  # 30 minutes

# Optional: Environment identifier
ENVIRONMENT=production`}
			title="Environment Configuration"
		/>
		<div class="mt-4 rounded-lg bg-yellow-50 p-4">
			<h3 class="mb-2 text-lg font-semibold text-yellow-800">Security Recommendations</h3>
			<ul class="list-inside list-disc space-y-1 text-yellow-700">
				<li>Always change the default password immediately after first login</li>
				<li>Use strong, unique passwords for all user accounts</li>
				<li>Configure appropriate session timeouts based on your security requirements</li>
				<li>Regularly review and audit user permissions</li>
			</ul>
		</div>
	</DocsPageSection>

	<DocsPageSection id="default-user" title="Default User Setup">
		<p class="mb-4">
			When FlagFlow starts with built-in user management enabled, it automatically creates a default
			administrator user if no users exist in the system.
		</p>
		<h3 class="mb-3 text-lg font-semibold">Initial Setup Process</h3>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>
				Set the <code>SESSION_DEFAULT_USERNAME</code> and <code>SESSION_DEFAULT_PASSWORD</code> environment
				variables
			</li>
			<li>Start FlagFlow with <code>SESSION_USERS_ENABLED=true</code></li>
			<li>The default user is created automatically with full administrator permissions</li>
			<li>Log in using the configured credentials</li>
			<li><strong>Immediately change the password</strong> after first login</li>
		</ol>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>First Login:</strong> Navigate to your FlagFlow instance and use the login form with
				your configured default credentials. You'll be prompted to change the password on first login
				for security.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="user-operations" title="User Operations">
		<h3 class="mb-3 text-lg font-semibold">Creating Users</h3>
		<p class="mb-4">
			Users with the <code>users</code> permission can create new user accounts through the web interface:
		</p>
		<ol class="mb-4 list-inside list-decimal space-y-1">
			<li>Navigate to the <strong>Users</strong> section in the admin interface</li>
			<li>Click <strong>Add User</strong></li>
			<li>Provide username and initial password</li>
			<li>Assign appropriate permissions</li>
			<li>Save the new user</li>
		</ol>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Managing Permissions</h3>
		<p class="mb-4">Each user can be assigned specific permissions based on their role:</p>
		<div class="overflow-x-auto">
			<table class="mb-4 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Permission</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Typical Role</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">flag-value</td>
						<td class="border border-gray-300 px-4 py-2">Modify flag values</td>
						<td class="border border-gray-300 px-4 py-2">Developer, DevOps</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">flag-schema</td>
						<td class="border border-gray-300 px-4 py-2">Modify flag schemas</td>
						<td class="border border-gray-300 px-4 py-2">Senior Developer, Architect</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">flag-create</td>
						<td class="border border-gray-300 px-4 py-2">Create and delete flags</td>
						<td class="border border-gray-300 px-4 py-2">Product Manager, Lead Developer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">users</td>
						<td class="border border-gray-300 px-4 py-2">Manage users and sessions</td>
						<td class="border border-gray-300 px-4 py-2">Administrator</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">migration</td>
						<td class="border border-gray-300 px-4 py-2">Execute migrations and backups</td>
						<td class="border border-gray-300 px-4 py-2">System Administrator</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="session-management" title="Session Management">
		<h3 class="mb-3 text-lg font-semibold">Session Behavior</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Timeout:</strong> Sessions automatically expire after the configured timeout period (default:
				30 minutes)
			</li>
			<li><strong>Activity Extension:</strong> Active sessions are automatically extended</li>
			<li><strong>Concurrent Sessions:</strong> Users can have multiple active sessions</li>
			<li><strong>Logout:</strong> Manual logout immediately invalidates the session</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Session Security</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Session tokens are securely generated and stored</li>
			<li>Sessions are tied to IP addresses for additional security</li>
			<li>Expired sessions are automatically cleaned up</li>
			<li>All session activities are logged for audit purposes</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="migration-path" title="Migration to Enterprise Auth">
		<p class="mb-4">
			As your organization grows, you may want to migrate from built-in user management to an
			enterprise identity provider like Keycloak.
		</p>
		<h3 class="mb-3 text-lg font-semibold">Migration Process</h3>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Set up your Keycloak instance and configure FlagFlow client</li>
			<li>Import existing users and their permissions to Keycloak</li>
			<li>Test authentication with a subset of users</li>
			<li>Update environment variables to enable Keycloak</li>
			<li>Disable built-in user management: <code>SESSION_USERS_ENABLED=false</code></li>
		</ol>
		<p class="text-sm text-gray-600">
			See the <a
				class="text-blue-600 hover:underline"
				href={resolve('/docs/user-management/keycloak', {})}>Keycloak Integration</a
			> documentation for detailed setup instructions.
		</p>
	</DocsPageSection>

	<DocsPageSection id="troubleshooting" title="Troubleshooting">
		<h3 class="mb-3 text-lg font-semibold">Common Issues</h3>
		<div class="space-y-4">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Cannot Login with Default Credentials</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Verify <code>SESSION_USERS_ENABLED=true</code> is set</li>
					<li>Check that default username and password environment variables are correct</li>
					<li>Ensure FlagFlow has successfully started and created the default user</li>
					<li>Check logs for any user creation errors</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Session Expires Too Quickly</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Increase <code>SESSION_TIMEOUT_SEC</code> value</li>
					<li>Check for browser cookie restrictions</li>
					<li>Verify system clock synchronization</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Cannot Create New Users</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Ensure your user has the <code>users</code> permission</li>
					<li>Check for username conflicts with existing users</li>
					<li>Verify password meets minimum requirements</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>
</DocsPage>
