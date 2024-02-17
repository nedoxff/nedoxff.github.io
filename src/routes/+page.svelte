<script lang="ts">
	import { fly } from 'svelte/transition';
	import WavyLine from '../ui/WavyLine.svelte';
	import { MAIN_ANIMATION_DURATION, show } from '$lib';
	import { onMount } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import StylizedLink from '../ui/StylizedLink.svelte';

	onMount(() => {
		show.set(true);
	});
</script>

{#if $show}
	<div class="flex flex-col md:flex-row">
		<div class="md:pr-5"><WavyLine /></div>
		<div class="flex flex-col p-5">
			<h1
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut }}
				class="text-7xl font-medium h-min"
			>
				nedoxff
			</h1>
			<div
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 250 }}
				class="flex flex-row flex-wrap"
			>
				<StylizedLink text="about" destination="/about"></StylizedLink>
				<StylizedLink text="art" destination="/art"></StylizedLink>
				<StylizedLink text="code" destination="/code"></StylizedLink>
                <StylizedLink text="contact" destination="/contact"></StylizedLink>
			</div>
            <p transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 500 }} class="text-5xl font-light mt-5">hello! i decided to redesign the website a bit.</p>
		</div>
	</div>
{/if}
