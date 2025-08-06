<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';

	import { ETCD_IMAGE } from '../ETCD_VERSION';
</script>

<DocsPage>
	<PageTitle title="Kubernetes"
		>Deploy FlagFlow on Kubernetes with high availability and scalability</PageTitle
	>

	<DocsPageSection id="prerequisites" title="Prerequisites">
		<p class="mb-4">Before deploying FlagFlow on Kubernetes, ensure you have:</p>
		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>A running Kubernetes cluster (version 1.20 or higher)</li>
			<li><code>kubectl</code> configured to access your cluster</li>
			<li>Sufficient cluster resources (minimum 2 CPU cores, 4GB RAM)</li>
			<li>StorageClass configured for persistent volumes</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="namespace" title="Create Namespace">
		<p class="mb-4">First, create a dedicated namespace for FlagFlow:</p>

		<CodeBlock
			code={`apiVersion: v1
kind: Namespace
metadata:
  name: flagflow
  labels:
    name: flagflow`}
			title="Create FlagFlow namespace"
		/>

		<CodeBlock code="kubectl apply -f namespace.yaml" title="Apply namespace" />
	</DocsPageSection>

	<DocsPageSection id="etcd" title="Deploy etcd">
		<p class="mb-4">Deploy etcd as the key-value store backend for FlagFlow:</p>

		<CodeBlock
			code={`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: etcd
  namespace: flagflow
spec:
  serviceName: etcd
  replicas: 1
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
        - name: ETCD_ROOT_PASSWORD
          value: "pw_flagflow"
        - name: ETCD_DATA_DIR
          value: /etcd-data
        volumeMounts:
        - name: etcd-storage
          mountPath: /etcd-data
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
  volumeClaimTemplates:
  - metadata:
      name: etcd-storage
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
---
apiVersion: v1
kind: Service
metadata:
  name: etcd
  namespace: flagflow
spec:
  selector:
    app: etcd
  ports:
  - port: 2379
    targetPort: 2379
    name: client
  - port: 2380
    targetPort: 2380
    name: peer
  clusterIP: None`}
			title="etcd-deployment.yaml"
		/>

		<CodeBlock code="kubectl apply -f etcd-deployment.yaml" title="Deploy etcd" />
	</DocsPageSection>

	<DocsPageSection id="flagflow" title="Deploy FlagFlow">
		<p class="mb-4">Now deploy the FlagFlow application:</p>

		<CodeBlock
			code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: flagflow
  namespace: flagflow
spec:
  replicas: 2
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
        image: ghcr.io/flagflow/flagflow:latest
        ports:
        - containerPort: 3000
        env:
        - name: ETCD_SERVER
          value: "etcd.flagflow.svc.cluster.local:2379"
        - name: ETCD_USERNAME
          value: "root"
        - name: ETCD_PASSWORD
          value: "pw_flagflow"
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: flagflow
  namespace: flagflow
spec:
  selector:
    app: flagflow
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
  type: ClusterIP`}
			title="flagflow-deployment.yaml"
		/>

		<CodeBlock code="kubectl apply -f flagflow-deployment.yaml" title="Deploy FlagFlow" />
	</DocsPageSection>

	<DocsPageSection id="ingress" title="Expose with Ingress">
		<p class="mb-4">To expose FlagFlow externally, create an Ingress resource:</p>

		<CodeBlock
			code={`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: flagflow-ingress
  namespace: flagflow
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: flagflow.your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: flagflow
            port:
              number: 80
  # Uncomment for TLS
  # tls:
  # - hosts:
  #   - flagflow.your-domain.com
  #   secretName: flagflow-tls`}
			title="flagflow-ingress.yaml"
		/>

		<CodeBlock code="kubectl apply -f flagflow-ingress.yaml" title="Apply Ingress" />

		<p class="mt-4 text-sm text-gray-600">
			Replace <code>flagflow.your-domain.com</code> with your actual domain. Make sure you have an Ingress
			controller (like NGINX) installed in your cluster.
		</p>
	</DocsPageSection>

	<DocsPageSection id="configmap" title="Configuration with ConfigMap">
		<p class="mb-4">For advanced configuration, you can use a ConfigMap:</p>

		<CodeBlock
			code={`apiVersion: v1
kind: ConfigMap
metadata:
  name: flagflow-config
  namespace: flagflow
data:
  config.yaml: |
    etcd:
      endpoints:
        - etcd.flagflow.svc.cluster.local:2379
      username: root
      password: pw_flagflow
    server:
      port: 3000
      log_level: info
    features:
      metrics_enabled: true
      tracing_enabled: false`}
			title="flagflow-config.yaml"
		/>
	</DocsPageSection>

	<DocsPageSection id="verification" title="Verification">
		<p class="mb-4">Verify your FlagFlow deployment:</p>

		<CodeBlock
			code={`# Check all resources in the flagflow namespace
kubectl get all -n flagflow

# Check pod logs
kubectl logs -l app=flagflow -n flagflow

# Check etcd logs
kubectl logs -l app=etcd -n flagflow

# Port forward to test locally (optional)
kubectl port-forward service/flagflow 8080:80 -n flagflow`}
			title="Check deployment status"
		/>

		<p class="mt-4 mb-4">
			If using port forwarding, you can access FlagFlow at <a
				class="text-blue-600 hover:underline"
				href="http://localhost:8080">http://localhost:8080</a
			>.
		</p>
	</DocsPageSection>

	<DocsPageSection id="scaling" title="Scaling and High Availability">
		<p class="mb-4">For production environments, consider these scaling options:</p>

		<CodeBlock
			code={`# Scale FlagFlow to 3 replicas
kubectl scale deployment flagflow --replicas=3 -n flagflow

# Scale etcd to 3 replicas for HA (requires cluster configuration)
kubectl scale statefulset etcd --replicas=3 -n flagflow`}
			title="Scale FlagFlow deployment"
		/>

		<ul class="mt-4 list-inside list-disc space-y-2">
			<li><strong>FlagFlow pods:</strong> Can be scaled horizontally as they are stateless</li>
			<li>
				<strong>etcd cluster:</strong> Requires proper cluster configuration for multi-node setup
			</li>
			<li><strong>Resource requests:</strong> Adjust based on your workload requirements</li>
			<li>
				<strong>Persistent storage:</strong> Use appropriate StorageClass for your environment
			</li>
		</ul>
	</DocsPageSection>

	<DocsPageSection id="troubleshooting" title="Troubleshooting">
		<p class="mb-4">Common troubleshooting commands:</p>

		<CodeBlock
			code={`# Describe problematic pods
kubectl describe pod <pod-name> -n flagflow

# Check events in the namespace
kubectl get events -n flagflow --sort-by='.lastTimestamp'

# Check persistent volumes
kubectl get pv,pvc -n flagflow

# Test etcd connectivity from a pod
kubectl run etcd-test --rm -it --image=alpine --restart=Never -n flagflow -- sh
# Inside the pod:
# apk add --no-cache curl
# curl -L http://etcd.flagflow.svc.cluster.local:2379/health`}
			title="Debugging commands"
		/>

		<p class="mt-4">Common issues:</p>
		<ul class="mt-2 list-inside list-disc space-y-2">
			<li><strong>Pods stuck in Pending:</strong> Check resource requests and node capacity</li>
			<li><strong>etcd connection failed:</strong> Verify service names and network policies</li>
			<li>
				<strong>Persistent volume issues:</strong> Ensure StorageClass is available and configured
			</li>
		</ul>
	</DocsPageSection>
</DocsPage>
