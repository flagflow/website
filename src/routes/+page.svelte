<script lang="ts">
	/* eslint-disable no-undef */
	import { Button, Heading, Img, Kbd, P } from 'flowbite-svelte';

	import HtmlHeader from '$components/HtmlHeader.svelte';
	import Icon from '$components/Icon.svelte';
	import PageSection from '$components/PageSection.svelte';
</script>

<HtmlHeader title="Welcome" />

<!-- Hero Section -->
<PageSection>
	<div class="grid grid-cols-2">
		<div>
			<Heading class="mb-4 text-5xl leading-tight font-extrabold" tag="h1">
				The <span class="text-orange-700">FlagFlow</span> empowers you to control feature flags effortlessly
			</Heading>
			<P class="mb-6 pl-16 text-2xl">
				Define, manage and control them in one UI to enable dynamic application behavior and A/B
				testing.
			</P>
		</div>
		<Img class="mx-auto my-4 w-1/2" alt="Flagflow logo" src="/favicon.png" />
	</div>
	<div class="flex flex-row gap-8 pl-0">
		<Kbd class="text-md px-4 font-light">
			# docker run ghcr.io/flagflow/flagflow:{__APP_VERSION__}
		</Kbd>
		<Button href="/docs">
			Get started
			<Icon id="arrowRight" align="right" />
		</Button>
	</div>
</PageSection>

<!-- Easy Installation Section -->
<div class="bg-gray-100 py-16">
	<div class="mx-auto max-w-6xl px-4">
		<div class="mb-12 text-center">
			<Heading class="mb-4 text-3xl font-bold text-gray-900" tag="h2">
				<Icon id="deploy" class="inline-flex" align="left" color="#374151" size={28} />
				Easy Installation
			</Heading>
			<P class="text-center text-lg text-gray-700">
				Get FlagFlow running in minutes with Docker or deploy at scale with Kubernetes
			</P>
		</div>
		<div class="grid gap-8 md:grid-cols-2">
			<center>
				<Icon id="settings" color="#374151" size={48} />
				<Heading class="mt-4 mb-3 text-xl font-semibold text-gray-900" tag="h3"
					>Docker Setup</Heading
				>
				<P class="mb-4 text-center text-gray-700">Perfect for development and small deployments</P>
				<Button color="alternative" href="/docs/installation/docker">Docker Guide</Button>
			</center>
			<center>
				<Icon id="operations" color="#374151" size={48} />
				<Heading class="mt-4 mb-3 text-xl font-semibold text-gray-900" tag="h3"
					>Kubernetes Deployment</Heading
				>
				<P class="mb-4 text-center text-gray-700">Production-ready scalable deployment</P>
				<Button color="alternative" href="/docs/installation/kubernetes">K8s Guide</Button>
			</center>
		</div>
	</div>
</div>

<!-- Authentication Section -->
<PageSection>
	<div class="mx-auto max-w-6xl text-center">
		<div class="mb-12">
			<Heading class="mb-4 text-3xl font-bold  text-gray-900" tag="h2">
				<Icon id="security" class="inline-flex" align="left" color="#374151" size={28} />
				Flexible Authentication
			</Heading>
			<P class="text-center text-lg text-gray-700">
				Built-in user management or enterprise SSO with Keycloak integration
			</P>
		</div>
		<div class="grid gap-8 md:grid-cols-2">
			<div class="rounded-lg border p-6 text-center">
				<div class="flex justify-center">
					<Icon id="user" color="#374151" size={32} />
				</div>
				<Heading class="mt-4 mb-3 text-xl font-semibold text-gray-900" tag="h3"
					>Built-in Users</Heading
				>
				<P class="mb-4 text-gray-700">
					Simple user management with secure session handling. Perfect for teams that need quick
					setup.
				</P>
				<Button href="/docs/user-management/built-in-users" size="sm">Learn More</Button>
			</div>
			<div class="rounded-lg border p-6 text-center">
				<div class="flex justify-center">
					<Icon id="keycloak" color="#374151" size={32} />
				</div>
				<Heading class="mt-4 mb-3 text-xl font-semibold text-gray-900" tag="h3"
					>Keycloak Integration</Heading
				>
				<P class="mb-4 text-gray-700">
					Enterprise-grade SSO, centralized user management, and role-based access control.
				</P>
				<Button href="/docs/user-management/keycloak" size="sm">Setup Guide</Button>
			</div>
		</div>
	</div>
