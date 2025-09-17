/* eslint-disable vitest/prefer-expect-assertions */
/* eslint-disable vitest/no-conditional-expect */
import { describe, expect, expectTypeOf,it } from 'vitest';

import { documentPageRegistryFlat } from '../src/docs/_registry';
import { getDocument } from '../src/lib/documentPage';

describe('integration Tests', () => {
	describe('registry and Document Loading Integration', () => {
		it('should be able to load all registered documents', () => {
			const registryKeys = Object.keys(documentPageRegistryFlat);

			expect(registryKeys.length).toBeGreaterThan(0);

			// Test a few key documents to ensure they can be loaded
			const testSlugs = ['', 'installation/prerequisites', 'flags/flag-types'];

			for (const slug of testSlugs) {
				if (registryKeys.includes(slug)) {
					const document = getDocument(slug);

					expect(document).toBeDefined();
					expect(document?.slug).toBe(slug);
					expect(document?.meta).toBeDefined();
					expect(document?.meta.title).toBeDefined();
					expect(document?.meta.description).toBeDefined();
					expect(document?.component).toBeDefined();
				}
			}
		});

		it('should have consistent filename mapping', () => {
			const entries = Object.entries(documentPageRegistryFlat);

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			for (const [slug, descriptor] of entries) {
				expect(descriptor.filename).toBeDefined();

				expectTypeOf(descriptor.filename).toBeString();

				expect(descriptor.filename.length).toBeGreaterThan(0);

				// Filename should not start with a slash
				expect(descriptor.filename.startsWith('/')).toBe(false);
			}
		});

		it('should have all required metadata fields', () => {
			const entries = Object.entries(documentPageRegistryFlat);

			for (const [, descriptor] of entries) {
				expect(descriptor.title).toBeDefined();

				expectTypeOf(descriptor.title).toBeString();

				expect(descriptor.title.length).toBeGreaterThan(0);

				expect(descriptor.description).toBeDefined();

				expectTypeOf(descriptor.description).toBeString();

				expect(descriptor.description.length).toBeGreaterThan(0);
			}
		});

		it('should maintain registry integrity', () => {
			// const registryKeys = Object.keys(documentPageRegistryFlat);
			const uniqueFilenames = new Set();

			for (const [slug, descriptor] of Object.entries(documentPageRegistryFlat)) {
				// Check for duplicate filenames
				expect(uniqueFilenames.has(descriptor.filename)).toBe(false);

				uniqueFilenames.add(descriptor.filename);

				// Slug should be consistent
				expectTypeOf(slug).toBeString();
			}
		});

		it('should handle special cases correctly', () => {
			// Root page should have custom filename
			const rootPage = documentPageRegistryFlat[''];

			expect(rootPage).toBeDefined();
			expect(rootPage.filename).toBe('get_started');

			// Built-in users page should have proper slug
			const builtInUsers = documentPageRegistryFlat['user-management/built-in-users'];

			expect(builtInUsers).toBeDefined();
			expect(builtInUsers.filename).toBe('user-management/built-in-users');
		});

		it('should have expected structure for grouped items', () => {
			// Test installation group
			const installationSlugs = Object.keys(documentPageRegistryFlat).filter((slug) =>
				slug.startsWith('installation/')
			);

			expect(installationSlugs.length).toBeGreaterThan(0);
			expect(installationSlugs).toContain('installation/prerequisites');
			expect(installationSlugs).toContain('installation/etcd');
			expect(installationSlugs).toContain('installation/docker');
			expect(installationSlugs).toContain('installation/kubernetes');

			// Test flags group
			const flagsSlugs = Object.keys(documentPageRegistryFlat).filter((slug) =>
				slug.startsWith('flags/')
			);

			expect(flagsSlugs.length).toBeGreaterThan(0);
			expect(flagsSlugs).toContain('flags/flag-types');
			expect(flagsSlugs).toContain('flags/hierarchy');
			expect(flagsSlugs).toContain('flags/access-flags');
		});
	});
});
