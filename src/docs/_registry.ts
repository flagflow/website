import type { DocumentPageDescriptor } from '$lib/documentPageTypes';

export const documentPageRegistry = {
	'': {
		title: 'Getting Started',
		description: 'Learn how to get started with our platform',
		filenameOverride: 'get_started'
	},

	'installation/prerequisites': {
		title: 'Prerequisites',
		description: 'Learn how to install our platform',
		filenameOverride: 'get_started'
	},
	'installation/etcd': {
		title: 'ectd',
		description: 'Learn how to install and configure ETCD',
		filenameOverride: 'get_started'
	},
	'installation/docker': {
		title: 'Docker',
		description: 'Learn how to install and configure Docker',
		filenameOverride: 'get_started'
	},
	'installation/kubernetes': {
		title: 'Kubernetes',
		description: 'Learn how to install and configure Kubernetes',
		filenameOverride: 'get_started'
	},

	'user-management/authentication': {
		title: 'Authentication',
		description: 'Learn more about authentication in our platform',
		filenameOverride: 'get_started'
	},
	'user-management/roles': {
		title: 'Roles',
		description: 'Learn more about roles in our platform',
		filenameOverride: 'get_started'
	},
	'user-management/built-in-users': {
		title: 'Built-in Users',
		description: 'Learn more about the built-in users in our platform',
		filenameOverride: 'get_started'
	},
	'user-management/keycloak': {
		title: 'Keycloak',
		description: 'Learn more about Keycloak integration in our platform',
		filenameOverride: 'get_started'
	},

	'flags/flag-types': {
		title: 'Flag Types',
		description: 'Learn more about the different types of flags in our platform',
		filenameOverride: 'get_started'
	},
	'flags/hierarchy': {
		title: 'Flag Hierarchy',
		description: 'Learn more about the hierarchy of flags in our platform',
		filenameOverride: 'get_started'
	},
	'flags/access-flags': {
		title: 'Access Flags',
		description: 'Learn more about access flags in our platform',
		filenameOverride: 'get_started'
	},

	'typescript/typescript-schema': {
		title: 'TypeScript Schema',
		description: 'Learn more about the TypeScript schema in our platform',
		filenameOverride: 'get_started'
	},
	'typescript/zod-schema': {
		title: 'ZOD Schema',
		description: 'Learn more about the ZOD schema in our platform',
		filenameOverride: 'get_started'
	},

	'migration/export-backup': {
		title: 'Export/Backup',
		description: 'Learn how to export or backup your data in our platform',
		filenameOverride: 'get_started'
	},
	'migration/restore': {
		title: 'Restore',
		description: 'Learn how to restore your data in our platform',
		filenameOverride: 'get_started'
	},
	'migration/migration': {
		title: 'Migration',
		description: 'Learn how to migrate your data in our platform',
		filenameOverride: 'get_started'
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
} as const satisfies Record<string, DocumentPageDescriptor>;

export const documentPageRegistryHierarchical: Record<
	string,
	DocumentPageDescriptor | { nodes: Record<string, DocumentPageDescriptor> }
> = {
	'': documentPageRegistry[''],
	Installation: {
		nodes: {
			'installation/prerequisites': documentPageRegistry['installation/prerequisites'],
			'installation/etcd': documentPageRegistry['installation/etcd'],
			'installation/docker': documentPageRegistry['installation/docker'],
			'installation/kubernetes': documentPageRegistry['installation/kubernetes']
		}
	},
	'User management': {
		nodes: {
			'user-management/authentication': documentPageRegistry['user-management/authentication'],
			'user-management/roles': documentPageRegistry['user-management/roles'],
			'user-management/built-in-users': documentPageRegistry['user-management/built-in-users'],
			'user-management/keycloak': documentPageRegistry['user-management/keycloak']
		}
	},
	Flags: {
		nodes: {
			'flags/flag-types': documentPageRegistry['flags/flag-types'],
			'flags/hierarchy': documentPageRegistry['flags/hierarchy'],
			'flags/access-flags': documentPageRegistry['flags/access-flags']
		}
	},
	Typescript: {
		nodes: {
			'typescript/typescript-schema': documentPageRegistry['typescript/typescript-schema'],
			'typescript/zod-schema': documentPageRegistry['typescript/zod-schema']
		}
	},
	Migration: {
		nodes: {
			'migration/export-backup': documentPageRegistry['migration/export-backup'],
			'migration/restore': documentPageRegistry['migration/restore'],
			'migration/migration': documentPageRegistry['migration/migration']
		}
	},
	'tips-and-tricks': documentPageRegistry['tips-and-tricks'],
	glossary: documentPageRegistry['glossary']
};

/*

Getting started
Installation
- Prerequisites
- Etcd
- Docker
- Kubernetes
User management
- Authentication
- Roles
- Built-in users
- Keycloak
Flags
- Flag types
- Hierarchy
- Access flags
Typescript
- Typescript schema
- ZOD schema
Migration
- Export/Backup
- Restore
- Migration
Tips and tricks
Glossary

*/
