<script lang="ts">
	import { resolve } from '$app/paths';
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageRoundedBox from '$components/docs/DocsPageRoundedBox.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="REST API">
		Comprehensive REST API with OpenAPI 3.0 specification for external integrations and automation
	</PageTitle>

	<DocsPageSection id="overview" title="Overview">
		<p class="mb-4">
			FlagFlow provides a comprehensive REST API with OpenAPI 3.0 specification for external
			integrations, automation workflows, and CI/CD pipelines. All API endpoints are protected with
			JWT Bearer authentication and provide complete CRUD operations for users, sessions, flags, and
			migrations.
		</p>
		<div class="mb-4 rounded-lg bg-green-50 p-4">
			<p class="text-green-800">
				<strong>OpenAPI 3.0 Specification:</strong> Full API documentation is available at
				<code>/api/openapi.json</code> endpoint with interactive exploration capabilities.
			</p>
		</div>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Endpoint Groups:</strong> The REST API organizes endpoints into four main groups: authentication,
				flag management, session management, and migration operations.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="authentication" title="Authentication">
		<div class="mb-4 rounded-lg bg-yellow-50 p-4">
			<p class="text-yellow-800">
				<strong>Important:</strong> The REST API only works with FlagFlow's built-in user management
				system. JWT Bearer tokens from Keycloak authentication cannot be used with REST API
				endpoints. You must create users through the
				<a
					class="text-blue-600 hover:underline"
					href={resolve('/docs/user-management/built-in-users', {})}
				>
					built-in user management system
				</a> to access the REST API.
			</p>
		</div>
		<p class="mb-4">
			All REST API endpoints (except <code>/api/login</code>) require JWT Bearer token
			authentication from the built-in user system. Obtain tokens through the login endpoint and
			include them in the Authorization header for all operations.
		</p>

		<h3 class="mb-3 text-lg font-semibold">Login and Token Acquisition</h3>
		<p class="mb-3 text-sm text-gray-600">
			The login endpoint authenticates users created through FlagFlow's built-in user management
			system only. Keycloak users cannot authenticate via this endpoint.
		</p>
		<CodeBlock
			code={`# Request
POST /api/login
Content-Type: application/json

{
  "username": "admin",
  "password": "your-password"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id",
    "username": "admin",
    "permissions": ["flag:read", "flag:write", ...]
  }
}`}
			title="Authentication Login"
		/>

		<h3 class="mb-3 text-lg font-semibold">Using Bearer Tokens</h3>
		<CodeBlock
			code={`# Include token in Authorization header for protected endpoints
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     -X GET http://localhost:3000/api/users`}
			title="Bearer Token Usage"
		/>
	</DocsPageSection>

	<DocsPageSection id="endpoints" title="API Endpoint Groups">
		<p class="mb-4">
			The REST API organizes endpoints into four main groups. All endpoints require JWT Bearer
			authentication except for the login endpoint.
		</p>

		<h3 class="mb-3 text-lg font-semibold">Authentication Group</h3>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Method</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Endpoint</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Auth</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>POST</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/login</code></td>
						<td class="border border-gray-300 px-4 py-2">Authenticate and obtain JWT token</td>
						<td class="border border-gray-300 px-4 py-2">None</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>GET</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/users</code></td>
						<td class="border border-gray-300 px-4 py-2">List all users</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>POST</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/users</code></td>
						<td class="border border-gray-300 px-4 py-2">Create new user</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>GET</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/users/{'{userId}'}</code></td>
						<td class="border border-gray-300 px-4 py-2">Get user by ID</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>PUT</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/users/{'{userId}'}</code></td>
						<td class="border border-gray-300 px-4 py-2">Update user</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>DELETE</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/users/{'{userId}'}</code></td>
						<td class="border border-gray-300 px-4 py-2">Delete user</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3 class="mb-3 text-lg font-semibold">Flag Group</h3>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Method</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Endpoint</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Auth</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>GET</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/flags</code></td>
						<td class="border border-gray-300 px-4 py-2">List all flags with metadata</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>POST</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/flags</code></td>
						<td class="border border-gray-300 px-4 py-2">Create new flag</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>GET</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/flags/{'{flagName}'}</code></td>
						<td class="border border-gray-300 px-4 py-2">Get flag details</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>PUT</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/flags/{'{flagName}'}</code></td>
						<td class="border border-gray-300 px-4 py-2">Update flag</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>DELETE</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/flags/{'{flagName}'}</code></td>
						<td class="border border-gray-300 px-4 py-2">Delete flag</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3 class="mb-3 text-lg font-semibold">Session Group</h3>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Method</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Endpoint</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Auth</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>GET</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/sessions</code></td>
						<td class="border border-gray-300 px-4 py-2">List active sessions</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>DELETE</code></td>
						<td class="border border-gray-300 px-4 py-2"
							><code>/api/sessions/{'{sessionId}'}</code></td
						>
						<td class="border border-gray-300 px-4 py-2">Terminate session</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3 class="mb-3 text-lg font-semibold">Migration Group</h3>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Method</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Endpoint</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Auth</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>GET</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/migrations/export</code></td>
						<td class="border border-gray-300 px-4 py-2">Export flags as migration file</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>PUT</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/migrations</code></td>
						<td class="border border-gray-300 px-4 py-2">Execute migration from file upload</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>PATCH</code></td>
						<td class="border border-gray-300 px-4 py-2"><code>/api/migrations</code></td>
						<td class="border border-gray-300 px-4 py-2">Execute migration from remote URL</td>
						<td class="border border-gray-300 px-4 py-2">Bearer</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="examples" title="Usage Examples">
		<h3 class="mb-3 text-lg font-semibold">Authentication Group Examples</h3>
		<CodeBlock
			code={`# Login to get JWT token
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "your-password"
  }'

# Create a new user
curl -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "developer",
    "password": "secure-password",
    "permissions": ["flag:read", "flag:write"]
  }'

# List all users
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update user permissions
curl -X PUT http://localhost:3000/api/users/user-123 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "permissions": ["flag:read", "flag:write", "user:read"]
  }'`}
			title="Authentication Group Examples"
		/>

		<h3 class="mb-3 text-lg font-semibold">Flag Group Examples</h3>
		<CodeBlock
			code={`# Create a new boolean flag
curl -X POST http://localhost:3000/api/flags \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "features/new-dashboard",
    "type": "BOOLEAN",
    "value": false,
    "description": "Enable new dashboard layout"
  }'

# List all flags with metadata
curl -X GET http://localhost:3000/api/flags \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get specific flag details
curl -X GET http://localhost:3000/api/flags/features/new-dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update flag value
curl -X PUT http://localhost:3000/api/flags/features/new-dashboard \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "value": true
  }'

# Delete flag
curl -X DELETE http://localhost:3000/api/flags/features/new-dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"`}
			title="Flag Group Examples"
		/>

		<h3 class="mb-3 text-lg font-semibold">Session Group Examples</h3>
		<CodeBlock
			code={`# List active sessions
curl -X GET http://localhost:3000/api/sessions \
  -H "Authorization: Bearer YOUR_TOKEN"

# Terminate a specific session
curl -X DELETE http://localhost:3000/api/sessions/session-abc123 \
  -H "Authorization: Bearer YOUR_TOKEN"`}
			title="Session Group Examples"
		/>

		<h3 class="mb-3 text-lg font-semibold">Migration Group Examples</h3>
		<CodeBlock
			code={`# Export all flags to migration file
curl -X GET http://localhost:3000/api/migrations/export \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o flags-backup.json

# Import flags from file upload
curl -X PUT http://localhost:3000/api/migrations \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d @flags-backup.json

# Import flags from remote URL
curl -X PATCH http://localhost:3000/api/migrations \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/flags-export.json"
  }'`}
			title="Migration Group Examples"
		/>
	</DocsPageSection>

	<DocsPageSection id="openapi" title="OpenAPI Specification">
		<p class="mb-4">
			FlagFlow provides a complete OpenAPI 3.0 specification for the REST API, enabling automatic
			client generation and interactive exploration.
		</p>

		<h3 class="mb-3 text-lg font-semibold">Accessing the OpenAPI Spec</h3>
		<CodeBlock
			code={`# Get the OpenAPI 3.0 specification
GET http://localhost:3000/api/openapi.json

# The specification includes:
# - All endpoint definitions
# - Request/response schemas
# - Authentication requirements
# - Error response formats
# - Example payloads`}
			title="OpenAPI Specification Access"
		/>

		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Interactive API Explorer:</strong> Use the OpenAPI specification with tools like Swagger
				UI, Postman, or Insomnia for interactive API exploration and testing.
			</p>
		</div>

		<h3 class="mb-3 text-lg font-semibold">Client Generation</h3>
		<CodeBlock
			code={`# Generate TypeScript client
npx @openapitools/openapi-generator-cli generate \
  -i http://localhost:3000/api/openapi.json \
  -g typescript-fetch \
  -o ./src/api-client

# Generate Python client
openapi-generator generate \
  -i http://localhost:3000/api/openapi.json \
  -g python \
  -o ./flagflow-client`}
			title="Client Generation Examples"
		/>
	</DocsPageSection>

	<DocsPageSection id="error-handling" title="Error Handling">
		<p class="mb-4">
			The REST API provides consistent error responses with detailed information for debugging and
			error handling in client applications.
		</p>

		<h3 class="mb-3 text-lg font-semibold">Error Response Format</h3>
		<CodeBlock
			code={`# Standard error response format
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Validation failed",
    "details": {
      "field": "username",
      "reason": "Username is required"
    }
  }
}`}
			title="Error Response Structure"
		/>

		<h3 class="mb-3 text-lg font-semibold">Common HTTP Status Codes</h3>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Status Code</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Common Causes</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>400</code></td>
						<td class="border border-gray-300 px-4 py-2">Bad Request</td>
						<td class="border border-gray-300 px-4 py-2">Invalid JSON, validation errors</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>401</code></td>
						<td class="border border-gray-300 px-4 py-2">Unauthorized</td>
						<td class="border border-gray-300 px-4 py-2">Missing or invalid JWT token</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>403</code></td>
						<td class="border border-gray-300 px-4 py-2">Forbidden</td>
						<td class="border border-gray-300 px-4 py-2">Insufficient permissions</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>404</code></td>
						<td class="border border-gray-300 px-4 py-2">Not Found</td>
						<td class="border border-gray-300 px-4 py-2">Resource does not exist</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2"><code>409</code></td>
						<td class="border border-gray-300 px-4 py-2">Conflict</td>
						<td class="border border-gray-300 px-4 py-2">Resource already exists</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="best-practices" title="Best Practices">
		<div class="grid gap-6 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Authentication</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Store JWT tokens securely</li>
					<li>Implement token refresh logic</li>
					<li>Handle authentication failures gracefully</li>
					<li>Use HTTPS in production</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Error Handling</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Always check HTTP status codes</li>
					<li>Parse error response details</li>
					<li>Implement retry logic for transient failures</li>
					<li>Log API errors for debugging</li>
				</ul>
			</DocsPageRoundedBox>
		</div>

		<div class="mt-4 rounded-lg bg-yellow-50 p-4">
			<h4 class="mb-2 text-lg font-semibold text-yellow-800">Integration Tips</h4>
			<ul class="list-inside list-disc space-y-1 text-yellow-700">
				<li>
					<strong>CI/CD Integration:</strong> Use the REST API for automated flag management in deployment
					pipelines
				</li>
				<li>
					<strong>Environment Sync:</strong> Use migration endpoints to synchronize flags across environments
				</li>
				<li>
					<strong>Monitoring:</strong> Set up monitoring for API rate limits and error rates
				</li>
				<li>
					<strong>Documentation:</strong> Keep your API integration documentation updated with the OpenAPI
					spec
				</li>
			</ul>
		</div>
	</DocsPageSection>

	<DocsPageSection id="related-documentation" title="Related Documentation">
		<p class="mb-4">Explore these related topics for comprehensive FlagFlow REST API usage:</p>
		<div class="grid gap-4 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">
					<a
						class="text-blue-600 hover:underline"
						href={resolve('/docs/user-management/authentication', {})}
					>
						Authentication
					</a>
				</h4>
				<p class="text-sm text-gray-600">
					Understand FlagFlow's authentication system and permission model.
				</p>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">
					<a
						class="text-blue-600 hover:underline"
						href={resolve('/docs/user-management/permissions', {})}
					>
						Permissions
					</a>
				</h4>
				<p class="text-sm text-gray-600">
					Understand role-based access control and permission requirements.
				</p>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">
					<a class="text-blue-600 hover:underline" href={resolve('/docs/migration/migration', {})}>
						Migration System
					</a>
				</h4>
				<p class="text-sm text-gray-600">
					Learn about flag migration and backup/restore operations via API.
				</p>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">
					<a class="text-blue-600 hover:underline" href={resolve('/docs/flags/flag-types', {})}>
						Flag Types
					</a>
				</h4>
				<p class="text-sm text-gray-600">
					Understand different flag types you can manage via the REST API.
				</p>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>
</DocsPage>
