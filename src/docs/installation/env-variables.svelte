<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Environment Variables"
		>Configure FlagFlow using environment variables for different deployment scenarios</PageTitle
	>

	<DocsPageSection id="overview" title="Overview">
		<p class="mb-4">
			FlagFlow uses environment variables for configuration, making it easy to deploy across
			different environments. The application supports <code>.env</code> files in development and direct
			environment variable configuration in production.
		</p>
		<p class="mb-4">
			Configuration is loaded using <code>@dotenvx/dotenvx</code> in development and the
			<code>env-var</code> library for validation and type conversion.
		</p>
	</DocsPageSection>

	<DocsPageSection id="core" title="Core Configuration">
		<h3 class="mb-3 text-lg font-semibold">General Settings</h3>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Variable</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Default</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">LOGLEVEL</td>
						<td class="border border-gray-300 px-4 py-2">info</td>
						<td class="border border-gray-300 px-4 py-2"
							>Logging level (debug, info, warn, error)</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">ENVIRONMENT</td>
						<td class="border border-gray-300 px-4 py-2">"" (empty)</td>
						<td class="border border-gray-300 px-4 py-2"
							>Current environment (dev, staging, prod) displayed in the UI</td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">NODE_ENV</td>
						<td class="border border-gray-300 px-4 py-2">production</td>
						<td class="border border-gray-300 px-4 py-2"
							>Node.js environment always "production" in Docker image</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="etcd" title="etcd Configuration">
		<p class="mb-4">Configure the etcd key-value store connection:</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Variable</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Default</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">ETCD_SERVER</td>
						<td class="border border-gray-300 px-4 py-2">localhost:2379</td>
						<td class="border border-gray-300 px-4 py-2">etcd server endpoint</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">ETCD_USERNAME</td>
						<td class="border border-gray-300 px-4 py-2">-</td>
						<td class="border border-gray-300 px-4 py-2">etcd authentication username</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">ETCD_PASSWORD</td>
						<td class="border border-gray-300 px-4 py-2">-</td>
						<td class="border border-gray-300 px-4 py-2">etcd authentication password</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">ETCD_NAMESPACE</td>
						<td class="border border-gray-300 px-4 py-2">default</td>
						<td class="border border-gray-300 px-4 py-2">
							etcd key namespace for data isolation
							<small class="text-gray-500">
								<br />
								Every FlagFlow instance should use a unique namespace in the same etcd cluster to avoid
								data collisions
							</small>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="keycloak" title="Keycloak Authentication">
		<p class="mb-4">Configure Keycloak for user authentication and authorization:</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Variable</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Default</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">KEYCLOAK_HOST</td>
						<td class="border border-gray-300 px-4 py-2">-</td>
						<td class="border border-gray-300 px-4 py-2"
							>Keycloak server URL
							<small class="text-gray-500">
								<br />
								If this value is set, FlagFlow will allow Keycloak for authentication
							</small>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">KEYCLOAK_REALM</td>
						<td class="border border-gray-300 px-4 py-2">master</td>
						<td class="border border-gray-300 px-4 py-2">Keycloak realm name</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">KEYCLOAK_CLIENT</td>
						<td class="border border-gray-300 px-4 py-2">flagflow-frontend</td>
						<td class="border border-gray-300 px-4 py-2">Keycloak client ID</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="session" title="Session Management">
		<p class="mb-4">Configure user session behavior:</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Variable</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Default</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">SESSION_ENABLED</td>
						<td class="border border-gray-300 px-4 py-2">true</td>
						<td class="border border-gray-300 px-4 py-2"
							>Enable/disable session management
							<small class="text-gray-500">
								<br />
								This allows in-built user management and session handling
							</small>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">SESSION_TIMEOUT_SEC</td>
						<td class="border border-gray-300 px-4 py-2">1800</td>
						<td class="border border-gray-300 px-4 py-2">Session timeout in seconds (30 minutes)</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="metrics" title="Metrics and Monitoring">
		<p class="mb-4">Configure application metrics collection:</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Variable</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Default</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">METRICS_ENABLED</td>
						<td class="border border-gray-300 px-4 py-2">false</td>
						<td class="border border-gray-300 px-4 py-2"
							>Enable Prometheus metrics collection and endpoint</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="migration" title="Data Migration">
		<p class="mb-4">Configure data migration from other FlagFlow instances:</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Variable</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Default</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm"
							>MIGRATION_SOURCE_URL
						</td>
						<td class="border border-gray-300 px-4 py-2">"" (empty)</td>
						<td class="border border-gray-300 px-4 py-2"
							>Source FlagFlow instance URL
							<small class="text-gray-500">
								<br />
								This allows migrating data from another FlagFlow instance
							</small>
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm"
							>MIGRATION_SOURCE_ENVIRONMENT</td
						>
						<td class="border border-gray-300 px-4 py-2">"" (empty)</td>
						<td class="border border-gray-300 px-4 py-2">Source environment name for migration</td>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="development" title="Development Settings">
		<p class="mb-4">Development and debugging configuration:</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Variable</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Default</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-mono text-sm">DEV_RPC_SLOWDOWN_MS</td>
						<td class="border border-gray-300 px-4 py-2">-</td>
						<td class="border border-gray-300 px-4 py-2"
							>Add artificial delay to RPC calls (development only!)</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="examples" title="Configuration Examples">
		<h3 class="mb-3 text-lg font-semibold">Development .env file</h3>
		<p class="mb-4">
			Create a <code>.env</code> file in your project root for local development:
		</p>

		<CodeBlock
			code={`# Core Configuration
LOGLEVEL=debug
ENVIRONMENT=development

# etcd Configuration
ETCD_SERVER=localhost:2379
ETCD_USERNAME=root
ETCD_PASSWORD=your-etcd-password
ETCD_NAMESPACE=flagflow-dev

# Keycloak Authentication (optional)
# KEYCLOAK_HOST=https://your-keycloak.com
# KEYCLOAK_REALM=flagflow
# KEYCLOAK_CLIENT=flagflow-frontend

# Session Configuration
SESSION_ENABLED=true
SESSION_TIMEOUT_SEC=3600

# Metrics
METRICS_ENABLED=true

# Development Settings
DEV_RPC_SLOWDOWN_MS=100`}
			title=".env"
		/>

		<h3 class="mt-8 mb-3 text-lg font-semibold">Production Environment Variables</h3>
		<p class="mb-4">For production deployment, set these environment variables:</p>

		<CodeBlock
			code={`# Core Configuration
NODE_ENV=production
LOGLEVEL=info
ENVIRONMENT=production

# etcd Configuration
ETCD_SERVER=etcd.production.internal:2379
ETCD_USERNAME=flagflow-prod
ETCD_PASSWORD=secure-password-here
ETCD_NAMESPACE=flagflow-prod

# Keycloak Authentication
KEYCLOAK_HOST=https://auth.yourcompany.com
KEYCLOAK_REALM=company
KEYCLOAK_CLIENT=flagflow

# Session Configuration
SESSION_ENABLED=true
SESSION_TIMEOUT_SEC=1800

# Metrics
METRICS_ENABLED=true`}
			title="Production Environment Variables"
		/>

		<h3 class="mt-8 mb-3 text-lg font-semibold">Docker Environment Variables</h3>
		<p class="mb-4">Example for Docker Compose or Kubernetes deployment:</p>

		<CodeBlock
			code={`environment:
  - NODE_ENV=production
  - LOGLEVEL=info
  - ENVIRONMENT=docker
  - ETCD_SERVER=etcd:2379
  - ETCD_USERNAME=root
  - ETCD_PASSWORD=pw_flagflow
  - ETCD_NAMESPACE=flagflow
  - SESSION_ENABLED=true
  - SESSION_TIMEOUT_SEC=1800
  - METRICS_ENABLED=true`}
			title="docker-compose.yml environment section"
		/>
	</DocsPageSection>

	<DocsPageSection id="validation" title="Variable Validation">
		<p class="mb-4">
			FlagFlow uses the <code>env-var</code> library for environment variable validation:
		</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Required variables:</strong> Application will fail to start if missing</li>
			<li><strong>Type validation:</strong> Boolean, integer, and string validation</li>
			<li><strong>Default values:</strong> Sensible defaults for optional variables</li>
			<li>
				<strong>Positive integers:</strong> Variables like <code>SESSION_TIMEOUT_SEC</code> must be positive
			</li>
		</ul>

		<p class="mb-4">
			If a required variable is missing or invalid, you'll see a clear error message during startup:
		</p>

		<CodeBlock
			code={`EnvVarError: "ETCD_SERVER" is required
    at /app/node_modules/env-var/dist/env-var.js:142:23
    at EnvVar.required (/app/node_modules/env-var/dist/env-var.js:171:19)`}
			title="Example validation error"
		/>
	</DocsPageSection>

	<DocsPageSection id="security" title="Security Considerations">
		<p class="mb-4">When working with environment variables containing sensitive data:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Never commit .env files</strong> to version control</li>
			<li>
				<strong>Use secrets management</strong> in production (Kubernetes Secrets, AWS Secrets Manager,
				etc.)
			</li>
			<li><strong>Rotate passwords regularly</strong>, especially etcd and Keycloak credentials</li>
			<li><strong>Use strong passwords</strong> for etcd authentication</li>
			<li><strong>Limit access</strong> to environment configuration in deployment systems</li>
		</ul>

		<CodeBlock
			code={`# Environment variables
.env
.env.local
.env.*.local`}
			title=".gitignore entry"
		/>
	</DocsPageSection>
</DocsPage>
