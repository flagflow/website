<script lang="ts">
	import '../app.css';

	import type { LayoutProps as LayoutProperties } from './$types';

	let { children }: LayoutProperties = $props();
</script>

{@render children()}
