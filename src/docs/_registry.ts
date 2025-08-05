import type { DocumentPageFlatDescriptor, DocumentPageRegistry } from '$lib/documentPageTypes';

export const documentPageRegistry = {
	'': {
		title: 'Getting Started',
		description: 'Learn how to get started with our platform',
		filenameOverride: 'get_started'
	},
	installation: {
		groupName: 'Installation',
		nodes: {
			prerequisites: {
				title: 'Prerequisites',
				description: 'Learn how to install our platform'
				//filenameOverride: 'get_started'
			},
			etcd: {
				title: 'etcd',
				description: 'Learn how to install and configure ETCD',
				filenameOverride: 'get_started'
			},
			docker: {
				title: 'Docker',
				description: 'Learn how to install and configure Docker',
				filenameOverride: 'get_started'
			},
			kubernetes: {
				title: 'Kubernetes',
				description: 'Learn how to install and configure Kubernetes',
				filenameOverride: 'get_started'
			}
		}
	},
	'user-management': {
		groupName: 'User management',
		nodes: {
			authentication: {
				title: 'Authentication',
				description: 'Learn more about authentication in our platform',
				filenameOverride: 'get_started'
			},
			roles: {
				title: 'Roles',
				description: 'Learn more about roles in our platform',
				filenameOverride: 'get_started'
			},
			'built-in-users': {
				title: 'Built-in Users',
				description: 'Learn more about the built-in users in our platform',
				filenameOverride: 'get_started'
			},
			keycloak: {
				title: 'Keycloak',
				description: 'Learn more about Keycloak integration in our platform',
				filenameOverride: 'get_started'
			}
		}
	},
	flags: {
		groupName: 'Flags',
		nodes: {
			'flag-types': {
				title: 'Flag Types',
				description: 'Learn more about the different types of flags in our platform',
				filenameOverride: 'get_started'
			},
			hierarchy: {
				title: 'Flag Hierarchy',
				description: 'Learn more about the hierarchy of flags in our platform',
				filenameOverride: 'get_started'
			},
			'access-flags': {
				title: 'Access Flags',
				description: 'Learn more about access flags in our platform',
				filenameOverride: 'get_started'
			}
		}
	},
	typescript: {
		groupName: 'TypeScript',
		nodes: {
			'ts-schema': {
				title: 'TS Schema',
				description: 'Learn more about the TypeScript schema in our platform',
				filenameOverride: 'get_started'
			},
			'zod-schema': {
				title: 'ZOD Schema',
				description: 'Learn more about the ZOD schema in our platform',
				filenameOverride: 'get_started'
			}
		}
	},
	migration: {
		groupName: 'Migration',
		nodes: {
			'export-backup': {
				title: 'Export/Backup',
				description: 'Learn how to export or backup your data in our platform',
				filenameOverride: 'get_started'
			},
			restore: {
				title: 'Restore',
				description: 'Learn how to restore your data in our platform',
				filenameOverride: 'get_started'
			},
			migration: {
				title: 'Migration',
				description: 'Learn how to migrate your data in our platform',
				filenameOverride: 'get_started'
			}
		}
	},
	'tips-and-tricks': {
		title: 'Tips and Tricks',
		description: 'Learn some tips and tricks to use our platform more effectively',
		filenameOverride: 'get_started'
	},
	glossary: {
		title: 'Glossary',
		description: 'Learn more about the terms used in our platform',
		filenameOverride: 'get_started'
	}
} as const satisfies DocumentPageRegistry;

export const documentPageRegistryFlat: Record<string, DocumentPageFlatDescriptor> = Object.entries(
	documentPageRegistry
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
