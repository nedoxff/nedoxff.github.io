<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { onMount } from 'svelte';

	export let name: string;
	export let autoOpenDelay: number = 0;
	let expandIcon: HTMLImageElement;
	let open: boolean = false;

	onMount(() => {
		setTimeout(() => (open = autoOpenDelay != 0), autoOpenDelay);
	});

	const toggleExpanded = () => {
		const expanded = expandIcon.src.endsWith('expand_less.svg');
		expandIcon.src = expanded ? 'icons/expand_more.svg' : 'icons/expand_less.svg';
	};
</script>

<Collapsible.Root
	bind:open
	class="w-full flex-1 rounded-3xl border-2 border-dark p-0.5 dark:border-light xl:basis-3/12"
>
	<Collapsible.Trigger
		class="flex w-full flex-row items-center justify-between"
		on:click={() => toggleExpanded()}
	>
		<h1 class="px-4 text-4xl text-dark dark:text-light">{name}</h1>
		<img
			bind:this={expandIcon}
			class="w-14 dark:invert"
			src="icons/expand_more.svg"
			alt="expand icon"
		/>
	</Collapsible.Trigger>
	<Collapsible.Content class="px-4 pb-2">
		<slot />
	</Collapsible.Content>
</Collapsible.Root>
