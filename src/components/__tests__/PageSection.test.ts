import { render } from '@testing-library/svelte';
import type { Snippet } from 'svelte';
import { describe, expect, it } from 'vitest';

import PageSection from '../PageSection.svelte';

// Helper to create a simple text snippet for testing
const createTextSnippet = (text: string): Snippet => {
	// @ts-expect-error - Testing utility for snippet creation
	return () => text;
};

describe('PageSection', () => {
	it('should render with default background color', () => {
		const { container } = render(PageSection, {
			children: createTextSnippet('Test content')
		});

		const sectionDiv = container.querySelector('div');
		expect(sectionDiv?.getAttribute('class')).toContain('bg-white');
	});

	it('should apply custom background color', () => {
		const { container } = render(PageSection, {
			bgColor: 'bg-gray-100',
			children: createTextSnippet('Test content')
		});

		const sectionDiv = container.querySelector('div');
		expect(sectionDiv?.getAttribute('class')).toContain('bg-gray-100');
	});

	it('should render without errors', () => {
		expect(() =>
			render(PageSection, {
				children: createTextSnippet('Test section content')
			})
		).not.toThrow();
	});

	it('should apply standard layout classes', () => {
		const { container } = render(PageSection, {
			children: createTextSnippet('Test content')
		});

		const sectionDiv = container.querySelector('div');
		const innerDiv = sectionDiv?.querySelector('div');

		expect(sectionDiv?.getAttribute('class')).toContain('py-4');
		expect(innerDiv?.getAttribute('class')).toContain('mx-auto');
		expect(innerDiv?.getAttribute('class')).toContain('max-w-[1280px]');
		expect(innerDiv?.getAttribute('class')).toContain('px-16');
	});

	it('should render border when border prop is true', () => {
		const { container } = render(PageSection, {
			border: true,
			children: createTextSnippet('Test content')
		});

		const hrElements = container.querySelectorAll('hr');
		expect(hrElements.length).toBe(2); // Before and after content
	});

	it('should render border when borderColor is provided', () => {
		const { container } = render(PageSection, {
			borderColor: 'text-red-500',
			children: createTextSnippet('Test content')
		});

		const hrElements = container.querySelectorAll('hr');
		expect(hrElements.length).toBe(2);
		expect(hrElements[0]?.getAttribute('class')).toBe('text-red-500');
		expect(hrElements[1]?.getAttribute('class')).toBe('text-red-500');
	});

	it('should use default border color when border is true but no borderColor provided', () => {
		const { container } = render(PageSection, {
			border: true,
			children: createTextSnippet('Test content')
		});

		const hrElements = container.querySelectorAll('hr');
		expect(hrElements[0]?.getAttribute('class')).toBe('text-gray-300');
		expect(hrElements[1]?.getAttribute('class')).toBe('text-gray-300');
	});

	it('should not render border by default', () => {
		const { container } = render(PageSection, {
			children: createTextSnippet('Test content')
		});

		const hrElements = container.querySelectorAll('hr');
		expect(hrElements.length).toBe(0);
	});
});
