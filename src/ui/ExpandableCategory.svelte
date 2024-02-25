<script lang="ts">
	export let name: string;
	let expandIcon: HTMLImageElement;
	let container: HTMLDivElement;

	const toggleExpanded = () => {
		const expanded = expandIcon.src.endsWith('expand_less.svg');
		expandIcon.src = expanded ? 'icons/expand_more.svg' : 'icons/expand_less.svg';
		container.style.maxHeight = expanded ? '' : '100%';
	};
</script>

<div
	class="max-h-16 min-h-16 w-full overflow-hidden rounded-3xl border-2 border-dark transition-all duration-300 ease-in-out-quad dark:border-white xl:max-w-[50%]"
	bind:this={container}
>
	<a href={'#'} on:click={toggleExpanded}>
		<div class="flex w-full flex-row items-center justify-between">
			<h1 class="px-4 text-4xl text-dark dark:text-light">{name}</h1>
			<img
				bind:this={expandIcon}
				class="w-14 dark:invert"
				src="icons/expand_more.svg"
				alt="expand icon"
			/>
		</div>
	</a>
	<div class="px-4 pb-2">
		<slot />
	</div>
</div>
