/* eslint-disable vitest/prefer-expect-assertions */
/* eslint-disable vitest/require-mock-type-parameters */
import { describe, expect, it, vi } from 'vitest';

// Mock SvelteKit's error function
vi.mock('@sveltejs/kit', () => ({
	error: vi.fn()
}));

// Mock the document loading function
vi.mock('$lib/documentPage', () => ({
	getDocument: vi.fn()
}));

import { error } from '@sveltejs/kit';

import { getDocument } from '$lib/documentPage';

import { entries, load } from '../src/routes/docs/[...slug]/+page';

describe('route Generation', () => {
	describe('entries function', () => {
		it('should generate entries for all registry items', () => {
			const result = entries() as { slug: string }[];

			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBeGreaterThan(0);

			// Check that entries have the expected structure
			for (const entry of result) {
				expect(entry).toHaveProperty('slug');
				expect(typeof entry.slug).toBe('string');
			}
		});

		it('should include root page entry', () => {
			const result = entries() as { slug: string }[];
			const rootEntry = result.find((entry) => entry.slug === '');

			expect(rootEntry).toBeDefined();
		});

		it('should include nested entries', () => {
			const result = entries() as { slug: string }[];
			const nestedEntry = result.find((entry) => entry.slug === 'installation/prerequisites');

			expect(nestedEntry).toBeDefined();
		});

		it('should include all expected sections', () => {
			const result = entries() as { slug: string }[];
			const slugs = result.map((entry) => entry.slug);

			expect(slugs).toContain('');
			expect(slugs).toContain('glossary');
			expect(slugs).toContain('tips-and-tricks');
			expect(slugs).toContain('installation/prerequisites');
			expect(slugs).toContain('user-management/authentication');
			expect(slugs).toContain('flags/flag-types');
		});
	});

	describe('load function', () => {
		it('should return document when found', () => {
			const mockDocument = {
				slug: 'test',
				meta: { title: 'Test', description: 'Test description' },
				component: {} as never
			};

			vi.mocked(getDocument).mockReturnValue(mockDocument);

			const result = load({ params: { slug: 'test' } } as Parameters<typeof load>[0]);

			expect(result).toStrictEqual({ doc: mockDocument });
			expect(getDocument).toHaveBeenCalledWith('test');
		});

		it('should throw 404 error when document not found', () => {
			vi.mocked(getDocument).mockReturnValue(undefined as undefined);
			vi.mocked(error).mockImplementation((status, message) => {
				throw new Error(`${status}: ${message}`);
			});

			expect(() => {
				load({ params: { slug: 'non-existent' } } as Parameters<typeof load>[0]);
			}).toThrow('404: Page not found');

			expect(getDocument).toHaveBeenCalledWith('non-existent');
			expect(error).toHaveBeenCalledWith(404, 'Page not found');
		});

		it('should handle empty slug parameter', () => {
			const mockDocument = {
				slug: '',
				meta: { title: 'Getting Started', description: 'Test description' },
				component: {} as never
			};

			vi.mocked(getDocument).mockReturnValue(mockDocument);

			const result = load({ params: { slug: '' } } as Parameters<typeof load>[0]);

			expect(result).toStrictEqual({ doc: mockDocument });
			expect(getDocument).toHaveBeenCalledWith('');
		});

		it('should handle nested slug parameters', () => {
			const mockDocument = {
				slug: 'installation/prerequisites',
				meta: { title: 'Prerequisites', description: 'Test description' },
				component: {} as never
			};

			vi.mocked(getDocument).mockReturnValue(mockDocument);

			const result = load({ params: { slug: 'installation/prerequisites' } } as Parameters<
				typeof load
			>[0]);

			expect(result).toStrictEqual({ doc: mockDocument });
			expect(getDocument).toHaveBeenCalledWith('installation/prerequisites');
		});
	});
});
