<script lang="ts">
	import { Img } from 'flowbite-svelte';

	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';

	import etcd_80px_inline from './etcd.png?w=80&format=webp&inline&imagetools';
	import kubernetes_80px_inline from './kubernetes.png?w=80&format=webp&inline&imagetools';
</script>

<DocsPage>
	<PageTitle title="Prerequisites">What are the prerequisites for installing FlagFlow?</PageTitle>

	<DocsPageSection
		id="container"
		contentClass="text-justify"
		hotlink={[
			{ title: 'Docker', href: 'docker' },
			{ title: 'Kubernetes', href: 'kubernetes' }
		]}
		shortTitle="Container engine"
		title="Any container engine: Docker or Kubernetes"
	>
		<div class="flex flex-row items-start gap-8">
			<Img alt="Kubernetes" src={kubernetes_80px_inline} />

			The FlagFlow system is delivered as a Docker image. Therefore, it is necessary to have a
			containerized runtime environment (Docker or Kubernetes) available. An enterprise environment
			is the ideal choice, but a simple Docker installation is sufficient for developing and testing
			FlagFlow. Before installing FlagFlow, please ensure that your Docker or Kubernetes environment
			is functioning correctly.
		</div>
	</DocsPageSection>

	<DocsPageSection
		id="storage"
		contentClass="text-justify"
		shortTitle="Storage Engine"
		title="Storage Engine: etcd or Filesystem Storage"
	>
		<div class="flex flex-row items-start gap-8">
			<Img alt="etcd" src={etcd_80px_inline} />

			<div>
				<p class="mb-4">
					FlagFlow supports two storage options for storing its state: <strong
						>etcd (recommended for production)</strong
					>
					and <strong>filesystem storage (suitable for small companies or development)</strong>.
				</p>

				<p class="mb-4">
					<strong
						><a class="text-blue-600 hover:underline" href="/docs/installation/etcd">etcd</a
						></strong
					> is the recommended storage engine for production environments, providing distributed, reliable
					key-value storage with real-time watching capabilities. It's ideal for environments requiring
					high availability, multiple replicas, and instant synchronization across instances.
				</p>

				<p>
					<strong
						><a class="text-blue-600 hover:underline" href="/docs/installation/filesystem-storage"
							>Filesystem storage</a
						></strong
					>
					is available as an alternative for small companies without heavy infrastructure requirements
					or single-instance deployments. While it can work with replicas, changes have a few milliseconds
					delay across instances. When using filesystem storage, you must mount the
					<code>/data</code> volume to persist data across container restarts.
				</p>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection
		id="hardware"
		contentClass="text-justify"
		shortTitle="Hardware Requirements"
		title="Hardware and System Requirements"
	>
		<p class="mb-4">
			FlagFlow has modest hardware requirements, making it suitable for various deployment scenarios
			from development to production environments.
		</p>

		<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="rounded-lg border p-4">
				<h4 class="mb-3 text-lg font-semibold text-green-700">Development Environment</h4>
				<ul class="space-y-2">
					<li><strong>CPU:</strong> 1 vCPU (minimum)</li>
					<li><strong>Memory:</strong> 1GB RAM (minimum)</li>
					<li><strong>Storage:</strong> 5GB available disk space</li>
					<li><strong>Network:</strong> Internet connection for container images</li>
				</ul>
			</div>
			<div class="rounded-lg border p-4">
				<h4 class="mb-3 text-lg font-semibold text-blue-700">Production Environment</h4>
				<ul class="space-y-2">
					<li><strong>CPU:</strong> 2+ vCPUs (recommended)</li>
					<li><strong>Memory:</strong> 4GB+ RAM (recommended)</li>
					<li><strong>Storage:</strong> 20GB+ SSD storage</li>
					<li><strong>Network:</strong> Reliable network with low latency</li>
				</ul>
			</div>
		</div>

		<p class="text-sm text-gray-600">
			These requirements scale based on your usage patterns, number of feature flags, and frequency
			of flag changes. Monitor resource usage and adjust accordingly.
		</p>
	</DocsPageSection>

	<DocsPageSection
		id="network"
		contentClass="text-justify"
		shortTitle="Network Configuration"
		title="Network and Port Requirements"
	>
		<p class="mb-4">
			FlagFlow requires specific network configurations and port access for proper operation.
		</p>

		<div class="mb-6">
			<h4 class="mb-3 text-lg font-semibold">Required Ports</h4>
			<div class="overflow-x-auto">
				<table class="w-full border-collapse border border-gray-300 text-sm">
					<thead>
						<tr class="bg-gray-50">
							<th class="border border-gray-300 px-4 py-2 text-left">Service</th>
							<th class="border border-gray-300 px-4 py-2 text-left">Port</th>
							<th class="border border-gray-300 px-4 py-2 text-left">Protocol</th>
							<th class="border border-gray-300 px-4 py-2 text-left">Purpose</th>
							<th class="border border-gray-300 px-4 py-2 text-left">External Access</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="border border-gray-300 px-4 py-2">FlagFlow</td>
							<td class="border border-gray-300 px-4 py-2">3000</td>
							<td class="border border-gray-300 px-4 py-2">HTTP</td>
							<td class="border border-gray-300 px-4 py-2">Web UI and API</td>
							<td class="border border-gray-300 px-4 py-2"
								><span class="font-semibold text-green-600">Required</span></td
							>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2">etcd (optional)</td>
							<td class="border border-gray-300 px-4 py-2">2379</td>
							<td class="border border-gray-300 px-4 py-2">HTTP</td>
							<td class="border border-gray-300 px-4 py-2">Client connections</td>
							<td class="border border-gray-300 px-4 py-2"
								><span class="font-semibold text-red-600">Internal only</span></td
							>
						</tr>
						<tr>
							<td class="border border-gray-300 px-4 py-2">etcd (optional)</td>
							<td class="border border-gray-300 px-4 py-2">2380</td>
							<td class="border border-gray-300 px-4 py-2">HTTP</td>
							<td class="border border-gray-300 px-4 py-2">Peer communication</td>
							<td class="border border-gray-300 px-4 py-2"
								><span class="font-semibold text-red-600">Internal only</span></td
							>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="mb-4">
			<h4 class="mb-3 text-lg font-semibold">Firewall Configuration</h4>
			<p class="mb-2">
				Only port 3000 needs external access for FlagFlow's web UI and API. <strong
					>If using etcd, do not expose etcd ports (2379, 2380) to external networks</strong
				> - this would create a significant security vulnerability.
			</p>
			<div class="mt-3 border-l-4 border-yellow-400 bg-yellow-50 p-4">
				<div class="flex">
					<div class="flex-shrink-0">
						<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
							<path
								clip-rule="evenodd"
								d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
								fill-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="ml-3">
						<p class="text-sm text-yellow-700">
							<strong>Security Warning:</strong> If using etcd, etcd ports should remain internal to
							your container network or cluster. Exposing them externally allows unauthorized access
							to your feature flag data and configuration.
						</p>
					</div>
				</div>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection
		id="security"
		contentClass="text-justify"
		shortTitle="Security Considerations"
		title="Security and Access Control"
	>
		<p class="mb-4">
			Proper security configuration is essential for production FlagFlow deployments.
		</p>

		<div class="space-y-4">
			<div>
				<h4 class="mb-2 text-lg font-semibold">Authentication</h4>
				<ul class="list-inside list-disc space-y-1">
					<li>Configure strong passwords for etcd authentication (if using etcd)</li>
					<li>Use TLS certificates for encrypted communication in production</li>
					<li>Consider implementing network policies in Kubernetes environments</li>
					<li>Secure filesystem permissions for /data volume (if using filesystem storage)</li>
				</ul>
			</div>

			<div>
				<h4 class="mb-2 text-lg font-semibold">Data Protection</h4>
				<ul class="list-inside list-disc space-y-1">
					<li>Enable encryption at rest for persistent storage</li>
					<li>Use encrypted container registries for image storage</li>
					<li>
						Implement backup strategies for your chosen storage engine (etcd data or /data volume)
					</li>
				</ul>
			</div>

			<div>
				<h4 class="mb-2 text-lg font-semibold">Access Control</h4>
				<ul class="list-inside list-disc space-y-1">
					<li>Limit network access to FlagFlow services</li>
					<li>Use service accounts with minimal required permissions</li>
					<li>Implement logging and monitoring for security events</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection
		id="versions"
		contentClass="text-justify"
		shortTitle="Software Versions"
		title="Supported Software Versions"
	>
		<p class="mb-4">FlagFlow is tested and supported with the following software versions:</p>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div>
				<h4 class="mb-3 text-lg font-semibold">Container Platforms</h4>
				<ul class="space-y-2">
					<li><strong>Docker Engine:</strong> 20.0+ (recommended: latest LTS)</li>
					<li><strong>Docker Compose:</strong> 2.0+ (for compose deployments)</li>
					<li><strong>Kubernetes:</strong> 1.20+ (recommended: 1.25+)</li>
					<li><strong>Podman:</strong> 3.0+ (alternative to Docker)</li>
				</ul>
			</div>
			<div>
				<h4 class="mb-3 text-lg font-semibold">Operating Systems</h4>
				<ul class="space-y-2">
					<li><strong>Linux:</strong> Any modern distribution</li>
					<li><strong>macOS:</strong> 10.15+ (with Docker Desktop)</li>
					<li><strong>Windows:</strong> Windows 10+ (with Docker Desktop)</li>
					<li><strong>Cloud:</strong> AWS, GCP, Azure, DigitalOcean</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection
		id="checklist"
		contentClass="text-justify"
		shortTitle="Pre-installation Checklist"
		title="Pre-installation Verification Checklist"
	>
		<p class="mb-4">
			Before proceeding with FlagFlow installation, verify all prerequisites are met:
		</p>

		<div class="space-y-3">
			<label class="flex items-center space-x-3">
				<input class="form-checkbox h-5 w-5 text-blue-600" type="checkbox" />
				<span>Container runtime (Docker/Kubernetes) is installed and functional</span>
			</label>
			<label class="flex items-center space-x-3">
				<input class="form-checkbox h-5 w-5 text-blue-600" type="checkbox" />
				<span>Sufficient system resources (CPU, memory, storage) are available</span>
			</label>
			<label class="flex items-center space-x-3">
				<input class="form-checkbox h-5 w-5 text-blue-600" type="checkbox" />
				<span>Port 3000 is accessible for external access</span>
			</label>
			<label class="flex items-center space-x-3">
				<input class="form-checkbox h-5 w-5 text-blue-600" type="checkbox" />
				<span
					>Storage engine decision made (etcd for production/distributed deployments, filesystem for
					simple setups)</span
				>
			</label>
			<label class="flex items-center space-x-3">
				<input class="form-checkbox h-5 w-5 text-blue-600" type="checkbox" />
				<span>If using etcd: etcd ports 2379/2380 remain internal and secured</span>
			</label>
			<label class="flex items-center space-x-3">
				<input class="form-checkbox h-5 w-5 text-blue-600" type="checkbox" />
				<span>If using filesystem storage: /data volume mount configured for data persistence</span>
			</label>
			<label class="flex items-center space-x-3">
				<input class="form-checkbox h-5 w-5 text-blue-600" type="checkbox" />
				<span>Internet connectivity for downloading container images</span>
			</label>
			<label class="flex items-center space-x-3">
				<input class="form-checkbox h-5 w-5 text-blue-600" type="checkbox" />
				<span>Storage persistence configured (for production deployments)</span>
			</label>
			<label class="flex items-center space-x-3">
				<input class="form-checkbox h-5 w-5 text-blue-600" type="checkbox" />
				<span>Security policies and firewall rules reviewed</span>
			</label>
			<label class="flex items-center space-x-3">
				<input class="form-checkbox h-5 w-5 text-blue-600" type="checkbox" />
				<span>Backup and monitoring solutions planned (for production)</span>
			</label>
		</div>

		<div class="mt-6 rounded-lg bg-blue-50 p-4">
			<p class="text-sm">
				<strong>💡 Tip:</strong> For production deployments, consider running through this checklist
				in your staging environment first to validate the entire installation process.
			</p>
		</div>
	</DocsPageSection>
</DocsPage>