</PageSection>

<!-- TypeScript Integration Section -->
<div class="bg-gray-100 py-16">
	<div class="mx-auto max-w-6xl px-4 text-center">
		<div class="mb-12">
			<Heading class="mb-4 text-3xl font-bold text-gray-900" tag="h2">
				<Icon id="typescript" class="inline-flex" align="left" color="#3178c6" size={28} />
				Strongly Typed Access
			</Heading>
			<P class="text-center text-lg text-gray-700">
				TypeScript interfaces and Zod schemas generated automatically from your flags
			</P>
		</div>
		<div class="grid gap-8 md:grid-cols-2">
			<div class="text-center">
				<div class="flex justify-center">
					<Icon id="typescript" color="#3178c6" size={48} />
				</div>
				<Heading class="mt-4 mb-3 text-xl font-semibold text-gray-900" tag="h3"
					>TypeScript Schema</Heading
				>
				<P class="mb-4 text-center text-gray-700">
					Auto-generated type-safe interfaces with IntelliSense support
				</P>
				<Button color="alternative" href="/docs/typescript/ts-schema">TS Docs</Button>
			</div>
			<div class="text-center">
				<div class="flex justify-center">
					<Icon id="validation" color="#16a34a" size={48} />
				</div>
				<Heading class="mt-4 mb-3 text-xl font-semibold text-gray-900" tag="h3"
					>Zod Validation</Heading
				>
				<P class="mb-4 text-center text-gray-700">
					Runtime type validation and parsing with generated Zod schemas
				</P>
				<Button color="alternative" href="/docs/typescript/zod-schema">Zod Docs</Button>
			</div>
		</div>
	</div>
</div>

<!-- User Permissions Section -->
<PageSection>
	<div class="mx-auto max-w-6xl text-center">
		<div class="mb-12">
			<Heading class="mb-4 text-3xl font-bold text-gray-900" tag="h2">
				<Icon id="shield" class="inline-flex" align="left" color="#374151" size={28} />
				Fine-Grained Permissions
			</Heading>
			<P class="text-center text-lg text-gray-700">
				Granular access control to ensure team members have appropriate permissions
			</P>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			<div class="p-6 text-center">
				<div class="flex justify-center">
					<Icon id="user" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-lg font-semibold text-gray-900" tag="h3">User Roles</Heading>
				<P class="text-center text-sm text-gray-700"
					>Define custom roles with specific permissions</P
				>
			</div>
			<div class="p-6 text-center">
				<div class="flex justify-center">
					<Icon id="flag" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-lg font-semibold text-gray-900" tag="h3">Flag Access</Heading
				>
				<P class="text-center text-sm text-gray-700">Control who can view, edit, or toggle flags</P>
			</div>
			<div class="p-6 text-center">
				<div class="flex justify-center">
					<Icon id="settings" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-lg font-semibold text-gray-900" tag="h3"
					>Admin Controls</Heading
				>
				<P class="text-center text-sm text-gray-700">Manage system settings and user permissions</P>
			</div>
		</div>
		<div class="mt-8">
			<Button href="/docs/user-management/permissions">Permissions Guide</Button>
		</div>
	</div>
</PageSection>

<!-- Migration & Environment Management Section -->
<div class="bg-gray-100 py-16">
	<div class="mx-auto max-w-6xl px-4 text-center">
		<div class="mb-12">
			<Heading class="mb-4 text-3xl font-bold text-gray-900" tag="h2">
				<Icon id="migration" class="inline-flex" align="left" color="#374151" size={28} />
				Migration & Environment Management
			</Heading>
			<P class="text-center text-lg text-gray-700">
				Move configurations between environments with confidence and granular control
			</P>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			<div class="p-6 text-center">
				<div class="flex justify-center">
					<Icon id="export" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-lg font-semibold text-gray-900" tag="h3"
					>Export & Backup</Heading
				>
				<P class="text-center text-sm text-gray-700"
					>Comprehensive backup strategies for your flags</P
				>
			</div>
			<div class="p-6 text-center">
				<div class="flex justify-center">
					<Icon id="migration" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-lg font-semibold text-gray-900" tag="h3"
					>Environment Sync</Heading
				>
				<P class="text-center text-sm text-gray-700"
					>Migrate flags between dev, staging, and production</P
				>
			</div>
			<div class="p-6 text-center">
				<div class="flex justify-center">
					<Icon id="backup" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-lg font-semibold text-gray-900" tag="h3"
					>Disaster Recovery</Heading
				>
				<P class="text-sm text-gray-700">Restore from backups when you need it most</P>
			</div>
		</div>
		<div class="mt-8">
			<Button href="/docs/migration/migration">Migration Guide</Button>
		</div>
	</div>
