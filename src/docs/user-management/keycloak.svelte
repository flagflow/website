<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageRoundedBox from '$components/docs/DocsPageRoundedBox.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Keycloak Integration"
		>Enterprise-grade authentication with single sign-on and advanced user management</PageTitle
	>

	<DocsPageSection id="overview" title="Overview">
		<p class="mb-4">
			Keycloak integration provides enterprise-level authentication for FlagFlow, supporting single
			sign-on (SSO), advanced user management, and integration with existing identity
			infrastructure. This is the recommended solution for larger organizations with complex
			authentication requirements.
		</p>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Enterprise Features:</strong> OAuth 2.0/OpenID Connect, SSO, fine-grained permissions,
				user federation, multi-factor authentication, and comprehensive audit logging.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="benefits" title="Benefits of Keycloak Integration">
		<div class="grid gap-4 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Single Sign-On (SSO)</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Seamless authentication across applications</li>
					<li>Reduced password fatigue</li>
					<li>Centralized session management</li>
					<li>Social login providers</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Advanced Security</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Multi-factor authentication (MFA)</li>
					<li>Brute force protection</li>
					<li>Password policies</li>
					<li>Session security controls</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">User Federation</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>LDAP/Active Directory integration</li>
					<li>Database user stores</li>
					<li>Custom user providers</li>
					<li>Automated user provisioning</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-2 text-lg font-semibold">Role Management</h3>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Fine-grained role-based access control</li>
					<li>Group-based permissions</li>
					<li>Dynamic role assignment</li>
					<li>Attribute-based access control</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>

	<DocsPageSection id="keycloak-setup" title="Keycloak Server Setup">
		<h3 class="mb-3 text-lg font-semibold">1. Install Keycloak</h3>
		<p class="mb-4">Install Keycloak using Docker or your preferred method:</p>
		<CodeBlock
			code={`# Using Docker Compose
version: '3.8'
services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin-password
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: keycloak-db-password
    ports:
      - "8080:8080"
    command: start-dev
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: keycloak-db-password
    volumes:
      - keycloak_db:/var/lib/postgresql/data

volumes:
  keycloak_db:`}
			title="docker-compose.yml"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">2. Access Keycloak Admin Console</h3>
		<ol class="mb-4 list-inside list-decimal space-y-1">
			<li>Navigate to <code>http://localhost:8080</code></li>
			<li>Click on "Administration Console"</li>
			<li>Login with the admin credentials configured above</li>
			<li>Create a new realm for FlagFlow</li>
		</ol>
	</DocsPageSection>

	<DocsPageSection id="realm-configuration" title="Realm Configuration">
		<h3 class="mb-3 text-lg font-semibold">1. Create FlagFlow Realm</h3>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>In the Keycloak admin console, hover over the realm dropdown (top-left)</li>
			<li>Click "Create Realm"</li>
			<li>Enter realm name: <code>flagflow</code></li>
			<li>Enable the realm and click "Create"</li>
		</ol>

		<h3 class="mb-3 text-lg font-semibold">2. Configure Realm Settings</h3>
		<p class="mb-4">Navigate to Realm Settings and configure:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Login Tab:</strong> Configure login requirements, session timeouts</li>
			<li><strong>Keys Tab:</strong> Ensure proper token signing keys are configured</li>
			<li><strong>Tokens Tab:</strong> Set appropriate token lifespans</li>
			<li><strong>Sessions Tab:</strong> Configure session behavior</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="client-configuration" title="Client Configuration">
		<h3 class="mb-3 text-lg font-semibold">1. Create FlagFlow Client</h3>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Navigate to "Clients" in the left sidebar</li>
			<li>Click "Create client"</li>
			<li>Set Client ID: <code>flagflow-frontend</code></li>
			<li>Set Client Type: <code>OpenID Connect</code></li>
			<li>Click "Next"</li>
		</ol>

		<h3 class="mb-3 text-lg font-semibold">2. Configure Client Capabilities</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Enable <strong>Client authentication</strong></li>
			<li>Enable <strong>Authorization</strong></li>
			<li>Enable <strong>Standard flow</strong> (Authorization Code flow)</li>
			<li>Enable <strong>Direct access grants</strong> (if needed)</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">3. Configure Client Settings</h3>
		<p class="mb-4">In the client settings tab:</p>
		<div class="mb-4 rounded-lg bg-green-50 p-4">
			<p class="text-green-800">
				<strong>Keycloak Callback URL:</strong> FlagFlow uses the callback URL
				<code>/auth/keycloak/callback</code> for OAuth authentication redirects.
			</p>
		</div>
		<CodeBlock
			code={`# Valid redirect URIs (include the callback path)
https://your-flagflow-domain.com/auth/keycloak/callback
https://your-flagflow-domain.com/*
http://localhost:3000/auth/keycloak/callback  # For development
http://localhost:3000/*                       # For development

# Web origins
https://your-flagflow-domain.com
http://localhost:3000    # For development

# Access Type: confidential
# Service Accounts: Enabled (if using service accounts)`}
			title="Client Redirect Configuration"
		/>
	</DocsPageSection>

	<DocsPageSection id="roles-permissions" title="Roles and Permissions">
		<h3 class="mb-3 text-lg font-semibold">1. Create Client Roles</h3>
		<p class="mb-4">
			Navigate to your client and create the following roles under the "Roles" tab:
		</p>
		<div class="overflow-x-auto">
			<table class="mb-4 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Role Name</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">flag-create</td>
						<td class="border border-gray-300 px-4 py-2"
							>Can create, rename/move, and delete flags</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">flag-schema</td>
						<td class="border border-gray-300 px-4 py-2">Can manage flag schemas</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">flag-value</td>
						<td class="border border-gray-300 px-4 py-2">Can manage flag values</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">users</td>
						<td class="border border-gray-300 px-4 py-2"
							>Can add, modify, or remove users and manage sessions</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">migration</td>
						<td class="border border-gray-300 px-4 py-2"
							>Can restore backups or execute migrations</td
						>
					</tr>
				</tbody>
			</table>
		</div>

		<h3 class="mb-3 text-lg font-semibold">2. Create Composite Roles</h3>
		<p class="mb-4">Create composite roles for common user types:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>flagflow-developer:</strong> Include <code>flag-value</code> role
			</li>
			<li>
				<strong>flagflow-admin:</strong> Include <code>flag-create</code>, <code>flag-schema</code>,
				<code>flag-value</code> roles
			</li>
			<li>
				<strong>flagflow-super-admin:</strong> Include all roles including <code>users</code> and
				<code>migration</code>
			</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="user-management" title="User Management">
		<h3 class="mb-3 text-lg font-semibold">1. Create Users</h3>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Navigate to "Users" in the left sidebar</li>
			<li>Click "Add user"</li>
			<li>Fill in user details (username, email, first name, last name)</li>
			<li>Enable the user and set email verification status</li>
			<li>Click "Create"</li>
		</ol>

		<h3 class="mb-3 text-lg font-semibold">2. Assign Roles to Users</h3>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Select the user from the users list</li>
			<li>Go to the "Role mapping" tab</li>
			<li>Click "Assign role"</li>
			<li>Select appropriate client roles or composite roles</li>
			<li>Click "Assign"</li>
		</ol>

		<h3 class="mb-3 text-lg font-semibold">3. Set User Passwords</h3>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>In the user details, go to the "Credentials" tab</li>
			<li>Click "Set password"</li>
			<li>Enter a temporary password</li>
			<li>Leave "Temporary" enabled for first-time users</li>
			<li>Click "Save"</li>
		</ol>
	</DocsPageSection>

	<DocsPageSection id="flagflow-configuration" title="FlagFlow Configuration">
		<p class="mb-4">Configure FlagFlow to use Keycloak authentication:</p>
		<CodeBlock
			code={`# Disable built-in user management
SESSION_USERS_ENABLED=false

# Keycloak configuration
KEYCLOAK_HOST=https://your-keycloak-domain.com
KEYCLOAK_REALM=flagflow
KEYCLOAK_CLIENT=flagflow-frontend

# Other standard configuration
LOGLEVEL=info
ENVIRONMENT=production
ETCD_SERVER=your-etcd-server:2379`}
			title="Environment Variables"
		/>

		<div class="mt-4 rounded-lg bg-yellow-50 p-4">
			<h3 class="mb-2 text-lg font-semibold text-yellow-800">Important Notes</h3>
			<ul class="list-inside list-disc space-y-1 text-yellow-700">
				<li>Ensure <code>SESSION_USERS_ENABLED=false</code> to disable built-in authentication</li>
				<li>
					The Keycloak host should be accessible from both FlagFlow server and client browsers
				</li>
				<li>Use HTTPS in production for security</li>
			</ul>
		</div>
	</DocsPageSection>

	<DocsPageSection id="testing" title="Testing the Integration">
		<h3 class="mb-3 text-lg font-semibold">1. Test Authentication Flow</h3>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Start FlagFlow with Keycloak configuration</li>
			<li>Navigate to your FlagFlow instance</li>
			<li>You should be redirected to Keycloak login page</li>
			<li>Login with a test user</li>
			<li>Verify successful redirect back to FlagFlow</li>
		</ol>

		<h3 class="mb-3 text-lg font-semibold">2. Verify Permissions</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Test that users can only access features based on their assigned roles</li>
			<li>Verify that unauthorized operations are properly blocked</li>
			<li>Check that role changes in Keycloak are reflected in FlagFlow</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="advanced-configuration" title="Advanced Configuration">
		<h3 class="mb-3 text-lg font-semibold">Group-Based Permissions</h3>
		<p class="mb-4">For larger organizations, use groups to manage permissions more efficiently:</p>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Create groups in Keycloak (e.g., "Developers", "Administrators")</li>
			<li>Assign roles to groups instead of individual users</li>
			<li>Add users to appropriate groups</li>
			<li>Users inherit permissions from their group memberships</li>
		</ol>

		<h3 class="mb-3 text-lg font-semibold">LDAP/Active Directory Integration</h3>
		<p class="mb-4">To integrate with existing directory services:</p>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Navigate to "User Federation" in Keycloak</li>
			<li>Add a new LDAP provider</li>
			<li>Configure connection settings and user mapping</li>
			<li>Test the connection and sync users</li>
			<li>Map LDAP groups to Keycloak roles</li>
		</ol>
	</DocsPageSection>

	<DocsPageSection id="troubleshooting" title="Troubleshooting">
		<div class="space-y-4">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Authentication Redirect Loop</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Check that redirect URIs are correctly configured in Keycloak client</li>
					<li>Verify that the Keycloak host is accessible from user browsers</li>
					<li>Ensure FlagFlow can reach the Keycloak server</li>
					<li>Check for conflicting session settings</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Permission Denied Errors</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Verify that users have the correct roles assigned</li>
					<li>Check role mapping in the Keycloak client</li>
					<li>Ensure role names match exactly between Keycloak and FlagFlow</li>
					<li>Test with a user that has all permissions</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Token Validation Failures</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Check that token signature verification is properly configured</li>
					<li>Verify realm and client configuration match FlagFlow settings</li>
					<li>Ensure clock synchronization between servers</li>
					<li>Check token expiration times and refresh token behavior</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>

	<DocsPageSection id="migration" title="Migration from Built-in Auth">
		<p class="mb-4">To migrate from FlagFlow's built-in authentication to Keycloak:</p>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Set up Keycloak and configure the FlagFlow client as described above</li>
			<li>Create user accounts in Keycloak matching your existing FlagFlow users</li>
			<li>Assign appropriate roles to each user based on their current permissions</li>
			<li>Test the Keycloak integration in a development environment</li>
			<li>Update production environment variables to enable Keycloak</li>
			<li>Set <code>SESSION_USERS_ENABLED=false</code> to disable built-in authentication</li>
			<li>Restart FlagFlow to apply the new authentication configuration</li>
		</ol>
		<div class="rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Migration Tip:</strong> Consider running both authentication methods temporarily during
				migration to ensure smooth transition for all users.
			</p>
		</div>
	</DocsPageSection>
</DocsPage>
