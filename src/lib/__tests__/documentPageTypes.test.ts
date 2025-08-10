/* eslint-disable unicorn/no-unused-properties */
import { describe, expect, it } from 'vitest';

import type {
	DocumentPageDescriptor,
	DocumentPageFlatDescriptor,
	DocumentPageMeta
} from '../documentPageTypes';

describe('documentPageTypes', () => {
	describe('DocumentPageMeta', () => {
		it('should have required properties', () => {
			const meta: DocumentPageMeta = {
				title: 'Test Title',
				description: 'Test Description'
			};

			expect(meta.title).toBe('Test Title');
			expect(meta.description).toBe('Test Description');
			expect(meta.keywords).toBeUndefined();
		});

		it('should allow optional keywords', () => {
			const meta: DocumentPageMeta = {
				title: 'Test Title',
				description: 'Test Description',
				keywords: 'test, keywords'
			};

			expect(meta.keywords).toBe('test, keywords');
		});
	});

	describe('DocumentPageDescriptor', () => {
		it('should extend DocumentPageMeta', () => {
			const descriptor: DocumentPageDescriptor = {
				title: 'Test Title',
				description: 'Test Description'
			};

			expect(descriptor.title).toBe('Test Title');
			expect(descriptor.description).toBe('Test Description');
			expect(descriptor.filenameOverride).toBeUndefined();
		});

		it('should allow filenameOverride', () => {
			const descriptor: DocumentPageDescriptor = {
				title: 'Test Title',
				description: 'Test Description',
				filenameOverride: 'custom_filename'
			};

			expect(descriptor.filenameOverride).toBe('custom_filename');
		});
	});

	describe('DocumentPageFlatDescriptor', () => {
		it('should have required filename property', () => {
			const flatDescriptor: DocumentPageFlatDescriptor = {
				title: 'Test Title',
				description: 'Test Description',
				filename: 'test/filename'
			};

			expect(flatDescriptor.filename).toBe('test/filename');
		});
	});
});
