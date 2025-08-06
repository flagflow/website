<script lang="ts">
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="etcd"
		>Az etcd egy elosztott, kulcs-érték tároló, amelyet konfigurációs adatok tárolására és
		kezelésére használnak</PageTitle
	>

	<DocsPageSection id="why-etcd" title="Why etcd?">
		Az etcd egy <b>nagy terhelhetőségű és megbízható</b> kulcs-érték tároló, amelynek legismertebb
		előfordulási helye a Kubernetes konfigurációs környezete. Szokták mondani, hogy az etcd a
		Kubernetes "szíve", mivel itt tárolódnak a klaszter állapotát leíró adatok. Az etcd használata
		lehetővé teszi a konfigurációs adatok gyors és megbízható elérését, valamint a Kubernetes
		klaszter állapotának nyomon követését.
		<br /><br />
		<b>Mi is az ectd-t választottuk</b> a konfigurációs adatok tárolására, mert nagyon gyors és a
		leghatékonyabb módon tud értesítést küldeni a benne tárolt adatok változáról:
		<b>nem csak értesít, de a változott adatokat el is küldi</b>, így egy művelet alatt férünk hozzá
		a legfrissebb adatokhoz. Ez különösen fontos, ha több példányban fut a FlagFlow alkalmazás, mert
		így minden példány azonnal értesül a változásokról, és nem kell külön, rendszeres időközönként
		lekérdeznie/frissítenie az adatokat.
	</DocsPageSection>

	<DocsPageSection id="why-not-xy" title="Why not XY?">
		Felmerülhet a kérdés, hogy miért nem használunk más megoldásokat, mint például <b>Redis</b> vagy
		<b>MongoDB</b>, esetleg <b>PostgreSQL</b>. Ezek is jó megoldások, de az etcd előnye, hogy
		kifejezetten kisméretű, konfigurációs adatok tárolására és kezelésére lett kifejlesztve. Az etcd
		gyors, megbízható és könnyen skálázható, így tökéletes választás a FlagFlow számára. Ezen kívül
		az etcd támogatja a <b>watch</b> funkciót, amely lehetővé teszi a konfigurációs adatok valós
		idejű frissítését és értesítést küld a változásokról, így az alkalmazás mindig a legfrissebb
		adatokkal dolgozik. Ez különösen fontos, ha több példányban fut a FlagFlow alkalmazás.
		<br /><br />
		Figyelembe kell venni azt is, hogy az adatbáziskezelők túl nagyok, túl sok funkcióval bírnak. Nincs
		szükségünk relációk kezelésére, indexek létrehozására, tranzakciók kezelésére, és így tovább. Mindezek
		mellett az általában menedzselt szolgáltatásként elérhető háttérrendszerek kiemelten drágák, hozzáférés
		alapján kerülnek számlázásra.
	</DocsPageSection>

	<DocsPageSection id="install" title="Install">
		Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...
	</DocsPageSection>

	<DocsPageSection id="configure-to-use" title="Configure to use">
		Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...
	</DocsPageSection>
</DocsPage>
