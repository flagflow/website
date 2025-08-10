<script lang="ts">
	interface Properties {
		title: string;
		description?: string;
		keywords?: string;
		ogImage?: string;
		ogType?: string;
	}

	const {
		title,
		description = 'FlagFlow is an open-source feature flag management platform that helps teams manage feature toggles, control feature rollouts, and improve software development processes',
		keywords = 'flagflow, feature flag, feature management, feature toggle, feature flag management, feature flagging, feature flags, feature toggles, feature management platform, software development, devops',
		ogImage = '/favicon.png',
		ogType = 'website'
	}: Properties = $props();

	const APPNAME = 'FlagFlow';
	const baseUrl = typeof window === 'undefined' ? '' : window.location.origin;

	const fullTitle = $derived(title ? `${title} • ${APPNAME}` : APPNAME);
	const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />

	<!-- Open Graph -->
	<meta content={fullTitle} property="og:title" />
	<meta content={description} property="og:description" />
	<meta content={ogType} property="og:type" />
	<meta content={fullOgImage} property="og:image" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content={title} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullOgImage} />
</svelte:head>
