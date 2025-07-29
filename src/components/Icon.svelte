<script lang="ts" module>
	export const IconIds = {
		dashboard: 'mdi:view-dashboard',
		flag: 'mdi:flag',
		export: 'mdi:export',
		user: 'mdi:user',
		session: 'mdi:user-group',

		login: 'mdi:login',
		logout: 'mdi:logout',
		email: 'mdi:email',
		keycloak: 'simple-icons:keycloak',
		password: 'mdi:eye-off',
		passwordVisible: 'mdi:eye',
		github: 'mdi:github',

		arrowLeft: 'mdi:chevron-left',
		arrowRight: 'mdi:chevron-right',
		arrowUp: 'mdi:chevron-up',
		arrowDown: 'mdi:chevron-down',
		arrowLeftCircle: 'mdi:arrow-left-drop-circle',
		arrowRightCircle: 'mdi:arrow-right-drop-circle',
		arrowUpCircle: 'mdi:arrow-up-drop-circle',
		arrowDownCircle: 'mdi:arrow-down-drop-circle',
		arrowLeftCircleOutline: 'mdi:arrow-left-drop-circle-outline',
		arrowRightCircleOutline: 'mdi:arrow-right-drop-circle-outline',
		arrowUpCircleOutline: 'mdi:arrow-up-drop-circle-outline',
		arrowDownCircleOutline: 'mdi:arrow-down-drop-circle-outline',
		scrollToTop: 'mdi:arrow-up-bold-circle-outline',
		formatListGroup: 'mdi:format-list-group',
		formatListBulleted: 'mdi:format-list-bulleted',
		formatListNumbered: 'mdi:format-list-numbered',
		formatGrid: 'mdi:grid',
		formatGridOutline: 'mdi:view-grid-outline',
		question: 'mdi:question-mark',

		add: 'mdi:plus',
		edit: 'mdi:edit',
		delete: 'mdi:delete',
		close: 'mdi:close',
		dots: 'mdi:dots-horizontal',
		dotsVertical: 'mdi:dots-vertical',
		search: 'mdi:search',
		noPermission: 'mdi:do-not-disturb-on',
		sortAlphabeticalAscending: 'mdi:sort-alphabetical-ascending',
		sortAlphabeticalDescending: 'mdi:sort-alphabetical-descending',
		sortNumericAscending: 'mdi:sort-numeric-ascending',
		sortNumericDescending: 'mdi:sort-numeric-descending',

		error: 'mdi:error',
		warning: 'mdi:warning',
		information: 'mdi:information'
	};
	export type IconId = keyof typeof IconIds;
	loadIcons(Object.keys(IconIds));
</script>

<script lang="ts">
	import Icon, { loadIcons } from '@iconify/svelte';
	import clsx from 'clsx';

	interface Properties {
		id: IconId;
		class?: string;
		align?: 'left' | 'right';
		size?: number;
		color?: string;
		onclick?: () => void;
	}
	const { id, class: aClass = '', align, size = 20, color = '', onclick }: Properties = $props();

	const cls = clsx(aClass, { 'mr-2': align === 'left', 'ml-2': align === 'right' });
</script>

<Icon class={cls} {color} icon={IconIds[id]} {onclick} width={size} />
