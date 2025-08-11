import type { DocumentPageFlatDescriptor, DocumentPageRegistry } from '$lib/documentPageTypes';

export const documentPageRegistry = {
	'': {
		title: 'Getting Started',
		description: 'Complete guide to setting up and using FlagFlow for feature flag management',
		filenameOverride: 'get_started',
		keywords: 'flagflow, feature flags, getting started, setup, installation, tutorial, guide'
	},
	installation: {
		groupName: 'Installation',
		nodes: {
			prerequisites: {
				title: 'Prerequisites',
				description: 'System requirements and dependencies needed before installing FlagFlow',
				keywords:
					'prerequisites, system requirements, dependencies, installation requirements, setup'
			},
			etcd: {
				title: 'etcd',
				description: 'Install and configure etcd as the distributed key-value store for FlagFlow',
				keywords: 'etcd, distributed storage, key-value store, configuration, clustering, database'
			},
			docker: {
				title: 'Docker',
				description: 'Deploy FlagFlow using Docker containers with docker-compose configuration',
				keywords: 'docker, containerization, deployment, docker-compose, containers, devops'
			},
			kubernetes: {
				title: 'Kubernetes',
				description: 'Deploy FlagFlow on Kubernetes clusters with Helm charts and manifests',
				keywords: 'kubernetes, k8s, orchestration, helm, deployment, scaling, cloud native'
			},
			'env-variables': {
				title: 'ENV variables',
				description:
					'Configure FlagFlow using environment variables for different deployment scenarios',
				keywords: 'environment variables, configuration, settings, deployment, customization'
			}
		}
	},
	'user-management': {
		groupName: 'User management',
		nodes: {
			authentication: {
				title: 'Authentication',
				description: 'Understanding FlagFlow authentication system and security model',
				keywords: 'authentication, security, login, access control, user management, auth'
			},
			permissions: {
				title: 'Permissions',
				description: 'Granular permission model and role-based access control in FlagFlow',
				keywords: 'permissions, rbac, role-based access control, authorization, security, roles'
			},
			'built-in-users': {
				title: 'Built-in Users',
				description: 'Simple user management solution for small to medium-sized teams',
				keywords: 'built-in users, user management, simple auth, local users, team management'
			},
			keycloak: {
				title: 'Keycloak',
				description: 'Enterprise-grade authentication with Keycloak SSO integration',
				keywords: 'keycloak, sso, single sign-on, enterprise auth, oauth, openid connect'
			}
		}
	},
	flags: {
		groupName: 'Flags',
		nodes: {
			'flag-types': {
				title: 'Flag Types',
				description:
					'Understanding FlagFlow comprehensive flag type system for different use cases',
				keywords: 'flag types, feature flags, boolean flags, string flags, number flags, json flags'
			},
			hierarchy: {
				title: 'Flag Hierarchy',
				description:
					'Organizing and structuring feature flags for better management and maintainability',
				keywords: 'flag hierarchy, organization, structure, namespaces, grouping, management'
			},
			'access-flags': {
				title: 'Access Flags',
				description: 'Retrieving feature flags through various access methods and API formats',
				keywords: 'access flags, api, rest api, flag retrieval, client sdk, integration'
			}
		}
	},
	typescript: {
		groupName: 'TypeScript',
		nodes: {
			'ts-schema': {
				title: 'TS Schema',
				description: 'Automatic type-safe TypeScript interfaces for your feature flags',
				keywords: 'typescript, type safety, schema generation, interfaces, client code, ts'
			},
			'zod-schema': {
				title: 'ZOD Schema',
				description: 'Runtime type validation and parsing with automatically generated Zod schemas',
				keywords: 'zod, runtime validation, type parsing, schema validation, typescript, validation'
			},
			hash: {
				title: 'Hashes',
				description: 'Ensuring type safety and cache consistency with SHA-1 hashing',
				keywords: 'hash validation, sha1, cache consistency, type safety, versioning'
			}
		}
	},
	migration: {
		groupName: 'Migration',
		nodes: {
			'export-backup': {
				title: 'Export/Backup',
				description: 'Create comprehensive backups of your feature flags and configuration',
				keywords: 'export, backup, data export, configuration backup, migration, data management'
			},
			restore: {
				title: 'Restore',
				description: 'Restore feature flag configurations from backup files',
				keywords: 'restore, backup restore, data recovery, configuration restore, import'
			},
			migration: {
				title: 'Migration',
				description: 'Transfer feature flag configurations between different FlagFlow environments',
				keywords: 'migration, cross-environment, data transfer, environment migration, deployment'
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
