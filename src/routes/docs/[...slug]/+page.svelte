<script lang="ts">
	import HtmlHeader from '$components/HtmlHeader.svelte';

	import type { PageProps as PageProperties } from './$types';

	const { data }: PageProperties = $props();
</script>

<HtmlHeader
	description={data.doc.meta.description}
	keywords={data.doc.meta.keywords || ''}
	title={data.doc.meta.title}
/>

<data.doc.component />
