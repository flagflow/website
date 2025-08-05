<script lang="ts">
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle subTitle="Flagflow documentation" title="Get started">
		This page describes how to get started with the Flagflow application.
	</PageTitle>

	{#each ['A', 'B', 'C', 'D'] as id}
		<DocsPageSection {id} title="Section {id}">
			Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
			laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
			beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
			odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
			Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
			sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
			voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
			laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
			qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
			fugiat quo voluptas nulla pariatur?
		</DocsPageSection>
	{/each}
</DocsPage>
