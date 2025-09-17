<script lang="ts">
	import { resolve } from '$app/paths';
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import DocsPageSubSection from '$components/docs/DocsPageSubSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Filesystem Storage"
		>Filesystem storage provides a simple, lightweight alternative to etcd for storing FlagFlow
		data, ideal for small companies and single-instance deployments</PageTitle
	>

	<DocsPageSection id="overview" title="Overview">
		<p class="mb-4">
			FlagFlow 1.5.0 introduces <strong>filesystem storage</strong> through the new PersistentService
			abstraction layer as an alternative to etcd. This storage option is perfect for:
		</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li><strong>Small companies</strong> without heavy infrastructure requirements</li>
			<li><strong>Development and testing environments</strong> where simplicity is preferred</li>
			<li><strong>Single-instance deployments</strong> that don't require distributed storage</li>
			<li>
				<strong>Organizations</strong> wanting to avoid etcd complexity and maintenance overhead
			</li>
		</ul>

		<div class="mt-6 rounded-lg bg-blue-50 p-4">
			<h4 class="mb-2 font-semibold text-blue-800">💡 When to Choose Filesystem Storage</h4>
			<p class="text-sm text-blue-700">
				Choose filesystem storage when you need a simple, reliable storage solution without the
				complexity of distributed systems. It's perfect for teams that want to get started quickly
				with FlagFlow or don't need real-time synchronization across multiple instances.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="comparison" title="Filesystem vs etcd Comparison">
		<div class="overflow-x-auto">
			<table class="w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border border-gray-300 px-4 py-2 text-left">Feature</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Filesystem Storage</th>
						<th class="border border-gray-300 px-4 py-2 text-left">etcd Storage</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-semibold">Setup Complexity</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="font-semibold text-green-600">Simple</span> - No additional services
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="text-orange-600">Moderate</span> - Requires etcd installation
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-semibold">Real-time Sync</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="text-orange-600">Delayed</span> - Auto refresh with few milliseconds delay
							across replicas
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="font-semibold text-green-600">Excellent</span> - Automatic watch-based updates
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-semibold">Performance</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="font-semibold text-green-600">Fast</span> - Direct file system access
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="font-semibold text-green-600">Fast</span> - Optimized for key-value operations
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-semibold">Scalability</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="text-orange-600">Limited</span> - Works with replicas but sync has few milliseconds
							delay
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="font-semibold text-green-600">Distributed</span> - Multiple nodes with clustering
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-semibold">Data Persistence</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="font-semibold text-green-600">Reliable</span> - Direct filesystem storage
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="font-semibold text-green-600">Reliable</span> - etcd's durability guarantees
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-semibold">Resource Usage</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="font-semibold text-green-600">Low</span> - No additional processes
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<span class="text-orange-600">Higher</span> - etcd server resources
						</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-4 py-2 font-semibold">Ideal For</td>
						<td class="border border-gray-300 px-4 py-2"
							>Small teams, development, single instances</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>Production, distributed systems, high availability</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</DocsPageSection>

	<DocsPageSection id="configuration" title="Configuration">
		<p class="mb-4">
			To use filesystem storage, simply <strong>omit the etcd configuration</strong>. FlagFlow's
			PersistentService abstraction will automatically detect the absence of etcd settings and
			initialize the filesystem storage engine with full type safety and Zod schema validation.
		</p>

		<DocsPageSubSection subTitle="Environment Variables" title="No etcd Configuration Required">
			<p class="mb-4">
				When these etcd environment variables are not set or empty, FlagFlow uses filesystem
				storage:
			</p>
			<CodeBlock
				code={`# These should NOT be set for filesystem storage
# ETCD_SERVER=
# ETCD_USERNAME=
# ETCD_PASSWORD=
# ETCD_NAMESPACE=

# Other FlagFlow configuration remains the same
LOGLEVEL=info
ENVIRONMENT=production`}
				title="Environment Configuration for Filesystem Storage"
			/>
		</DocsPageSubSection>

		<DocsPageSubSection subTitle="Critical Requirement" title="Data Volume Mount">
			<div class="mb-4 border-l-4 border-red-400 bg-red-50 p-4">
				<div class="flex">
					<div class="ml-3">
						<p class="text-sm text-red-700">
							<strong>⚠️ Critical:</strong> When using filesystem storage, you <strong>must</strong>
							mount the
							<code>/data</code> volume to persist data between container restarts. Without this mount,
							all your feature flags and configuration will be lost when the container stops or new version
							installed.
						</p>
					</div>
				</div>
			</div>

			<p class="mb-4">
				FlagFlow stores all data in the <code>/data</code> directory inside the container. This includes:
			</p>
			<ul class="mb-4 list-inside list-disc space-y-1">
				<li>Feature flag definitions and values</li>
				<li>User accounts and permissions</li>
				<li>Session data</li>
				<li>Configuration settings</li>
			</ul>
		</DocsPageSubSection>
	</DocsPageSection>

	<DocsPageSection id="architecture" title="Storage Architecture">
		<p class="mb-4">
			FlagFlow 1.5.0 introduces a new dual-engine persistence architecture that supports both etcd
			and filesystem storage through the PersistentService abstraction layer:
		</p>
		<div class="space-y-4">
			<div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
				<h4 class="mb-2 font-semibold text-blue-800">🏗️ PersistentService Abstraction</h4>
				<p class="mb-2 text-sm text-blue-700">
					The service layer now supports pluggable persistence engines, allowing seamless switching
					between storage types without changing application logic.
				</p>
				<ul class="list-inside list-disc space-y-1 text-xs text-blue-600">
					<li>Unified API for all storage operations</li>
					<li>Type-safe persistence with Zod schema validation</li>
					<li>Real-time flag watching in both storage modes</li>
					<li>Consistent behavior across storage engines</li>
				</ul>
			</div>
			<div class="rounded-lg border border-green-200 bg-green-50 p-4">
				<h4 class="mb-2 font-semibold text-green-800">📁 Filesystem Storage Engine</h4>
				<p class="mb-2 text-sm text-green-700">
					The filesystem storage engine provides robust local storage with automatic file watching
					and change detection for real-time updates.
				</p>
				<ul class="list-inside list-disc space-y-1 text-xs text-green-600">
					<li>JSON-based data storage for transparency</li>
					<li>File system watching for real-time synchronization</li>
					<li>Atomic write operations for data consistency</li>
					<li>Enhanced type safety throughout persistence layer</li>
				</ul>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="docker" title="Docker Setup">
		<DocsPageSubSection subTitle="Recommended" title="Docker Compose">
			<CodeBlock
				code={`version: '3.8'
services:
  flagflow:
    image: flagflow/flagflow:latest
    container_name: flagflow
    ports:
      - "3000:3000"
    # CRITICAL: Mount /data volume for persistence
    volumes:
      - flagflow-data:/data
    environment:
      - LOGLEVEL=info
      - ENVIRONMENT=production
      # Notice: NO etcd configuration - filesystem storage will be used automatically
      - SESSION_USERS_ENABLED=true
      - SESSION_DEFAULT_USERNAME=admin
      - SESSION_DEFAULT_PASSWORD=change_this_password
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  flagflow-data:
    driver: local`}
				title="docker-compose.yml"
			/>
		</DocsPageSubSection>

		<DocsPageSubSection subTitle="Alternative" title="Docker Run Command">
			<CodeBlock
				code={`# Create a named volume for data persistence
docker volume create flagflow-data

# Run FlagFlow with filesystem storage
docker run -d \\
  --name flagflow \\
  -p 3000:3000 \\
  -v flagflow-data:/data \\
  -e LOGLEVEL=info \\
  -e ENVIRONMENT=production \\
  -e SESSION_USERS_ENABLED=true \\
  -e SESSION_DEFAULT_USERNAME=admin \\
  -e SESSION_DEFAULT_PASSWORD=change_this_password \\
  --restart unless-stopped \\
  flagflow/flagflow:latest`}
				title="Docker Run with Filesystem Storage"
			/>
		</DocsPageSubSection>
	</DocsPageSection>

	<DocsPageSection id="kubernetes" title="Kubernetes Setup">
		<p class="mb-4">
			For Kubernetes deployments, use a PersistentVolumeClaim to ensure data persistence:
		</p>

		<CodeBlock
			code={`apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: flagflow-data
  namespace: flagflow
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: flagflow
  namespace: flagflow
spec:
  replicas: 1  # Single replica recommended for filesystem storage
  selector:
    matchLabels:
      app: flagflow
  template:
    metadata:
      labels:
        app: flagflow
    spec:
      containers:
      - name: flagflow
        image: flagflow/flagflow:latest
        ports:
        - containerPort: 3000
        # Mount the persistent volume to /data
        volumeMounts:
        - name: data
          mountPath: /data
        env:
        - name: LOGLEVEL
          value: "info"
        - name: ENVIRONMENT
          value: "production"
        - name: SESSION_USERS_ENABLED
          value: "true"
        - name: SESSION_DEFAULT_USERNAME
          value: "admin"
        - name: SESSION_DEFAULT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: flagflow-secret
              key: admin-password
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: flagflow-data`}
			title="kubernetes-filesystem.yaml"
		/>
	</DocsPageSection>

	<DocsPageSection id="data-structure" title="Data Structure">
		<p class="mb-4">
			FlagFlow stores data in a structured directory format within <code>/data</code>:
		</p>

		<CodeBlock
			code={`/data/
├── flag/
│   ├── feature_a
│   ├── feature_b
│   └── group/
│       └── nested_feature
├── user/
│   ├── admin
│   └── developer
└── session/
    ├── session_1
    └── session_2`}
			title="Data Directory Structure"
		/>

		<p class="mb-4">
			Each file contains JSON data representing the corresponding FlagFlow entity. This structure
			provides:
		</p>
		<ul class="mb-4 list-inside list-disc space-y-1">
			<li><strong>Transparency:</strong> Data is stored in human-readable JSON files</li>
			<li>
				<strong>Backup-friendly:</strong> Easy to backup and restore using standard filesystem tools
			</li>
			<li><strong>Version control:</strong> Can be managed with git for configuration as code</li>
			<li><strong>Debugging:</strong> Direct file access for troubleshooting</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="backup" title="Backup and Restore">
		<DocsPageSubSection subTitle="Simple and Reliable" title="Filesystem-based Backup">
			<p class="mb-4">
				One advantage of filesystem storage is the simplicity of backup and restore operations:
			</p>

			<CodeBlock
				code={`# Backup the entire data directory
docker run --rm -v flagflow-data:/data -v $(pwd):/backup alpine:latest \\
  tar czf /backup/flagflow-backup-$(date +%Y%m%d-%H%M%S).tar.gz -C /data .

# Restore from backup
docker run --rm -v flagflow-data:/data -v $(pwd):/backup alpine:latest \\
  tar xzf /backup/flagflow-backup-20241201-143000.tar.gz -C /data`}
				title="Backup and Restore Commands"
			/>
		</DocsPageSubSection>

		<DocsPageSubSection subTitle="Automated Backups" title="Scheduled Backup Strategy">
			<p class="mb-4">Set up automated backups using cron or Kubernetes CronJobs:</p>

			<CodeBlock
				code={`apiVersion: batch/v1
kind: CronJob
metadata:
  name: flagflow-backup
  namespace: flagflow
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: alpine:latest
            command:
            - /bin/sh
            - -c
            - |
              apk add --no-cache aws-cli
              tar czf /tmp/flagflow-backup-$(date +%Y%m%d-%H%M%S).tar.gz -C /data .
              aws s3 cp /tmp/flagflow-backup-*.tar.gz s3://your-backup-bucket/flagflow/
            volumeMounts:
            - name: data
              mountPath: /data
              readOnly: true
          volumes:
          - name: data
            persistentVolumeClaim:
              claimName: flagflow-data
          restartPolicy: OnFailure`}
				title="Kubernetes Backup CronJob"
			/>
		</DocsPageSubSection>
	</DocsPageSection>

	<DocsPageSection id="limitations" title="Limitations and Considerations">
		<div class="space-y-4">
			<div class="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
				<h4 class="mb-2 font-semibold text-yellow-800">🔄 Multi-Instance Synchronization</h4>
				<p class="text-sm text-yellow-700">
					When running multiple FlagFlow instances with filesystem storage, changes made in one
					instance will be visible in others with a few milliseconds delay due to file system
					watching. The PersistentService abstraction ensures consistent behavior, though this is
					slower than etcd's instant distributed watch-based updates.
				</p>
			</div>

			<div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
				<h4 class="mb-2 font-semibold text-blue-800">📈 Scaling Considerations</h4>
				<p class="text-sm text-blue-700">
					Filesystem storage works best with single-instance deployments. If you need to scale
					horizontally with real-time synchronization, consider migrating to etcd storage.
				</p>
			</div>

			<div class="rounded-lg border border-green-200 bg-green-50 p-4">
				<h4 class="mb-2 font-semibold text-green-800">✅ Perfect for Small Teams</h4>
				<p class="text-sm text-green-700">
					For teams with 1-50 developers and simple deployment requirements, filesystem storage
					provides excellent reliability with minimal operational overhead.
				</p>
			</div>
		</div>
	</DocsPageSection>

	<DocsPageSection id="migration" title="Migration Path">
		<p class="mb-4">
			If you start with filesystem storage and later need etcd's distributed capabilities, FlagFlow
			provides migration tools:
		</p>

		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>
				<strong>Export:</strong> Use the <code>/migration/export</code> endpoint to create a backup
			</li>
			<li><strong>Setup etcd:</strong> Install and configure etcd for your new deployment</li>
			<li>
				<strong>Import:</strong> Use the migration tools to import your data into the etcd-based FlagFlow
				instance
			</li>
		</ul>

		<div class="mt-4 rounded-lg bg-gray-50 p-4">
			<p class="text-sm text-gray-600">
				📚 For detailed migration instructions, see the
				<a class="text-blue-600 hover:underline" href={resolve('/docs/migration/migration', {})}
					>Migration Documentation</a
				>.
			</p>
		</div>
	</DocsPageSection>
</DocsPage>
