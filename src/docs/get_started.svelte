<script lang="ts">
	/* eslint-disable no-undef */
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';

	import { ETCD_IMAGE } from './ETCD_VERSION';
</script>

<DocsPage>
	<PageTitle subTitle="FlagFlow documentation" title="Get Started">
		Your complete guide to setting up and using FlagFlow for feature flag management
	</PageTitle>

	<DocsPageSection id="what-is-flagflow" title="What is FlagFlow?">
		<p class="mb-4">
			FlagFlow is a powerful, self-hosted feature flag management platform that enables teams to:
		</p>
		<div class="mb-6 grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">🚀 Deploy Features Safely</h3>
				<p class="text-gray-600">
					Control feature releases with toggles, percentage rollouts, and kill switches
				</p>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">⚡ Real-time Updates</h3>
				<p class="text-gray-600">
					Instant flag updates using etcd's watch API for zero-downtime changes
				</p>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">🔧 Type Safety</h3>
				<p class="text-gray-600">
					Full TypeScript support with automatic IntelliSense and schema validation
				</p>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">🏢 Enterprise Ready</h3>
				<p class="text-gray-600">
					Built-in authentication, Keycloak integration, and granular permissions
				</p>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="quick-start" title="Quick Start">
		<p class="mb-4">
			Get FlagFlow running in minutes with Docker. This setup is perfect for development, testing,
			or small production deployments.
		</p>

		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Prerequisites:</strong> Make sure you have Docker and Docker Compose installed on your
				system.
			</p>
		</div>

		<h3 class="mb-3 text-lg font-semibold">Step 1: Download Docker Compose Configuration</h3>
		<CodeBlock
			code={`# Create project directory
mkdir flagflow
cd flagflow

# Download docker-compose.yml
curl -o docker-compose.yml https://raw.githubusercontent.com/flagflow/flagflow/main/docker-compose.yml

# Or create manually:
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  etcd:
    image: ${ETCD_IMAGE}
    environment:
      - ALLOW_NONE_AUTHENTICATION=yes
      - ETCD_ADVERTISE_CLIENT_URLS=http://etcd:2379
    volumes:
      - etcd_data:/bitnami/etcd
    networks:
      - flagflow

  flagflow:
    image: ghcr.io/flagflow/flagflow:${__APP_VERSION__}
    ports:
      - "3000:3000"
    environment:
      - ETCD_SERVER=etcd:2379
      - ENVIRONMENT=docker
      - SESSION_USERS_ENABLED=true
      - SESSION_DEFAULT_USERNAME=admin
      - SESSION_DEFAULT_PASSWORD=admin123
    depends_on:
      - etcd
    networks:
      - flagflow

volumes:
  etcd_data:

networks:
  flagflow:
EOF`}
			title="Docker Setup"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Step 2: Start FlagFlow</h3>
		<CodeBlock
			code={`# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f flagflow`}
			title="Start Services"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">Step 3: Access FlagFlow</h3>
		<p class="mb-4">Open your browser and navigate to:</p>
		<div class="mb-4 rounded-lg bg-green-50 p-4">
			<p class="text-green-800">
				<strong>🌐 URL:</strong> <code>http://localhost:3000</code><br />
				<strong>👤 Username:</strong> <code>admin</code><br />
				<strong>🔑 Password:</strong> <code>admin123</code>
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="your-first-flag" title="Creating Your First Feature Flag">
		<p class="mb-4">Let's create a simple boolean flag to toggle a feature in your application.</p>

		<h3 class="mb-3 text-lg font-semibold">1. Create a Feature Flag</h3>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Click the <strong>"+"</strong> button to create a new flag</li>
			<li>Enter flag name: <code>enable_new_dashboard</code></li>
			<li>Select type: <strong>BOOLEAN</strong></li>
			<li>Set description: <em>"Enable the redesigned dashboard interface"</em></li>
			<li>Set default value: <strong>false</strong></li>
			<li>Click <strong>Save</strong></li>
		</ol>

		<h3 class="mb-3 text-lg font-semibold">2. Test the Flag Value</h3>
		<p class="mb-4">You can immediately test your flag using the public API:</p>
		<CodeBlock
			code={`# Get flag value (returns default: false)
curl http://localhost:3000/flag/enable_new_dashboard

# Response:
# {"value": false}

# Get all flags
curl http://localhost:3000/flags

# Get flag schema for TypeScript generation
curl http://localhost:3000/api/schema`}
			title="Testing Flag API"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">3. Update Flag Value</h3>
		<p class="mb-4">Enable the flag through the web interface:</p>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>Click on the <code>enable_new_dashboard</code> flag</li>
			<li>Toggle the switch to <strong>ON</strong></li>
			<li>Click <strong>Save</strong></li>
			<li>Test again: <code>curl http://localhost:3000/flag/enable_new_dashboard</code></li>
		</ol>
	</DocsPageSection>

	<DocsPageSection id="flag-types" title="Understanding Flag Types">
		<p class="mb-4">FlagFlow supports multiple flag types to handle different use cases:</p>
		<div class="overflow-x-auto">
			<table class="mb-6 w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Type</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Use Case</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Example Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2">BOOLEAN</td>
						<td class="border border-gray-300 px-4 py-2">Simple on/off features, kill switches</td>
						<td class="border border-gray-300 px-4 py-2"><code>true</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">INTEGER</td>
						<td class="border border-gray-300 px-4 py-2">Numeric configuration, limits, timeouts</td
						>
						<td class="border border-gray-300 px-4 py-2"><code>100</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">STRING</td>
						<td class="border border-gray-300 px-4 py-2"
							>Text configuration, API endpoints, messages</td
						>
						<td class="border border-gray-300 px-4 py-2"><code>"api.example.com"</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">ENUM</td>
						<td class="border border-gray-300 px-4 py-2"
							>Select one option from predefined choices</td
						>
						<td class="border border-gray-300 px-4 py-2"
							><code>"dark"</code> from <code>["light", "dark", "auto"]</code></td
						>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">TAG</td>
						<td class="border border-gray-300 px-4 py-2">Multiple selections, feature modules</td>
						<td class="border border-gray-300 px-4 py-2"><code>["analytics", "chat"]</code></td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2">AB-TEST</td>
						<td class="border border-gray-300 px-4 py-2">A/B testing, split testing</td>
						<td class="border border-gray-300 px-4 py-2"
							><code>"A"</code> or <code>"B"</code> (25% get B)</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="integration" title="Integrating with Your Application">
		<p class="mb-4">FlagFlow provides multiple ways to integrate with your applications:</p>

		<h3 class="mb-3 text-lg font-semibold">Simple HTTP API</h3>
		<p class="mb-4">Use the REST API directly from any programming language:</p>
		<CodeBlock
			code={`// JavaScript/Node.js example
const response = await fetch('http://localhost:3000/flag/enable_new_dashboard');
const { value } = await response.json();

if (value) {
  // Show new dashboard
  renderNewDashboard();
} else {
  // Show old dashboard
  renderOldDashboard();
}`}
			title="HTTP API Integration"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">TypeScript Integration</h3>
		<p class="mb-4">Generate type-safe flag clients with automatic IntelliSense and validation:</p>
		<CodeBlock
			code={`# Generate TypeScript types
curl http://localhost:3000/api/schema > flags.schema.ts

# In your TypeScript application:
import { getFlagValue, FLAGS } from './flagflow-client';

// Type-safe flag access with autocompletion
const dashboardEnabled = await getFlagValue(FLAGS.enable_new_dashboard);

// Compiler ensures you use the correct flag name and type
if (dashboardEnabled) {
  renderNewDashboard();
}`}
			title="TypeScript Integration"
		/>

		<h3 class="mt-6 mb-3 text-lg font-semibold">React Hook Example</h3>
		<CodeBlock
			code={`// Custom React hook for FlagFlow
function useFlagFlow(flagName: string) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const fetchFlag = async () => {
      const response = await fetch(\`/flag/\${flagName}\`);
      const { value } = await response.json();
      setValue(value);
    };

    fetchFlag();
    
    // Optional: Set up real-time updates with WebSocket or polling
  }, [flagName]);

  return value;
}

// Usage in component
function Dashboard() {
  const newDashboardEnabled = useFlagFlow('enable_new_dashboard');
  
  if (newDashboardEnabled === null) return <Loading />;
  
  return newDashboardEnabled ? <NewDashboard /> : <OldDashboard />;
}`}
			title="React Integration"
		/>
	</DocsPageSection>

	<DocsPageSection id="next-steps" title="Next Steps">
		<p class="mb-4">Now that you have FlagFlow running, here are recommended next steps:</p>

		<div class="mb-6 grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">🔧 Production Setup</h3>
				<ul class="list-inside list-disc space-y-1 text-sm text-gray-600">
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/installation/kubernetes"
							>Deploy to Kubernetes</a
						>
					</li>
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/installation/etcd"
							>Configure etcd cluster</a
						>
					</li>
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/installation/env-variables"
							>Environment variables</a
						>
					</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">👥 User Management</h3>
				<ul class="list-inside list-disc space-y-1 text-sm text-gray-600">
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/user-management/authentication"
							>Authentication setup</a
						>
					</li>
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/user-management/permissions"
							>Configure permissions</a
						>
					</li>
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/user-management/keycloak"
							>Enterprise SSO</a
						>
					</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">💻 Development</h3>
				<ul class="list-inside list-disc space-y-1 text-sm text-gray-600">
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/typescript/ts-schema"
							>TypeScript integration</a
						>
					</li>
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/typescript/hash"
							>Schema validation</a
						>
					</li>
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/flags/hierarchy"
							>Flag organization</a
						>
					</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">🚀 Operations</h3>
				<ul class="list-inside list-disc space-y-1 text-sm text-gray-600">
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/migration/export-backup"
							>Backup strategies</a
						>
					</li>
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/migration/migration"
							>Environment migration</a
						>
					</li>
					<li>
						<a class="text-blue-600 hover:underline" href="/docs/migration/restore"
							>Disaster recovery</a
						>
					</li>
				</ul>
			</div>
		</div>

		<div class="rounded-lg bg-gray-50 p-4">
			<h3 class="mb-2 text-lg font-semibold">📚 Learn More</h3>
			<p class="mb-2 text-gray-700">Explore advanced FlagFlow concepts:</p>
			<ul class="list-inside list-disc space-y-1 text-sm text-gray-600">
				<li>
					<strong>Percentage Rollouts:</strong> Gradually release features to a subset of users
				</li>
				<li>
					<strong>Flag Hierarchy:</strong> Organize flags with folders and namespaces
				</li>
				<li>
					<strong>A/B Testing:</strong> Run experiments to optimize user experience
				</li>
				<li>
					<strong>Circuit Breaker:</strong> Implement safety mechanisms for critical features
				</li>
			</ul>
		</div>
	</DocsPageSection>

	<DocsPageSection id="getting-help" title="Getting Help">
		<p class="mb-4">Need assistance with FlagFlow? Here are the best ways to get help:</p>

		<div class="mb-6 grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">📖 Documentation</h3>
				<p class="mb-2 text-gray-600">Comprehensive guides and references:</p>
				<ul class="list-inside list-disc space-y-1 text-sm text-gray-600">
					<li>Installation guides</li>
					<li>API reference</li>
					<li>Best practices</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h3 class="mb-2 text-lg font-semibold">🐛 Issues & Support</h3>
				<p class="mb-2 text-gray-600">Get help with problems:</p>
				<ul class="list-inside list-disc space-y-1 text-sm text-gray-600">
					<li>GitHub Issues</li>
					<li>Community discussions</li>
					<li>Bug reports</li>
					<li>Feature requests</li>
				</ul>
			</div>
		</div>

		<div class="rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>👋 Welcome to FlagFlow!</strong> You're now ready to implement safe, controlled feature
				releases. Start small with a simple boolean flag, then explore advanced features as your needs
				grow.
			</p>
		</div>
	</DocsPageSection>
</DocsPage>
