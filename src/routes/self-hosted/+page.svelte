<script lang="ts">
	/* eslint-disable no-undef */
	import { Button, Heading, Img, P } from 'flowbite-svelte';

	import HtmlHeader from '$components/HtmlHeader.svelte';
	import Icon from '$components/Icon.svelte';
	import PageSection from '$components/PageSection.svelte';

	import selfHostedImage400 from './selfhosted.webp?w=400&format=webp&imagetools';
</script>

<HtmlHeader
	description="Take full control with FlagFlow self-hosted feature flag management. Deploy on your infrastructure for maximum security, performance, and cost control. Open-source, customizable, and built for enterprise needs."
	keywords="flagflow self hosted, self hosted feature flags, on premise feature flags, private cloud feature flags, enterprise feature flag management, secure feature flags, cost effective feature flags, docker feature flags, kubernetes deployment"
	title="Self-Hosted Feature Flag Management"
/>

<PageSection>
	<div class="mx-auto max-w-5xl">
		<div class="mb-8 text-center">
			<Heading class="mb-4 text-4xl font-bold text-gray-900" tag="h1">
				Self-Hosted FlagFlow: Your Infrastructure, Your Control
			</Heading>
			<P class="text-center text-xl text-gray-600">
				Deploy FlagFlow on your own infrastructure for maximum security, performance, and cost
				control
			</P>
		</div>

		<!-- Hero Section -->
		<div class="mb-16 rounded-xl border border-gray-200 p-8 transition-all hover:shadow-lg">
			<div class="grid gap-8 md:grid-cols-2 md:items-center">
				<div>
					<Img
						class="w-full rounded-lg shadow-sm"
						alt="Self-hosted infrastructure control"
						src={selfHostedImage400}
					/>
				</div>
				<div class="space-y-4">
					<Heading class="text-2xl font-semibold text-gray-900" tag="h2">
						Why Choose Self-Hosted?
					</Heading>
					<P class="text-base leading-relaxed text-gray-600">
						Self-hosting FlagFlow gives you complete control over your feature flag infrastructure.
						Keep your data on-premises, customize to your exact needs, and scale without limits.
						Perfect for organizations with strict security requirements or specific compliance
						needs.
					</P>
					<div class="flex flex-wrap gap-3">
						<Button href="/docs/installation/docker">Quick Start with Docker</Button>
						<Button color="alternative" href="/docs/installation/kubernetes">
							Kubernetes Deployment
						</Button>
					</div>
				</div>
			</div>
		</div>

		<!-- Self-Hosted Benefits -->
		<div class="mb-16">
			<div class="mb-12 text-center">
				<Heading class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl" tag="h2">
					Key Benefits of Self-Hosting FlagFlow
				</Heading>
				<P class="text-lg text-gray-600">
					Take advantage of enterprise-grade features while maintaining full control
				</P>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- Security & Privacy -->
				<div class="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg">
					<div class="mb-4">
						<Icon id="shield" color="#16a34a" size={32} />
					</div>
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						Maximum Security & Privacy
					</Heading>
					<P class="mb-4 text-base text-gray-600">
						Your sensitive feature flag data never leaves your infrastructure. Perfect for
						organizations with strict security requirements and compliance needs.
					</P>
					<ul class="space-y-3 text-base text-gray-700">
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
							Complete data sovereignty
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
							Compliance ready (GDPR, SOC2)
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
							No third-party data sharing
						</li>
					</ul>
				</div>

				<!-- Performance & Speed -->
				<div class="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg">
					<div class="mb-4">
						<Icon id="rocket" color="#2563eb" size={32} />
					</div>
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						Optimal Performance
					</Heading>
					<P class="mb-4 text-base text-gray-600">
						Deploy close to your applications for minimal latency. Scale horizontally based on your
						exact needs and traffic patterns.
					</P>
					<ul class="space-y-3 text-base text-gray-700">
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
							Low-latency flag evaluation
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
							Customizable caching strategies
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
							Unlimited scaling potential
						</li>
					</ul>
				</div>

				<!-- Cost Control -->
				<div class="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg">
					<div class="mb-4">
						<Icon id="hash" color="#ea580c" size={32} />
					</div>
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						Cost Effectiveness
					</Heading>
					<P class="mb-4 text-base text-gray-600">
						No per-user or per-flag pricing. Pay only for your infrastructure costs and scale
						efficiently as your organization grows.
					</P>
					<ul class="space-y-3 text-base text-gray-700">
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
							No licensing fees
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
							Predictable infrastructure costs
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
							Scale without usage penalties
						</li>
					</ul>
				</div>

				<!-- Customization -->
				<div class="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg">
					<div class="mb-4">
						<Icon id="settings" color="#7c3aed" size={32} />
					</div>
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						Full Customization
					</Heading>
					<P class="mb-4 text-base text-gray-600">
						Modify, extend, and integrate FlagFlow exactly how you need it. Open-source architecture
						allows unlimited customization.
					</P>
					<ul class="space-y-3 text-base text-gray-700">
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
							Source code access
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
							Custom integrations
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
							Tailored workflows
						</li>
					</ul>
				</div>

				<!-- Reliability -->
				<div class="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg">
					<div class="mb-4">
						<Icon id="operations" color="#059669" size={32} />
					</div>
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						Enterprise Reliability
					</Heading>
					<P class="mb-4 text-base text-gray-600">
						No dependency on external services. Deploy with high availability and disaster recovery
						strategies that match your infrastructure standards.
					</P>
					<ul class="space-y-3 text-base text-gray-700">
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-emerald-500"></span>
							99.9%+ uptime control
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-emerald-500"></span>
							No vendor dependency
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-emerald-500"></span>
							Custom backup strategies
						</li>
					</ul>
				</div>

				<!-- Open Source -->
				<div class="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg">
					<div class="mb-4">
						<Icon id="github" color="#dc2626" size={32} />
					</div>
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						Open Source Foundation
					</Heading>
					<P class="mb-4 text-base text-gray-600">
						Built on transparent, community-driven development. No vendor lock-in, with the freedom
						to modify and distribute as needed.
					</P>
					<ul class="space-y-3 text-base text-gray-700">
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-red-500"></span>
							Community contributions
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-red-500"></span>
							Transparent development
						</li>
						<li class="flex items-center">
							<span class="mr-3 h-2 w-2 rounded-full bg-red-500"></span>
							No licensing restrictions
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Deployment Options -->
		<div class="mb-16">
			<div class="mb-12 text-center">
				<Heading class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl" tag="h2">
					Easy Deployment Options
				</Heading>
				<P class="text-lg text-gray-600">Get FlagFlow running on your infrastructure in minutes</P>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				<!-- Docker Deployment -->
				<div class="rounded-xl border border-gray-200 p-8 transition-all hover:shadow-lg">
					<div class="mb-4">
						<Icon id="deploy" color="#2563eb" size={40} />
					</div>
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						Docker Deployment
					</Heading>
					<P class="mb-6 text-base text-gray-600">
						Quickest way to get started. Single command deployment with Docker Compose for
						development and small production environments.
					</P>
					<div class="mb-4 rounded-lg bg-gray-100 p-3 font-mono text-sm">
						docker run -p 3000:3000 ghcr.io/flagflow/flagflow:{__APP_VERSION__}
					</div>
					<Button href="/docs/installation/docker" size="sm">Docker Guide</Button>
				</div>

				<!-- Kubernetes Deployment -->
				<div class="rounded-xl border border-gray-200 p-8 transition-all hover:shadow-lg">
					<div class="mb-4">
						<Icon id="operations" color="#16a34a" size={40} />
					</div>
					<Heading class="mb-4 text-xl font-semibold text-gray-900" tag="h3">
						Kubernetes Deployment
					</Heading>
					<P class="mb-6 text-base text-gray-600">
						Enterprise-ready deployment with Kubernetes manifests. High availability, auto-scaling,
						and integration with your existing Kubernetes infrastructure.
					</P>
					<Button href="/docs/installation/kubernetes" size="sm">Kubernetes Guide</Button>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="rounded-xl border border-gray-200 p-8 text-center transition-all hover:shadow-lg">
			<Heading class="mb-4 text-2xl font-semibold text-gray-900" tag="h2">
				Ready to Deploy FlagFlow?
			</Heading>
			<P class="mb-6 text-lg text-gray-600">
				Join thousands of developers who trust FlagFlow for their feature flag management. Start
				your self-hosted journey today.
			</P>
			<div class="flex flex-wrap justify-center gap-4">
				<Button href="/docs/installation/docker" size="lg">Get Started with Docker</Button>
				<Button color="alternative" href="/docs" size="lg">View Documentation</Button>
				<Button
					color="alternative"
					href="https://github.com/flagflow/flagflow"
					size="lg"
					target="_blank"
				>
					View on GitHub
				</Button>
				<Button color="orange" href="https://demo.flagflow.net" size="lg" target="_blank">
					Try Demo First
				</Button>
			</div>
		</div>
	</div>
</PageSection>
