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
	description="Connect FlagFlow with your favorite tools and workflows. Available integrations include Keycloak authentication, with upcoming Slack notifications, REST API automation, and comprehensive audit logging features."
	keywords="flagflow integrations, keycloak integration, slack notifications feature flags, rest api feature flags, audit logging, sso integration, authentication, enterprise integrations, workflow automation, third party integrations"
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
		<div class="mb-12">
			<div class="mb-8 text-center">
				<Heading class="mb-4 text-2xl font-semibold text-green-800" tag="h2">
					<Icon id="checkCircle" align="left" color="#16a34a" size={24} />
					Available Now
				</Heading>
			</div>

			<div class="rounded-lg bg-green-50 p-8">
				<div class="grid gap-8 md:grid-cols-2 md:items-center">
					<div>
						<Img
							class="w-full rounded-lg shadow-lg"
							alt="Keycloak Integration"
							src={keycloakImage400}
						/>
					</div>
					<div class="space-y-4">
						<Heading class="text-2xl font-semibold text-green-900" tag="h3">
							Keycloak Authentication
						</Heading>
						<P class="leading-relaxed text-green-800">
							FlagFlow now supports enterprise-grade authentication with Keycloak integration.
							Enable single sign-on (SSO), centralized user management, and role-based access
							control across your organization.
						</P>
						<div class="flex flex-wrap gap-3">
							<Button color="green" href="/docs/user-management/keycloak">Setup Guide</Button>
							<Button color="alternative" href="/docs/user-management/authentication">
								Learn More
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Coming Soon Integrations -->
		<div class="mb-12">
			<div class="mb-8 text-center">
				<Heading class="mb-4 text-2xl font-semibold text-blue-800" tag="h2">
					<Icon id="rocket" align="left" color="#2563eb" size={24} />
					Coming Soon
				</Heading>
				<P class="text-lg text-gray-600">
					We're working on these exciting integrations to enhance your FlagFlow experience
				</P>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- Slack Notifications -->
				<div class="rounded-lg bg-blue-50 p-6">
					<div class="mb-4 text-center">
						<Img
							class="mx-auto h-24 w-24 rounded-lg object-cover"
							alt="Slack Integration"
							src={slackImage400}
						/>
					</div>
					<Heading class="mb-3 text-center text-lg font-semibold text-blue-900" tag="h3">
						Slack Notifications
					</Heading>
					<P class="mb-4 text-center text-sm text-blue-800">
						Get instant notifications when feature flags are toggled, updated, or when important
						changes occur in your flag configurations.
					</P>
					<ul class="space-y-2 text-sm text-blue-700">
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
							Flag toggle notifications
						</li>
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
							Customizable alerts
						</li>
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
							Team collaboration
						</li>
					</ul>
				</div>

				<!-- REST API C2C Communication -->
				<div class="rounded-lg bg-purple-50 p-6">
					<div class="mb-4 text-center">
						<Img
							class="mx-auto h-24 w-24 rounded-lg object-cover"
							alt="REST API Integration"
							src={restApiImage400}
						/>
					</div>
					<Heading class="mb-3 text-center text-lg font-semibold text-purple-900" tag="h3">
						REST API & Automation
					</Heading>
					<P class="mb-4 text-center text-sm text-purple-800">
						Powerful REST API for client-to-client communication and advanced automation workflows
						with your existing tools and CI/CD pipelines.
					</P>
					<ul class="space-y-2 text-sm text-purple-700">
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></span>
							Full REST API access
						</li>
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></span>
							CI/CD integration
						</li>
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></span>
							Automated workflows
						</li>
					</ul>
				</div>

				<!-- Audit Log Implementation -->
				<div class="rounded-lg bg-orange-50 p-6 md:col-span-2 lg:col-span-1">
					<div class="mb-4 text-center">
						<Img
							class="mx-auto h-24 w-24 rounded-lg object-cover"
							alt="Audit Log Implementation"
							src={auditLogImage400}
						/>
					</div>
					<Heading class="mb-3 text-center text-lg font-semibold text-orange-900" tag="h3">
						Audit Log System
					</Heading>
					<P class="mb-4 text-center text-sm text-orange-800">
						Comprehensive audit logging for compliance, security, and tracking all flag changes with
						detailed user activity monitoring.
					</P>
					<ul class="space-y-2 text-sm text-orange-700">
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-orange-500"></span>
							Complete activity tracking
						</li>
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-orange-500"></span>
							Compliance reporting
						</li>
						<li class="flex items-center">
							<span class="mr-2 h-1.5 w-1.5 rounded-full bg-orange-500"></span>
							Security monitoring
						</li>
					</ul>
				</div>
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
