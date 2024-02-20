<script lang="ts">
	import { fly } from 'svelte/transition';
	import HomeButton from '../../ui/HomeButton.svelte';
	import WavyLine from '../../ui/WavyLine.svelte';
	import { MAIN_ANIMATION_DURATION, customRedirect, show } from '$lib';
	import { onMount } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import ThemeSwitcher from '../../ui/ThemeSwitcher.svelte';
	import SocialMediaBadge from '../../ui/SocialMediaBadge.svelte';

	onMount(() => {
		show.set(true);
	});
</script>

{#if $show}
	<div class="flex flex-col md:flex-row">
		<div class="pr-5"><WavyLine /></div>
		<div class="mt-10 flex min-h-max flex-col items-stretch p-5 md:ml-10 md:mt-5">
			<div
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut }}
				class="flex flex-row align-baseline"
			>
				<HomeButton />
				<ThemeSwitcher />
			</div>
			<p
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 250 }}
				class="mt-5 text-2xl font-light text-dark dark:text-light md:text-4xl"
			>
				i exist on the following social medias:
			</p>
			<div
				class="mt-5 flex flex-row flex-wrap"
				transition:fly={{
					y: 15,
					duration: MAIN_ANIMATION_DURATION,
					easing: quadInOut,
					delay: 500
				}}
			>
				<SocialMediaBadge baseColor="#5865F2" icon="discord" text="@nedoxff" />
				<SocialMediaBadge
					baseColor="#171516"
					icon="github"
					text="nedoxff"
					link="https://github.com/nedoxff"
					invert={true}
				></SocialMediaBadge>
			</div>
		</div>
	</div>
{/if}
