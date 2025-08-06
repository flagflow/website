<script lang="ts">
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';

	import { glossaries } from './GLOSSARY';
</script>

<DocsPage>
	<PageTitle title="Glossary">Feature Flag & FlagFlow Terms</PageTitle>

	<DocsPageSection id="terms" title="Terms and Definitions">
		<div class="space-y-6">
			{#each Object.entries(glossaries) as [term, definition]}
				<div class="border-l-4 border-blue-500 pl-4">
					<h3 class="mb-2 text-lg font-semibold text-gray-900">{term}</h3>
					<p class="text-gray-700">{definition}</p>
				</div>
			{/each}
		</div>
	</DocsPageSection>
</DocsPage>