</div>

<!-- Open Source Community Section -->
<PageSection>
	<div class="mx-auto max-w-6xl text-center">
		<div class="mb-12">
			<Heading class="mb-4 text-3xl font-bold text-gray-900" tag="h2">
				<Icon id="github" class="inline-flex" align="left" color="#374151" size={28} />
				Open Source Community
			</Heading>
			<P class="text-center text-lg text-gray-700">
				Join our growing community of developers building the future of feature flag management
			</P>
		</div>
		<div class="grid gap-8 md:grid-cols-2">
			<div class="rounded-lg border p-6 text-center">
				<div class="flex justify-center">
					<Icon id="github" color="#374151" size={32} />
				</div>
				<Heading class="mt-4 mb-3 text-xl font-semibold text-gray-900" tag="h3"
					>Free & Open Source</Heading
				>
				<P class="mb-4 text-center text-gray-700">
					FlagFlow is completely free to use and modify. No vendor lock-in, no hidden costs.
				</P>
				<Button href="/oss-open-source" size="sm">Learn More</Button>
			</div>
			<div class="rounded-lg border p-6 text-center">
				<div class="flex justify-center">
					<Icon id="users" color="#374151" size={32} />
				</div>
				<Heading class="mt-4 mb-3 text-xl font-semibold text-gray-900" tag="h3"
					>Community Driven</Heading
				>
				<P class="mb-4 text-center text-gray-700">
					Contribute code, report issues, or join discussions. Your input shapes FlagFlow's future.
				</P>
				<Button href="https://github.com/flagflow/flagflow" size="sm" target="_blank"
					>Join GitHub</Button
				>
			</div>
		</div>
	</div>
</PageSection>

<!-- Quick Links Section -->
<div class="bg-gray-100 py-16">
	<div class="mx-auto max-w-6xl px-4 text-center">
		<div class="mb-12">
			<Heading class="mb-4 text-3xl font-bold text-gray-900" tag="h2">Explore FlagFlow</Heading>
			<P class="text-center text-lg text-gray-700">
				Discover all the powerful features that make FlagFlow the ideal choice for feature flag
				management
			</P>
		</div>
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
			<div class="p-6 text-center">
				<div class="flex justify-center">
					<Icon id="rocket2" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-lg font-semibold text-gray-900" tag="h3">Features</Heading>
				<P class="mb-3 text-sm text-gray-700">Explore all FlagFlow capabilities</P>
				<Button href="/features" size="xs">View Features</Button>
			</div>
			<div class="p-6 text-center">
				<div class="flex justify-center">
					<Icon id="api" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-lg font-semibold text-gray-900" tag="h3"
					>Integrations</Heading
				>
				<P class="mb-3 text-sm text-gray-700">Connect with your favorite tools</P>
				<Button href="/integration" size="xs">View Integrations</Button>
			</div>
			<div class="p-6 text-center">
				<div class="flex justify-center">
					<Icon id="deploy" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-lg font-semibold text-gray-900" tag="h3">CI/CD</Heading>
				<P class="mb-3 text-sm text-gray-700">Perfect for DevOps workflows</P>
				<Button href="/ci-cd" size="xs">CI/CD Guide</Button>
			</div>
			<div class="p-6 text-center">
				<div class="flex justify-center">
					<Icon id="book" color="#374151" size={40} />
				</div>
				<Heading class="mt-3 mb-2 text-lg font-semibold text-gray-900" tag="h3"
					>Documentation</Heading
				>
				<P class="mb-3 text-sm text-gray-700">Complete guides and references</P>
				<Button href="/docs" size="xs">Read Docs</Button>
			</div>
		</div>
	</div>
</div>
