<script lang="ts">
	/* eslint-disable no-undef */
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';

	import { ETCD_IMAGE } from '../ETCD_VERSION';
</script>

<DocsPage>
	<PageTitle title="Docker">How easy it is to install FlagFlow in a Docker environment</PageTitle>

	<DocsPageSection id="prerequisites" title="Prerequisites">
		<p class="mb-4">
			Before installing FlagFlow with Docker, ensure you have the following installed on your
			system:
		</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Docker Engine (version 20.0 or higher)</li>
			<li>Docker Compose (if using the compose setup)</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="standalone" title="Docker standalone">
		<p class="mb-4">
			You can install the FlagFlow system standalone in a Docker environment. Simply run the
			following command:
		</p>

		<CodeBlock
			code={`docker run -d \\
  --name flagflow \\
  -p 3000:3000 \\
  -e ETCD_SERVER=etcd:2379 \\
  -e ETCD_USERNAME=root \\
  -e ETCD_PASSWORD=pw_flagflow \\
  ghcr.io/flagflow/flagflow:${__APP_VERSION__}`}
			title="Run FlagFlow standalone container"
		/>

		<p class="mt-4 text-sm text-gray-600">
			Replace <code>your-etcd-server</code> with your actual etcd server address. If you don't have an
			etcd server running, consider using the Docker Compose setup below which includes etcd.
		</p>
	</DocsPageSection>

	<DocsPageSection id="compose" title="Docker Compose">
		<p class="mb-4">
			With Docker Compose, you can install the FlagFlow system together with etcd. Create the
			following file named <code>docker-compose.yml</code>:
		</p>

		<CodeBlock
			code={`version: '3.8'

services:
  etcd:
    image: ${ETCD_IMAGE}
    container_name: flagflow-etcd
    environment:
	  - ETCD_ROOT_PASSWORD=pw_flagflow
    volumes:
      - etcd-data:/etcd-data
	# Not needed, because network allows communication between containers
    ports:
      - "2379:2379"
    networks:
      - flagflow-network
	# Health check is not mandatory, but recommended in production
	healthcheck:
		test: ["CMD", "etcdctl", "--user=root:pw_flagflow", "endpoint", "health"]
		interval: 15s
		timeout: 10s
		retries: 2
	restart: on-failure

  flagflow:
    image: ghcr.io/flagflow/flagflow:${__APP_VERSION__}
    container_name: flagflow-app
    depends_on:
      - etcd
    environment:
      - ETCD_SERVER=etcd:2379
      - ETCD_USERNAME=root
      - ETCD_PASSWORD=pw_flagflow
    ports:
      - "3000:3000"
    networks:
      - flagflow-network

# You can use nginx as a reverse proxy in front of FlagFlow
# ...

volumes:
  etcd-data:

networks:
  flagflow-network:
    driver: bridge`}
			title="docker-compose.yml"
		/>

		<p class="mt-4 mb-4">Then start the services with:</p>

		<CodeBlock code="docker-compose up -d" title="Start Docker Compose services" />
	</DocsPageSection>

	<DocsPageSection id="environment-variables" title="Environment Variables">
		<p class="mb-4">FlagFlow supports the following environment variables for configuration:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<code>ETCD_ENDPOINTS</code> - Comma-separated list of etcd endpoints (default: http://localhost:2379)
			</li>
			<li><code>PORT</code> - Port to run the FlagFlow server on (default: 8080)</li>
			<li><code>LOG_LEVEL</code> - Log level (debug, info, warn, error) (default: info)</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="verification" title="Verification">
		<p class="mb-4">After starting FlagFlow, you can verify that it's running correctly by:</p>
		<ol class="mb-4 list-inside list-decimal space-y-2">
			<li>
				Opening your browser and navigating to <a
					class="text-blue-600 hover:underline"
					href="http://localhost:8080">http://localhost:8080</a
				>
			</li>
			<li>Checking the container logs:</li>
		</ol>

		<CodeBlock
			code={`# For standalone container
docker logs flagflow

# For Docker Compose
docker-compose logs flagflow`}
			title="Check FlagFlow logs"
		/>
	</DocsPageSection>
</DocsPage>
