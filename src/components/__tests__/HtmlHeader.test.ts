import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import HtmlHeader from '../HtmlHeader.svelte';

describe('HtmlHeader', () => {
	it('should render title with app name', () => {
		render(HtmlHeader, { title: 'Test Page' });
		expect(document.title).toBe('FlagFlow • Test Page');
	});

	it('should render app name only when no title provided', () => {
		render(HtmlHeader, { title: '' });
		expect(document.title).toBe('FlagFlow');
	});

	it('should set description meta tag', () => {
		render(HtmlHeader, {
			title: 'Test',
			description: 'Custom description'
		});
		const metaDescription = document.querySelector('meta[name="description"]');
		expect(metaDescription?.getAttribute('content')).toBe('Custom description');
	});

	it('should use default description when none provided', () => {
		render(HtmlHeader, { title: 'Test' });
		const metaDescription = document.querySelector('meta[name="description"]');
		expect(metaDescription?.getAttribute('content')).toContain('FlagFlow is an open-source');
	});

	it('should set keywords meta tag', () => {
		render(HtmlHeader, {
			title: 'Test',
			keywords: 'test, custom, keywords'
		});
		const metaKeywords = document.querySelector('meta[name="keywords"]');
		expect(metaKeywords?.getAttribute('content')).toBe('test, custom, keywords');
	});

	it('should use default keywords when none provided', () => {
		render(HtmlHeader, { title: 'Test' });
		const metaKeywords = document.querySelector('meta[name="keywords"]');
		expect(metaKeywords?.getAttribute('content')).toContain('flagflow');
	});

	it('should set Open Graph meta tags', () => {
		render(HtmlHeader, {
			title: 'Test Page',
			description: 'Test description'
		});

		const ogTitle = document.querySelector('meta[property="og:title"]');
		const ogDescription = document.querySelector('meta[property="og:description"]');
		const ogType = document.querySelector('meta[property="og:type"]');
		const ogImage = document.querySelector('meta[property="og:image"]');

		expect(ogTitle?.getAttribute('content')).toBe('FlagFlow • Test Page');
		expect(ogDescription?.getAttribute('content')).toBe('Test description');
		expect(ogType?.getAttribute('content')).toBe('website');
		expect(ogImage?.getAttribute('content')).toContain('favicon.png');
	});

	it('should set custom og type', () => {
		render(HtmlHeader, {
			title: 'Test',
			ogType: 'article'
		});
		const ogType = document.querySelector('meta[property="og:type"]');
		expect(ogType?.getAttribute('content')).toBe('article');
	});

	it('should set custom og image', () => {
		render(HtmlHeader, {
			title: 'Test',
			ogImage: '/custom-image.png'
		});
		const ogImage = document.querySelector('meta[property="og:image"]');
		expect(ogImage?.getAttribute('content')).toContain('custom-image.png');
	});

	it('should set Twitter Card meta tags', () => {
		render(HtmlHeader, {
			title: 'Test Page',
			description: 'Test description'
		});

		const twitterCard = document.querySelector('meta[name="twitter:card"]');
		const twitterTitle = document.querySelector('meta[name="twitter:title"]');
		const twitterDescription = document.querySelector('meta[name="twitter:description"]');
		const twitterImage = document.querySelector('meta[name="twitter:image"]');

		expect(twitterCard?.getAttribute('content')).toBe('Test Page');
		expect(twitterTitle?.getAttribute('content')).toBe('FlagFlow • Test Page');
		expect(twitterDescription?.getAttribute('content')).toBe('Test description');
		expect(twitterImage?.getAttribute('content')).toContain('favicon.png');
	});
});
