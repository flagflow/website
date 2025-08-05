<script lang="ts">
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Prerequisites">What are the prerequisites for installing FlagFlow?</PageTitle>

	<DocsPageSection
		id="container"
		hotlink={[
			{ title: 'Docker', href: 'docker' },
			{ title: 'Kubernetes', href: 'kubernetes' }
		]}
		image={{ src: '/images/kubernetes.png', alt: 'Kubernetes icon' }}
		shortTitle="Container engine"
		title="Any container engine: Docker or Kubernetes"
	>
		The FlagFlow system is delivered as a Docker image. Therefore, it is necessary to have a
		containerized runtime environment (Docker or Kubernetes) available. An enterprise environment is
		the ideal choice, but a simple Docker installation is sufficient for developing and testing
		FlagFlow. Before installing FlagFlow, please ensure that your Docker or Kubernetes environment
		is functioning correctly.
	</DocsPageSection>

	<DocsPageSection
		id="ectd"
		hotlink={{ title: 'etcd', href: 'etcd' }}
		image={{ src: '/images/etcd.png', alt: 'etcd icon' }}
		shortTitle="etcd"
		title="etcd: distributed, reliable key-value store"
	>
		FlagFlow is a distributed system that stores its state in a distributed key-value store, etcd.
		The installation and configuration of etcd are necessary for FlagFlow to function. Since a
		containerized environment is a prerequisite for FlagFlow itself, it is practical to also run
		etcd in a container. While etcd can be installed in a distributed cluster environment for high
		availability, a single-instance setup is sufficient for the efficient operation of FlagFlow in
		development and testing scenarios. Before installing FlagFlow, please ensure that etcd is
		properly installed and functioning.
	</DocsPageSection>
</DocsPage>
