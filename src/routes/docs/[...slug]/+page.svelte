<script lang="ts">
	import HtmlTitle from '$components/HtmlTitle.svelte';

	import type { PageProps as PageProperties } from './$types';

	const { data }: PageProperties = $props();
</script>

<HtmlTitle
	description={data.doc.meta.description}
	keywords={data.doc.meta.keywords || ''}
	title={data.doc.meta.title}
/>

<data.doc.component />
