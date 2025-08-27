import type { DocumentPageFlatDescriptor, DocumentPageRegistry } from '$lib/documentPageTypes';

export const documentPageRegistry = {
	'': {
		title: 'Getting Started',
		description: 'Complete guide to setting up and using FlagFlow for feature flag management',
		filenameOverride: 'get_started',
		keywords:
			'flagflow, feature flags, getting started, self-hosted, open source, feature toggles, typescript, docker, setup guide, quick start'
	},
	installation: {
		groupName: 'Installation',
		nodes: {
			prerequisites: {
				title: 'Prerequisites',
				description: 'System requirements and dependencies needed before installing FlagFlow',
				keywords:
					'prerequisites, system requirements, node.js, docker, etcd, server requirements, production deployment, infrastructure'
			},
			etcd: {
				title: 'etcd',
				description:
					'Install and configure etcd distributed key-value store for FlagFlow - clustering, high availability, and production-ready data persistence',
				keywords:
					'etcd, distributed database, key-value store, clustering, high availability, production storage, data persistence, distributed systems'
			},
			'filesystem-storage': {
				title: 'Filesystem Storage',
				description:
					'Configure FlagFlow with filesystem storage for simple deployments - lightweight alternative to etcd for small teams and development environments',
				keywords:
					'filesystem storage, local storage, simple deployment, lightweight, small teams, development environment, file-based storage, minimal setup'
			},
			docker: {
				title: 'Docker',
				description:
					'Deploy FlagFlow with Docker containers using docker-compose - production-ready containerized deployment with volume mounts and networking',
				keywords:
					'docker deployment, docker-compose, containerization, self-hosted deployment, production containers, devops, container orchestration'
			},
			kubernetes: {
				title: 'Kubernetes',
				description:
					'Deploy FlagFlow on Kubernetes clusters with Helm charts, ConfigMaps, and production-ready manifests for scalable self-hosted feature flags',
				keywords:
					'kubernetes deployment, k8s, helm charts, kubernetes manifests, cloud native, container orchestration, scalable deployment, production k8s'
			},
			'env-variables': {
				title: 'Environment Variables',
				description:
					'Configure FlagFlow with environment variables - database connections, authentication settings, and deployment-specific configuration options',
				keywords:
					'environment variables, config management, deployment configuration, database config, authentication settings, production config'
			}
		}
	},
	'user-management': {
		groupName: 'User management',
		nodes: {
			authentication: {
				title: 'Authentication',
				description: 'Understanding FlagFlow authentication system and security model',
				keywords:
					'authentication, security, SSO, JWT, keycloak integration, enterprise auth, self-hosted security, access control'
			},
			permissions: {
				title: 'Permissions',
				description:
					'FlagFlow granular permission system - role-based access control (RBAC), team permissions, and fine-grained authorization for enterprise security',
				keywords:
					'permissions, RBAC, role-based access control, authorization, team permissions, enterprise security, granular permissions'
			},
			'built-in-users': {
				title: 'Built-in Users',
				description:
					'FlagFlow built-in user management - simple authentication system for small teams without external SSO requirements',
				keywords:
					'built-in users, local authentication, simple user management, small teams, no SSO, basic auth'
			},
			keycloak: {
				title: 'Keycloak Integration',
				description:
					'FlagFlow Keycloak SSO integration - enterprise authentication with OAuth2, OpenID Connect, and centralized user management',
				keywords:
					'keycloak integration, SSO, single sign-on, OAuth2, OpenID Connect, enterprise authentication, SAML, identity provider'
			},
			'audit-log': {
				title: 'Audit Log',
				description:
					'FlagFlow comprehensive audit logging - track user actions, flag changes, and system events for compliance and security monitoring',
				keywords:
					'audit log, compliance logging, security monitoring, user tracking, flag change history, audit trail, compliance requirements'
			}
		}
	},
	flags: {
		groupName: 'Flags',
		nodes: {
			'flag-types': {
				title: 'Flag Types',
				description:
					'FlagFlow comprehensive flag types - boolean, string, number, JSON, enum, and A/B testing flags for all feature toggle use cases',
				keywords:
					'flag types, feature flags, boolean flags, string flags, number flags, JSON flags, enum flags, A/B testing, feature toggles'
			},
			hierarchy: {
				title: 'Flag Hierarchy',
				description:
					'Organize FlagFlow feature flags with hierarchical structure - namespaces, grouping, and nested flags for scalable flag management',
				keywords:
					'flag hierarchy, flag organization, namespaces, flag grouping, structured flags, scalable flag management'
			},
			'access-flags': {
				title: 'Access Flags',
				description:
					'Access FlagFlow feature flags via REST API, client SDKs, and direct HTTP endpoints for application integration',
				keywords:
					'REST API, flag API, client SDK, HTTP endpoints, flag retrieval, API integration, programmatic access'
			}
		}
	},
	typescript: {
		groupName: 'TypeScript',
		nodes: {
			'ts-schema': {
				title: 'TypeScript Schema',
				description:
					'Auto-generated TypeScript interfaces for FlagFlow feature flags - type-safe client code with full IntelliSense support',
				keywords:
					'typescript schema, type safety, auto-generated types, typescript interfaces, intellisense, type-safe flags, client types'
			},
			'zod-schema': {
				title: 'Zod Schema Validation',
				description:
					'FlagFlow auto-generated Zod schemas for runtime type validation - ensure flag values match expected types at runtime',
				keywords:
					'zod schema, runtime validation, type validation, schema parsing, runtime type checking, flag validation, type safety'
			},
			hash: {
				title: 'Hash Validation',
				description:
					'FlagFlow SHA-1 hash validation system - ensure flag schema consistency and enable client-side caching with version control',
				keywords:
					'SHA-1 hashing, hash validation, cache consistency, version control, schema validation, client caching'
			}
		}
	},
	migration: {
		groupName: 'Migration',
		nodes: {
			'export-backup': {
				title: 'Export & Backup',
				description:
					'Export and backup FlagFlow feature flags and configurations - create portable backups for disaster recovery and migration',
				keywords:
					'flag export, backup, data export, disaster recovery, configuration backup, flag migration, data portability'
			},
			restore: {
				title: 'Restore',
				description:
					'Restore FlagFlow configurations from backup files - recover flags and settings from exported data with validation',
				keywords:
					'restore flags, backup restore, data recovery, configuration restore, flag import, disaster recovery'
			},
			migration: {
				title: 'Migration',
				description:
					'Migrate FlagFlow feature flags between environments - transfer configurations across development, staging, and production deployments',
				keywords:
					'flag migration, cross-environment migration, environment transfer, production migration, development to production'
			}
		}
	}
} as const satisfies DocumentPageRegistry;

export const documentPageRegistryFlat: Record<string, DocumentPageFlatDescriptor> = Object.entries(
	documentPageRegistry as DocumentPageRegistry
).reduce(
	(accumulator, [slug, entry]) => {
		if ('nodes' in entry)
			for (const [subSlug, subEntry] of Object.entries(entry.nodes))
				accumulator[`${slug}/${subSlug}`] = {
					...subEntry,
					filename: subEntry.filenameOverride || `${slug}/${subSlug}`
				};
		else
			accumulator[slug] = {
				...entry,
				filename: entry.filenameOverride || `${slug}`
			};
		return accumulator;
	},
	{} as Record<string, DocumentPageFlatDescriptor>
);
