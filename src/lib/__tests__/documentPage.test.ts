import { describe, expect, it } from 'vitest';

import { getDocument } from '../documentPage';

describe('documentPage', () => {
	describe('getDocument', () => {
		it('should return undefined for non-existent slug', () => {
			const result = getDocument('non-existent-slug');
			expect(result).toBeUndefined();
		});

		it('should return document for valid slug', () => {
			const result = getDocument('');
			expect(result).toBeDefined();
			expect(result?.slug).toBe('');
			expect(result?.meta.title).toBe('Getting Started');
			expect(result?.meta.description).toBe('Learn how to get started with our platform');
			expect(result?.component).toBeDefined();
		});

		it('should return document for nested slug', () => {
			const result = getDocument('installation/prerequisites');
			expect(result).toBeDefined();
			expect(result?.slug).toBe('installation/prerequisites');
			expect(result?.meta.title).toBe('Prerequisites');
			expect(result?.meta.description).toBe('Learn how to install our platform');
			expect(result?.component).toBeDefined();
		});

		it('should return document for user-management slug', () => {
			const result = getDocument('user-management/authentication');
			expect(result).toBeDefined();
			expect(result?.slug).toBe('user-management/authentication');
			expect(result?.meta.title).toBe('Authentication');
			expect(result?.meta.description).toBe('Learn more about authentication in our platform');
			expect(result?.component).toBeDefined();
		});

		it('should handle flags section', () => {
			const result = getDocument('flags/flag-types');
			expect(result).toBeDefined();
			expect(result?.slug).toBe('flags/flag-types');
			expect(result?.meta.title).toBe('Flag Types');
			expect(result?.component).toBeDefined();
		});
	});
});
