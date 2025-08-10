<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
	import Glossary from '$components/Glossary.svelte';
</script>

<DocsPage>
	<PageTitle title="Permissions System"
		>Understanding FlagFlow's granular permission model and role-based access control</PageTitle
	>

	<DocsPageSection id="overview" title="Permission Model Overview">
		<p class="mb-4">
			FlagFlow uses a granular permission system that allows fine-tuned control over what users can
			do within the system. Each permission grants access to specific operations, enabling
			administrators to create roles that match their organization's security requirements.
		</p>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Design Principle:</strong> Permissions are granular and specific, allowing you to grant
				only the minimum access required for each user role.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="core-permissions" title="Core Permissions">
		<p class="mb-4">
			FlagFlow defines the following core permissions that control access to different system
			operations:
		</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Permission</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Grants Access To</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm"
								><Glossary id="flag-create">flag-create</Glossary></code
							>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							Can create, rename/move, and delete <Glossary id="Feature Flag">flags</Glossary>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<ul class="list-inside list-disc text-sm">
								<li>Creating new <Glossary id="Feature Flag">feature flags</Glossary></li>
								<li>Renaming existing flags</li>
								<li>Moving flags between folders/categories</li>
								<li>Deleting flags permanently</li>
							</ul>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm"
								><Glossary id="flag-schema">flag-schema</Glossary></code
							>
						</td>
						<td class="border border-gray-300 px-4 py-2">Can manage flag schemas</td>
						<td class="border border-gray-300 px-4 py-2">
							<ul class="list-inside list-disc text-sm">
								<li>Modifying flag data types</li>
								<li>Adding/removing flag properties</li>
								<li>Changing <Glossary id="Validation Errors">validation rules</Glossary></li>
								<li>Updating flag metadata</li>
							</ul>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm"><Glossary id="flag-value">flag-value</Glossary></code>
						</td>
						<td class="border border-gray-300 px-4 py-2">Can manage flag values</td>
						<td class="border border-gray-300 px-4 py-2">
							<ul class="list-inside list-disc text-sm">
								<li>Enabling/disabling <Glossary id="Feature Flag">feature flags</Glossary></li>
								<li>Updating flag values</li>
								<li>Managing environment-specific values</li>
								<li>Setting <Glossary id="Percentage Rollout">percentage rollouts</Glossary></li>
							</ul>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm"><Glossary id="users">users</Glossary></code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							Can add, modify, or remove users and manage sessions
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<ul class="list-inside list-disc text-sm">
								<li>Creating new user accounts</li>
								<li>Modifying user details</li>
								<li>Deleting user accounts</li>
								<li>Managing active sessions</li>
								<li>Assigning permissions to users</li>
							</ul>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm"><Glossary id="migration">migration</Glossary></code>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							Can <Glossary id="Restore">restore backups</Glossary> or execute <Glossary
								id="Migration Steps">migrations</Glossary
							>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<ul class="list-inside list-disc text-sm">
								<li>Importing data from other FlagFlow instances</li>
								<li>Executing database migrations</li>
								<li>
									<Glossary id="Restore">Restoring</Glossary> from <Glossary id="Export"
										>backup files</Glossary
									>
								</li>
								<li>System maintenance operations</li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="public-access" title="Public Access (No Authentication Required)">
		<p class="mb-4">
			Certain operations in FlagFlow are publicly accessible without authentication to enable
			seamless integration with applications:
		</p>
		<div class="rounded-lg bg-green-50 p-4">
			<h3 class="mb-2 text-lg font-semibold text-green-800">Publicly Accessible Operations</h3>
			<ul class="list-inside list-disc space-y-1 text-green-700">
				<li><strong>Reading flag values</strong> - Applications can fetch current flag states</li>
				<li><strong>Viewing flag schemas</strong> - Applications can understand flag structure</li>
				<li><strong>Environment information</strong> - Basic environment metadata</li>
			</ul>
		</div>
		<p class="mt-4 text-sm text-gray-600">
			This design allows applications to integrate with FlagFlow without requiring authentication
			credentials while keeping all administrative operations secure.
		</p>
	</DocsPageSection>

	<DocsPageSection id="role-examples" title="Common Role Examples">
		<p class="mb-4">Here are typical user roles and their recommended permission combinations:</p>
		<div class="space-y-4">
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Developer</h3>
				<p class="mb-2 text-gray-600">Can modify flag values during development and testing</p>
				<div class="mb-2">
					<span class="inline-block rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
						>flag-value</span
					>
				</div>
				<p class="text-sm text-gray-600">
					Typical use: Developers can enable/disable features and adjust flag values for testing
					purposes.
				</p>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Senior Developer / Architect</h3>
				<p class="mb-2 text-gray-600">Can modify flag schemas and values</p>
				<div class="mb-2 space-x-2">
					<span class="inline-block rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
						>flag-value</span
					>
					<span class="inline-block rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
						>flag-schema</span
					>
				</div>
				<p class="text-sm text-gray-600">
					Typical use: Senior developers can modify flag structure and data types in addition to
					values.
				</p>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Product Manager</h3>
				<p class="mb-2 text-gray-600">Can create and manage feature flags</p>
				<div class="mb-2 space-x-2">
					<span class="inline-block rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
						>flag-create</span
					>
					<span class="inline-block rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
						>flag-value</span
					>
				</div>
				<p class="text-sm text-gray-600">
					Typical use: Product managers can create new feature flags and control their rollout.
				</p>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">Team Lead</h3>
				<p class="mb-2 text-gray-600">Full flag management capabilities</p>
				<div class="mb-2 space-x-2">
					<span class="inline-block rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
						>flag-create</span
					>
					<span class="inline-block rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
						>flag-schema</span
					>
					<span class="inline-block rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
						>flag-value</span
					>
				</div>
				<p class="text-sm text-gray-600">
					Typical use: Team leads have full control over feature flag lifecycle and management.
				</p>
			</div>

			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">System Administrator</h3>
				<p class="mb-2 text-gray-600">Complete system access including user management</p>
				<div class="mb-2 space-x-2">
					<span class="inline-block rounded bg-red-100 px-2 py-1 font-mono text-sm text-red-800"
						>users</span
					>
					<span class="inline-block rounded bg-red-100 px-2 py-1 font-mono text-sm text-red-800"
						>migration</span
					>
					<span class="inline-block rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
						>flag-create</span
					>
					<span class="inline-block rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
						>flag-schema</span
					>
					<span class="inline-block rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800"
						>flag-value</span
					>
				</div>
				<p class="text-sm text-gray-600">
					Typical use: System administrators manage the entire FlagFlow instance including users and
					system operations.
				</p>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="permission-assignment" title="Assigning Permissions">
		<h3 class="mb-3 text-lg font-semibold">Built-in User Management</h3>
		<p class="mb-4">
			When using FlagFlow's built-in user management, permissions are assigned through the web
			interface:
		</p>
		<ol class="mb-6 list-inside list-decimal space-y-2">
			<li>Navigate to the <strong>Users</strong> section</li>
			<li>Select the user you want to modify</li>
			<li>Click <strong>Edit Permissions</strong></li>
			<li>Check the permissions you want to grant</li>
			<li>Save the changes</li>
		</ol>

		<h3 class="mb-3 text-lg font-semibold">Keycloak Integration</h3>
		<p class="mb-4">
			When using Keycloak, permissions are managed through client roles that map to FlagFlow
			permissions:
		</p>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Create client roles in Keycloak matching FlagFlow permission names</li>
			<li>Assign roles to users or groups</li>
			<li>FlagFlow automatically maps Keycloak roles to permissions</li>
		</ol>
		<CodeBlock
			code={`# Example: Creating roles in Keycloak client
flag-create     -> FlagFlow permission: flag-create
flag-schema     -> FlagFlow permission: flag-schema
flag-value      -> FlagFlow permission: flag-value
users           -> FlagFlow permission: users
migration       -> FlagFlow permission: migration`}
			title="Keycloak Role Mapping"
		/>
	</DocsPageSection>

	<DocsPageSection id="permission-hierarchy" title="Permission Hierarchy and Dependencies">
		<p class="mb-4">
			While FlagFlow permissions are generally independent, some operations may require multiple
			permissions or have logical dependencies:
		</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Operation</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Required Permissions</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Notes</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2">Create a new flag</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">flag-create</code>
						</td>
						<td class="border border-gray-300 px-4 py-2"
							>Includes setting initial schema and values</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">Modify existing flag structure</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">flag-schema</code>
						</td>
						<td class="border border-gray-300 px-4 py-2"
							>May require flag-value to set new defaults</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">Update flag values only</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">flag-value</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">Most common day-to-day operation</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">Delete a flag</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">flag-create</code>
						</td>
						<td class="border border-gray-300 px-4 py-2"
							>Deletion is part of flag lifecycle management</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">Manage user permissions</td>
						<td class="border border-gray-300 px-4 py-2">
							<code class="font-mono text-sm">users</code>
						</td>
						<td class="border border-gray-300 px-4 py-2">High-privilege operation</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="security-best-practices" title="Security Best Practices">
		<h3 class="mb-3 text-lg font-semibold">Principle of Least Privilege</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Grant users only the minimum permissions required for their role</li>
			<li>Regularly review and audit user permissions</li>
			<li>Remove permissions when users change roles or leave the organization</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Permission Separation</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Development vs Production:</strong> Consider different permission sets for different
				environments
			</li>
			<li>
				<strong>Operational Separation:</strong> Separate schema management from value management where
				possible
			</li>
			<li>
				<strong>Administrative Separation:</strong> Limit <code>users</code> and
				<code>migration</code> permissions to trusted administrators
			</li>
		</ul>

		<h3 class="mb-3 text-lg font-semibold">Monitoring and Auditing</h3>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Enable comprehensive logging of all administrative operations</li>
			<li>Monitor flag changes and correlate with user permissions</li>
			<li>Set up alerts for sensitive operations like user management or migrations</li>
			<li>Regularly review access logs and permission usage</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="troubleshooting-permissions" title="Troubleshooting Permissions">
		<div class="space-y-4">
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">"Access Denied" Errors</h4>
				<ol class="list-inside list-decimal space-y-1 text-sm">
					<li>Verify the user has the required permission for the operation</li>
					<li>Check that the user is properly authenticated</li>
					<li>Ensure permissions are correctly assigned (built-in users) or mapped (Keycloak)</li>
					<li>Test with a user that has all permissions to isolate the issue</li>
				</ol>
			</div>

			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Permission Changes Not Taking Effect</h4>
				<ol class="list-inside list-decimal space-y-1 text-sm">
					<li>For built-in users: Changes are immediate, try refreshing the page</li>
					<li>For Keycloak: Token refresh may be required - have user logout and login again</li>
					<li>Check browser cache and clear if necessary</li>
					<li>Verify the permission assignment was saved correctly</li>
				</ol>
			</div>

			<div class="rounded-lg border p-4">
				<h4 class="mb-2 font-semibold">Unexpected Permission Behavior</h4>
				<ol class="list-inside list-decimal space-y-1 text-sm">
					<li>Check logs for permission verification errors</li>
					<li>Verify permission names match exactly (case-sensitive)</li>
					<li>For Keycloak: Ensure client role mapping is correct</li>
					<li>Test with a fresh user account to rule out cached permission issues</li>
				</ol>
			</div>
		</div>
	</DocsPageSection>
</DocsPage>
