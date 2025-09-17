<script lang="ts">
	import { Button, Heading, Img, P } from 'flowbite-svelte';

	import HtmlHeader from '$components/HtmlHeader.svelte';
	import Icon from '$components/Icon.svelte';
	import PageSection from '$components/PageSection.svelte';

	import auditLogImage400 from './auditlog.webp?w=400&format=webp&imagetools';
	import keycloakImage400 from './keycloak.png?w=400&format=webp&imagetools';
	import restApiImage400 from './restapi.png?w=400&format=webp&imagetools';
	import slackImage400 from './slack.avif?w=400&format=webp&imagetools';
</script>

<HtmlHeader
	description="Connect FlagFlow with your favorite tools and workflows. Available integrations include Keycloak authentication, comprehensive REST API with OpenAPI specification, audit logging, and upcoming Slack notifications."
	keywords="flagflow integrations, keycloak integration, rest api feature flags, openapi specification, jwt authentication, audit logging, sso integration, authentication, enterprise integrations, workflow automation, third party integrations, ci cd integration"
	title="FlagFlow Integrations"
/>

<PageSection>
	<div class="mx-auto max-w-5xl">
		<div class="mb-8 text-center">
			<Heading class="mb-4 text-4xl font-bold text-gray-900" tag="h1">
				FlagFlow Integrations
			</Heading>
			<P class="text-center text-xl text-gray-600">
				Connect FlagFlow with your favorite tools and workflows
			</P>
		</div>

		<!-- Available Integration: Keycloak -->
		<div class="mb-16">
			<div class="mb-12 text-center">
				<Heading class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl" tag="h2">
					<Icon id="checkCircle" class="inline-flex" align="left" color="#16a34a" size={32} />
					Available Now
				</Heading>
			</div>

			<div class="rounded-xl border border-gray-200 p-8 transition-all hover:shadow-lg">
				<div class="grid gap-8 md:grid-cols-2 md:items-center">
					<div>
						<Img
							class="w-full rounded-lg shadow-sm"
							alt="Keycloak Integration"
							src={keycloakImage400}
						/>
					</div>
					<div class="space-y-4">
						<Heading class="text-2xl font-semibold text-gray-900" tag="h3">
							Keycloak Authentication
						</Heading>
						<P class="text-base leading-relaxed text-gray-600">
							FlagFlow now supports enterprise-grade authentication with Keycloak integration.
							Enable single sign-on (SSO), centralized user management, and role-based access
							control across your organization.
						</P>
						<div class="flex flex-wrap gap-3">
							<Button href="/docs/user-management/keycloak">Setup Guide</Button>
							<Button color="alternative" href="/docs/user-management/authentication">
								Learn More
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Available Integrations -->
		<div class="mb-16">
			<div class="mb-12 text-center">
				<Heading class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl" tag="h2">
					<Icon id="checkCircle" class="inline-flex" align="left" color="#16a34a" size={32} />
					Existing Features
				</Heading>
				<P class="text-lg text-gray-600">
					Fully implemented and ready to use in your FlagFlow instance
				</P>
			</div>

			<!-- REST API Integration -->
			<div class="mb-12 rounded-xl border border-gray-200 p-8 transition-all hover:shadow-lg">
				<div class="grid gap-8 md:grid-cols-2 md:items-center">
					<div>
						<Img
							class="w-full rounded-lg shadow-sm"
							alt="REST API Integration"
							src={restApiImage400}
						/>
					</div>
					<div class="space-y-4">
						<Heading class="text-2xl font-semibold text-gray-900" tag="h3">
							REST API & Automation
						</Heading>
						<P class="text-base leading-relaxed text-gray-600">
							Comprehensive REST API with OpenAPI 3.0 specification for external integrations,
							automation workflows, and CI/CD pipelines. JWT Bearer authentication with complete
							CRUD operations for users, sessions, flags, and migrations.
						</P>
						<ul class="space-y-3 text-base text-gray-700">
							<li class="flex items-center">
								<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
								OpenAPI 3.0 specification at /api/openapi.json
							</li>
							<li class="flex items-center">
								<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
								JWT Bearer token authentication
							</li>
							<li class="flex items-center">
								<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
								Migration API (export, import, remote URL execution)
							</li>
							<li class="flex items-center">
								<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
								Complete user and session management
							</li>
						</ul>
						<div class="flex flex-wrap gap-3">
							<Button href="/docs/rest-api">REST API Guide</Button>
							<Button
								color="alternative"
								href="http://localhost:3000/api/openapi.json"
								target="_blank"
							>
								OpenAPI Spec
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div class="mb-12 rounded-xl border border-gray-200 p-8 transition-all hover:shadow-lg">
				<div class="grid gap-8 md:grid-cols-2 md:items-center">
					<div>
						<Img
							class="w-full rounded-lg shadow-sm"
							alt="Audit Log System"
							src={auditLogImage400}
						/>
					</div>
					<div class="space-y-4">
						<Heading class="text-2xl font-semibold text-gray-900" tag="h3">
							Audit Log System
						</Heading>
						<P class="text-base leading-relaxed text-gray-600">
							Comprehensive audit logging for compliance, security, and tracking all flag changes
							with detailed user activity monitoring. Full activity history with timestamps and user
							attribution.
						</P>
						<ul class="space-y-3 text-base text-gray-700">
							<li class="flex items-center">
								<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
								Complete activity tracking
							</li>
							<li class="flex items-center">
								<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
								Compliance reporting
							</li>
							<li class="flex items-center">
								<span class="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
								Security monitoring
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Coming Soon Integrations -->
		<div class="mb-16">
			<div class="mb-12 text-center">
				<Heading class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl" tag="h2">
					<Icon id="rocket" class="inline-flex" align="left" color="#2563eb" size={32} />
					Coming Soon
				</Heading>
				<P class="text-lg text-gray-600">
					We're working on these exciting integrations to enhance your FlagFlow experience
				</P>
			</div>

			<!-- Slack Notifications -->
			<div class="rounded-xl border border-gray-200 p-6 transition-all hover:shadow-lg">
				<div class="mb-6 text-center">
					<Img
						class="mx-auto h-24 w-24 rounded-lg object-cover"
						alt="Slack Integration"
						src={slackImage400}
					/>
				</div>
				<Heading class="mb-4 text-center text-xl font-semibold text-gray-900" tag="h3">
					Slack Notifications
				</Heading>
				<P class="mb-6 text-center text-base text-gray-600">
					Get instant notifications when feature flags are toggled, updated, or when important
					changes occur in your flag configurations.
				</P>
				<ul class="space-y-3 text-base text-gray-700">
					<li class="flex items-center">
						<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
						Flag toggle notifications
					</li>
					<li class="flex items-center">
						<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
						Customizable alerts
					</li>
					<li class="flex items-center">
						<span class="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
						Team collaboration
					</li>
				</ul>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="rounded-lg bg-gray-100 p-8 text-center">
			<Heading class="mb-4 text-2xl font-semibold text-gray-900" tag="h2">
				Request an Integration
			</Heading>
			<P class="mb-6 text-lg text-gray-700">
				Have a specific integration in mind? We'd love to hear from you! Let us know what tools
				you'd like to see integrated with FlagFlow.
			</P>
			<div class="flex flex-wrap justify-center gap-4">
				<Button href="https://github.com/flagflow/flagflow/issues/new" target="_blank">
					Request Feature
				</Button>
				<Button
					color="alternative"
					href="https://github.com/flagflow/flagflow/discussions"
					target="_blank"
				>
					Join Discussion
				</Button>
			</div>
		</div>
	</div>
</PageSection>
