<script lang="ts">
	import clsx from 'clsx';
	import { Button, Card } from 'flowbite-svelte';

	interface Properties {
		title?: string;
		code: string;
		dark?: boolean;
	}

	const { title, code, dark = true }: Properties = $props();

	const copyToClipboard = () => navigator.clipboard.writeText(code);
</script>

<Card class={clsx('my-6 w-full p-4', dark ? 'bg-gray-900' : 'bg-gray-100')} size="xl">
	{#if title}
		<div class="mb-3 flex items-center justify-between border-b border-gray-700 pb-2">
			<span class={clsx('text-sm font-medium', dark ? 'text-gray-300' : 'text-gray-600')}
				>{title}</span
			>
			<Button
				class="rounded p-1 text-gray-400 transition-colors hover:text-white"
				onclick={copyToClipboard}
				title="Copy code"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
					<path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
					<path
						d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
					/>
				</svg>
			</Button>
		</div>
	{/if}

	<pre
		class={clsx(
			'overflow-x-auto font-mono text-sm leading-relaxed whitespace-pre-wrap',
			dark ? 'text-gray-100' : 'text-gray-900'
		)}>{code.trim()}</pre>
</Card>
