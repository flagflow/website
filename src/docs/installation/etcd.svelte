<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import DocsPageSubSection from '$components/docs/DocsPageSubSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';

	import { ETCD_IMAGE, ETCD_VERSION } from '../../etcdVersion';
</script>

<DocsPage>
	<PageTitle title="etcd"
		>etcd is a distributed, key-value store designed for storing and managing configuration data
		with high availability and strong consistency guarantees in distributed systems</PageTitle
	>

	<DocsPageSection id="why-etcd" title="Why etcd?">
		etcd is a <b>high-performance and reliable</b> distributed key-value store that serves as the
		backbone for many cloud-native applications. It's most famously known as the configuration store
		for Kubernetes, where it's often referred to as the "heart" of Kubernetes because it stores all
		cluster state data. etcd's architecture ensures fast and reliable access to configuration data
		while providing real-time monitoring of cluster state changes through its sophisticated watch
		mechanism.
		<br /><br />
		<b>FlagFlow leverages etcd</b> as its primary configuration data store because of its
		exceptional performance characteristics and efficient change notification system. Unlike
		traditional polling-based approaches, etcd's watch API
		<b>not only notifies clients of changes but also delivers the updated data payload</b>
		in a single operation, providing immediate access to the latest configuration state. This real-time
		synchronization capability is crucial for distributed FlagFlow deployments, where multiple application
		instances must stay synchronized with feature flag changes without the overhead of periodic polling
		or manual data refresh operations.
		<br /><br />
		The watch mechanism operates through HTTP/2 streaming, ensuring low-latency updates across all connected
		FlagFlow instances. This architecture enables instant feature flag propagation, making it ideal for
		high-frequency flag toggles and real-time A/B testing scenarios where immediate consistency across
		all application nodes is essential.
	</DocsPageSection>

	<DocsPageSection id="why-not-xy" title="Why not XY?">
		You might wonder why FlagFlow doesn't use alternative solutions like <b>Redis</b>,
		<b>MongoDB</b>, or <b>PostgreSQL</b>. While these are excellent technologies in their respective
		domains, etcd offers distinct advantages specifically designed for configuration management use
		cases. etcd was purpose-built for storing and managing small-scale, configuration-oriented data
		with exceptional speed, reliability, and horizontal scalability characteristics that align
		perfectly with FlagFlow's requirements.
		<br /><br />
		Beyond performance considerations, etcd's native <b>watch functionality</b> provides a critical
		architectural advantage for feature flag management. This capability enables real-time
		configuration updates and immediate change notifications, ensuring that FlagFlow applications
		always operate with the most current flag states. This becomes particularly valuable in
		multi-instance deployments where consistent flag behavior across all application nodes is
		essential for maintaining user experience integrity and preventing feature flag inconsistencies.
		<br /><br />
		Traditional database management systems, while powerful, introduce unnecessary complexity and overhead
		for FlagFlow's specific use case. We don't require relational data modeling, complex indexing strategies,
		heavyweight transaction processing, or advanced query optimization features that these systems provide.
		Additionally, managed database services typically employ usage-based pricing models that can become
		cost-prohibitive for high-frequency configuration access patterns common in feature flag systems.
		<br /><br />
		etcd's lightweight footprint, combined with its RAFT consensus algorithm for distributed consistency,
		provides the optimal balance of simplicity, performance, and reliability needed for enterprise-grade
		feature flag management without the operational overhead and licensing costs associated with traditional
		database solutions.
	</DocsPageSection>

	<DocsPageSection id="install" title="Installation">
		There are several approaches to deploy etcd for FlagFlow, depending on your infrastructure
		requirements and operational preferences. Choose the method that best aligns with your
		deployment strategy and maintenance capabilities.
		<DocsPageSubSection subTitle="Recommended for simple setups" title="Docker Compose Deployment">
			For development environments and simple deployments, Docker Compose provides the fastest setup
			path. Later you can extend it with FlagFlow services in a single file:

			<CodeBlock
				code={`
version: '3.8'
services:
  etcd:
    image: ${ETCD_IMAGE}
    container_name: flagflow-etcd
    environment:
      - ETCD_NAME=etcd-server
      - ETCD_DATA_DIR=/etcd-data
      - ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379
      - ETCD_ADVERTISE_CLIENT_URLS=http://localhost:2379
      - ETCD_LISTEN_PEER_URLS=http://0.0.0.0:2380
      - ETCD_INITIAL_ADVERTISE_PEER_URLS=http://etcd:2380
      - ETCD_INITIAL_CLUSTER=etcd-server=http://etcd:2380
      - ETCD_INITIAL_CLUSTER_TOKEN=etcd-cluster
      - ETCD_INITIAL_CLUSTER_STATE=new
    ports:
      - "2379:2379"
      - "2380:2380"
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
			For production Kubernetes environments, deploy etcd as a StatefulSet with persistent storage:
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
        - containerPort: 2380
          name: peer
        env:
        - name: ETCD_DATA_DIR
          value: /var/lib/etcd
        - name: ETCD_LISTEN_CLIENT_URLS
          value: http://0.0.0.0:2379
        - name: ETCD_LISTEN_PEER_URLS
          value: http://0.0.0.0:2380
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

	<DocsPageSection id="configure-to-use" title="FlagFlow Configuration">
		Once etcd is deployed, configure FlagFlow to connect to your etcd instance. The configuration
		approach varies depending on your FlagFlow deployment method.
		<b>Environment Variables Configuration</b>
		Set the following environment variables in your FlagFlow application container or process:
		<pre><code
				># etcd connection settings
FLAGFLOW_ETCD_ENDPOINTS=http://localhost:2379
FLAGFLOW_ETCD_USERNAME=
FLAGFLOW_ETCD_PASSWORD=
FLAGFLOW_ETCD_ROOT_PREFIX=/flagflow

# Connection timeout and retry settings
FLAGFLOW_ETCD_DIAL_TIMEOUT=5s
FLAGFLOW_ETCD_REQUEST_TIMEOUT=10s
FLAGFLOW_ETCD_AUTO_SYNC_INTERVAL=30s

# TLS configuration (for secure deployments)
FLAGFLOW_ETCD_TLS_ENABLED=false
FLAGFLOW_ETCD_TLS_CERT_FILE=
FLAGFLOW_ETCD_TLS_KEY_FILE=
FLAGFLOW_ETCD_TLS_CA_FILE=</code
			></pre>
		<b>Docker Compose Integration</b>
		When running FlagFlow with Docker Compose, ensure proper network connectivity:
		<pre><code
				>version: '3.8'
services:
  flagflow:
    image: flagflow/flagflow:latest
    container_name: flagflow-app
    environment:
      - FLAGFLOW_ETCD_ENDPOINTS=http://etcd:2379
      - FLAGFLOW_ETCD_ROOT_PREFIX=/flagflow
    depends_on:
      - etcd
    ports:
      - "8080:8080"
    networks:
      - flagflow-network

  etcd:
    # etcd configuration from previous section
    networks:
      - flagflow-network</code
			></pre>
		<b>Kubernetes ConfigMap</b>
		For Kubernetes deployments, use ConfigMaps to manage etcd connection settings:
		<pre><code
				>apiVersion: v1
kind: ConfigMap
metadata:
  name: flagflow-etcd-config
  namespace: flagflow
data:
  etcd-endpoints: "http://etcd-0.etcd:2379,http://etcd-1.etcd:2379,http://etcd-2.etcd:2379"
  etcd-root-prefix: "/flagflow"
  etcd-dial-timeout: "5s"
  etcd-request-timeout: "10s"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: flagflow
spec:
  template:
    spec:
      containers:
      - name: flagflow
        image: flagflow/flagflow:latest
        envFrom:
        - configMapRef:
            name: flagflow-etcd-config</code
			></pre>
		<b>Connection Verification</b>
		After configuration, verify the connection using etcd client tools:
		<pre><code
				># Test basic connectivity
etcdctl --endpoints=http://localhost:2379 endpoint health

# Check FlagFlow data structure
etcdctl --endpoints=http://localhost:2379 get --prefix /flagflow/

# Monitor real-time changes (useful for debugging)
etcdctl --endpoints=http://localhost:2379 watch --prefix /flagflow/</code
			></pre>
		<b>Performance Tuning</b>
		For high-throughput FlagFlow deployments, consider these etcd optimizations: -
		<b>Increase snapshot count</b>: Set <code>--snapshot-count=100000</code> to reduce snapshot
		frequency - <b>Optimize heartbeat interval</b>: Use <code>--heartbeat-interval=500</code> for
		faster leader election - <b>Configure appropriate quotas</b>: Set
		<code>--quota-backend-bytes=8GB</code>
		based on expected data volume - <b>Enable compression</b>: Use <code>--compress</code> flag to reduce
		network overhead for large configurations These optimizations ensure optimal performance for FlagFlow's
		real-time feature flag synchronization requirements while maintaining etcd cluster stability and
		consistency.
	</DocsPageSection>
</DocsPage>
