import { describe, expect, it } from 'vitest';

import { documentPageRegistry, documentPageRegistryFlat } from '../_registry';

describe('documentPageRegistry', () => {
	describe('documentPageRegistry', () => {
		it('should contain root page entry', () => {
			expect(documentPageRegistry['']).toBeDefined();
			expect(documentPageRegistry[''].title).toBe('Getting Started');
			expect(documentPageRegistry[''].description).toBe(
				'Learn how to get started with our platform'
			);
		});

		it('should contain installation group', () => {
			expect(documentPageRegistry.installation).toBeDefined();
			expect('groupName' in documentPageRegistry.installation).toBe(true);

			if ('groupName' in documentPageRegistry.installation) {
				expect(documentPageRegistry.installation.groupName).toBe('Installation');
				expect(documentPageRegistry.installation.nodes.prerequisites).toBeDefined();
				expect(documentPageRegistry.installation.nodes.etcd).toBeDefined();
				expect(documentPageRegistry.installation.nodes.docker).toBeDefined();
				expect(documentPageRegistry.installation.nodes.kubernetes).toBeDefined();
			}
		});

		it('should contain user-management group', () => {
			expect(documentPageRegistry['user-management']).toBeDefined();
			expect('groupName' in documentPageRegistry['user-management']).toBe(true);

			if ('groupName' in documentPageRegistry['user-management']) {
				expect(documentPageRegistry['user-management'].groupName).toBe('User management');
				expect(documentPageRegistry['user-management'].nodes.authentication).toBeDefined();
				expect(documentPageRegistry['user-management'].nodes.permissions).toBeDefined();
			}
		});

		it('should contain flags group', () => {
			expect(documentPageRegistry.flags).toBeDefined();
			expect('groupName' in documentPageRegistry.flags).toBe(true);

			if ('groupName' in documentPageRegistry.flags) {
				expect(documentPageRegistry.flags.groupName).toBe('Flags');
				expect(documentPageRegistry.flags.nodes['flag-types']).toBeDefined();
				expect(documentPageRegistry.flags.nodes.hierarchy).toBeDefined();
				expect(documentPageRegistry.flags.nodes['access-flags']).toBeDefined();
			}
		});

		it('should contain standalone pages', () => {
			expect(documentPageRegistry.glossary).toBeDefined();

			expect('title' in documentPageRegistry.glossary).toBe(true);
		});
	});

	describe('documentPageRegistryFlat', () => {
		it('should flatten root page with custom filename', () => {
			expect(documentPageRegistryFlat['']).toBeDefined();
			expect(documentPageRegistryFlat[''].title).toBe('Getting Started');
			expect(documentPageRegistryFlat[''].filename).toBe('get_started');
		});

		it('should flatten grouped entries with proper slugs', () => {
			expect(documentPageRegistryFlat['installation/prerequisites']).toBeDefined();
			expect(documentPageRegistryFlat['installation/prerequisites'].title).toBe('Prerequisites');
			expect(documentPageRegistryFlat['installation/prerequisites'].filename).toBe(
				'installation/prerequisites'
			);

			expect(documentPageRegistryFlat['installation/etcd']).toBeDefined();
			expect(documentPageRegistryFlat['installation/etcd'].title).toBe('etcd');
			expect(documentPageRegistryFlat['installation/etcd'].filename).toBe('installation/etcd');
		});

		it('should flatten user-management entries', () => {
			expect(documentPageRegistryFlat['user-management/authentication']).toBeDefined();
			expect(documentPageRegistryFlat['user-management/authentication'].title).toBe(
				'Authentication'
			);
			expect(documentPageRegistryFlat['user-management/authentication'].filename).toBe(
				'user-management/authentication'
			);

			expect(documentPageRegistryFlat['user-management/built-in-users']).toBeDefined();
			expect(documentPageRegistryFlat['user-management/built-in-users'].title).toBe(
				'Built-in Users'
			);
			expect(documentPageRegistryFlat['user-management/built-in-users'].filename).toBe(
				'user-management/built-in-users'
			);
		});

		it('should flatten flags entries', () => {
			expect(documentPageRegistryFlat['flags/flag-types']).toBeDefined();
			expect(documentPageRegistryFlat['flags/flag-types'].title).toBe('Flag Types');
			expect(documentPageRegistryFlat['flags/flag-types'].filename).toBe('flags/flag-types');
		});

		it('should flatten standalone pages', () => {
			expect(documentPageRegistryFlat['glossary']).toBeDefined();
			expect(documentPageRegistryFlat['glossary'].title).toBe('Glossary');
			expect(documentPageRegistryFlat['glossary'].filename).toBe('glossary');
		});

		it('should have proper count of entries', () => {
			const flatEntries = Object.keys(documentPageRegistryFlat);
			expect(flatEntries.length).toBeGreaterThan(10);
		});

		it('should contain TypeScript entries', () => {
			expect(documentPageRegistryFlat['typescript/ts-schema']).toBeDefined();
			expect(documentPageRegistryFlat['typescript/zod-schema']).toBeDefined();
			expect(documentPageRegistryFlat['typescript/hash']).toBeDefined();
		});

		it('should contain migration entries', () => {
			expect(documentPageRegistryFlat['migration/export-backup']).toBeDefined();
			expect(documentPageRegistryFlat['migration/restore']).toBeDefined();
			expect(documentPageRegistryFlat['migration/migration']).toBeDefined();
		});
	});
});
