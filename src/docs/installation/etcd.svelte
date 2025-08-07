<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import DocsPageSubSection from '$components/docs/DocsPageSubSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';

	import { ETCD_IMAGE, ETCD_VERSION } from '../ETCD_VERSION';
</script>

<DocsPage>
	<PageTitle title="etcd"
		>etcd is a distributed, key-value store designed for storing and managing configuration data
		with high availability and strong consistency guarantees in distributed systems</PageTitle
	>

	<DocsPageSection id="why-etcd" title="Why etcd?">
		<a
			class="text-blue-600 hover:underline"
			href="https://etcd.io/"
			rel="noopener noreferrer"
			target="_blank">etcd</a
		>
		is a <b>high-performance and reliable</b> distributed key-value store that serves as the
		backbone for many cloud-native applications. It's most famously known as the
		<b>configuration store for Kubernetes</b>, where it's often referred to as the "heart" of
		Kubernetes because it stores all cluster state data. etcd's architecture ensures fast and
		reliable access to configuration data while providing real-time monitoring of cluster state
		changes through its sophisticated watch mechanism.
		<br /><br />
		<b>FlagFlow leverages etcd</b> as its primary configuration data store because of its
		exceptional performance characteristics and efficient change notification system. Unlike
		traditional polling-based approaches, etcd's <b>watch API</b>
		not only notifies clients of changes but also delivers the updated data payload in a single operation,
		providing immediate access to the latest configuration state. This real-time synchronization capability
		is crucial for distributed FlagFlow deployments, where multiple application instances must stay synchronized
		with feature flag changes without the overhead of periodic polling or manual data refresh operations.
		<br /><br />
		The watch mechanism operates through <b>HTTP/2 streaming</b>, ensuring low-latency updates
		across all connected FlagFlow instances. This architecture enables
		<b>instant feature flag propagation</b>, making it ideal for high-frequency flag toggles and
		real-time A/B testing scenarios where immediate consistency across all application nodes is
		essential.
	</DocsPageSection>

	<DocsPageSection id="why-not-xy" title="Why not XY?">
		You might wonder why FlagFlow doesn't use alternative solutions like <b>Redis</b>,
		<b>MongoDB</b>, or PostgreSQL. While these are excellent technologies in their respective
		domains, etcd offers distinct advantages specifically designed for configuration management use
		cases. etcd was purpose-built for storing and managing small-scale, configuration-oriented data
		with exceptional speed, reliability, and horizontal scalability characteristics that align
		perfectly with FlagFlow's requirements.
		<br /><br />
		Beyond performance considerations, etcd's native <b>watch functionality</b> provides a critical
		architectural advantage for feature flag management. This capability enables
		<b>real-time configuration updates</b>
		and immediate change notifications, ensuring that FlagFlow applications always operate with the most
		current flag states. This becomes particularly valuable in multi-instance deployments where consistent
		flag behavior across all application nodes is essential for maintaining user experience integrity
		and preventing feature flag inconsistencies.
		<br /><br />
		<b>Traditional database management systems</b>, while powerful, introduce unnecessary complexity
		and overhead for FlagFlow's specific use case. We don't require relational data modeling,
		complex indexing strategies, heavyweight transaction processing, or advanced query optimization
		features that these systems provide. Additionally, managed database services typically employ
		<b>usage-based pricing models</b>
		that can become cost-prohibitive for high-frequency configuration access patterns common in feature
		flag systems.
		<br /><br />
		etcd's <b>lightweight footprint</b>, combined with its RAFT consensus algorithm for distributed
		consistency, provides the optimal balance of simplicity, performance, and reliability needed for
		<b>enterprise-grade feature flag management</b> without the operational overhead and licensing costs
		associated with traditional database solutions.
	</DocsPageSection>

	<DocsPageSection id="install" title="Installation">
		There are several approaches to deploy etcd for FlagFlow, depending on your infrastructure
		requirements and operational preferences. Choose the method that best aligns with your
		deployment strategy and maintenance capabilities.
		<DocsPageSubSection subTitle="Recommended for simple setups" title="Docker Compose Deployment">
			For development environments and simple deployments, Docker Compose provides the fastest setup
			path. Later you can extend it with FlagFlow services in a single file. For complete FlagFlow
			Docker setup instructions, see <a
				class="text-blue-600 hover:underline"
				href="/docs/installation/docker">Docker Installation Guide</a
			>.

			<CodeBlock
				code={`
version: '3.8'
services:
  etcd:
    image: ${ETCD_IMAGE}
    container_name: flagflow-etcd
    environment:
      - ETCD_ROOT_PASSWORD=pw_flagflow
    ports:
      - "2379:2379"
    volumes:
      - etcd-data:/etcd-data
    networks:
      - flagflow-network

volumes:
  etcd-data:

networks:
  flagflow-network:
    driver: bridge
`}
				title="docker-compose.yml"
			/>
		</DocsPageSubSection>

		<hr class="ml-6" />

		<DocsPageSubSection subTitle="Recommended for production setups" title="Kubernetes Deployment">
			For production Kubernetes environments, deploy etcd as a StatefulSet with persistent storage.
			For complete FlagFlow Kubernetes setup instructions, see <a
				class="text-blue-600 hover:underline"
				href="/docs/installation/kubernetes">Kubernetes Installation Guide</a
			>.
			<CodeBlock
				code={`
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: etcd
  namespace: flagflow
spec:
  serviceName: etcd
  replicas: 3
  selector:
    matchLabels:
      app: etcd
  template:
    metadata:
      labels:
        app: etcd
    spec:
      containers:
      - name: etcd
        image: ${ETCD_IMAGE}
        ports:
        - containerPort: 2379
          name: client
        env:
        - name: ETCD_ROOT_PASSWORD
		  value: pw_flagflow
        volumeMounts:
        - name: etcd-data
          mountPath: /var/lib/etcd
  volumeClaimTemplates:
  - metadata:
      name: etcd-data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi`}
				title="etcd-statefulset.yaml"
			/>
		</DocsPageSubSection>

		<hr class="ml-6" />

		<DocsPageSubSection subTitle="If you have a bare-metal or VM setup" title="Binary Installation">
			For direct server installations, download and install etcd binaries and setup as a systemd
			service:
			<CodeBlock
				code={`
wget https://github.com/etcd-io/etcd/releases/download/v${ETCD_VERSION}/etcd-v${ETCD_VERSION}-linux-amd64.tar.gz
tar -xzf etcd-v${ETCD_VERSION}-linux-amd64.tar.gz
sudo mv etcd-v${ETCD_VERSION}-linux-amd64/etcd* /usr/local/bin/
`}
				title="etcd-binary-install.sh"
			/>

			<CodeBlock
				code={`
[Unit]
Description=etcd key-value store
Documentation=https://github.com/etcd-io/etcd
After=network.target

[Service]
Type=notify
ExecStart=/usr/local/bin/etcd \\
  --name etcd-server \\
  --data-dir=/var/lib/etcd \\
  --listen-client-urls=http://0.0.0.0:2379 \\
  --advertise-client-urls=http://localhost:2379 \\
  --listen-peer-urls=http://0.0.0.0:2380 \\
  --initial-advertise-peer-urls=http://localhost:2380 \\
  --initial-cluster=etcd-server=http://localhost:2380
Restart=always
RestartSec=10s

[Install]
WantedBy=multi-user.target
`}
				title="/etc/systemd/system/etcd.service"
			/>

			<CodeBlock
				code={`
sudo systemctl enable etcd
sudo systemctl start etcd
`}
				title="Enable and start etcd"
			/>
		</DocsPageSubSection>
	</DocsPageSection>

	<DocsPageSection id="check-connection" title="Check etcd connection">
		After configuration, verify the connection using etcd client tools:
		<CodeBlock
			code={`
# Test basic connectivity
etcdctl --endpoints=http://etcd-server:2379 endpoint health

# Check FlagFlow data structure
etcdctl --endpoints=http://etcd-server:2379 get --prefix /flagflow/

# Monitor real-time changes (useful for debugging)
etcdctl --endpoints=http://etcd-server:2379 watch --prefix /flagflow/</code
`}
			title="Connection Verification"
		/>
	</DocsPageSection>

	<DocsPageSection id="configure-to-use" title="FlagFlow Configuration">
		Once etcd is deployed, configure FlagFlow to connect to your etcd instance. The configuration
		approach varies depending on your FlagFlow deployment method.

		<CodeBlock
			code={`
ETCD_SERVER=etcd-server:2379
ETCD_USERNAME=flagflow
ETCD_PASSWORD=**********
ETCD_NAMESPACE=default
`}
			title="Configuration with ENVs"
		/>
	</DocsPageSection>
</DocsPage>
