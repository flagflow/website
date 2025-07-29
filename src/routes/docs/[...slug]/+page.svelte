<script lang="ts">
	import HtmlTitle from '$components/HtmlTitle.svelte';

	import type { PageProps as PageProperties } from './$types';

	const { data }: PageProperties = $props();
</script>

<HtmlTitle description={data.doc.meta.description} title={data.doc.meta.title} />

<data.doc.component />
