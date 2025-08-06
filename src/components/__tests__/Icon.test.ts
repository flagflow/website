import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import Icon, { IconIds } from '../Icon.svelte';

describe('Icon', () => {
	it('should render without errors', () => {
		expect(() => render(Icon, { id: 'dashboard' })).not.toThrow();
	});

	it('should render with custom props without errors', () => {
		expect(() =>
			render(Icon, {
				id: 'flag',
				class: 'custom-class',
				align: 'left',
				size: 32,
				color: '#ff0000'
			})
		).not.toThrow();
	});

	it('should render with different alignment options without errors', () => {
		expect(() => render(Icon, { id: 'user', align: 'left' })).not.toThrow();
		expect(() => render(Icon, { id: 'user', align: 'right' })).not.toThrow();
	});

	it('should have all expected icon IDs', () => {
		expect(IconIds).toHaveProperty('dashboard');
		expect(IconIds).toHaveProperty('flag');
		expect(IconIds).toHaveProperty('user');
		expect(IconIds).toHaveProperty('github');
		expect(IconIds).toHaveProperty('error');
		expect(IconIds).toHaveProperty('warning');
		expect(IconIds).toHaveProperty('information');
	});

	it('should map icon IDs correctly', () => {
		expect(IconIds.dashboard).toBe('mdi:view-dashboard');
		expect(IconIds.flag).toBe('mdi:flag');
		expect(IconIds.github).toBe('mdi:github');
		expect(IconIds.keycloak).toBe('simple-icons:keycloak');
	});
});
