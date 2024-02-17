<script lang="ts">
	import { fly } from 'svelte/transition';
	import WavyLine from '../../ui/WavyLine.svelte';
	import { MAIN_ANIMATION_DURATION, show } from '$lib';
	import { onMount } from 'svelte';
	import { quadInOut } from 'svelte/easing';

	onMount(() => {
		show.set(true);
	});
</script>

{#if $show}
	<div class="flex flex-col md:flex-row">
		<div class="pr-5"><WavyLine /></div>
		<div class="flex flex-col p-5">
			<h1
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut }}
				class="text-7xl pt-5 font-medium h-min"
			>
				nedoxff
			</h1>
            <p transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 250 }} class="text-5xl font-light mt-5">will write this later</p>
		</div>
	</div>
{/if}
