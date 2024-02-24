<script lang="ts">
	import { fly } from 'svelte/transition';
	import HomeButton from '../../ui/HomeButton.svelte';
	import WavyLine from '../../ui/WavyLine.svelte';
	import { MAIN_ANIMATION_DURATION, customRedirect, show } from '$lib';
	import { onMount } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import ThemeSwitcher from '../../ui/ThemeSwitcher.svelte';

	let socialBadgeContainer: HTMLDivElement;

	onMount(() => {
		show.set(true);
		window
			.matchMedia('(max-width: 768px)')
			.addEventListener('change', (e) => setExpanded(e.matches));
		setTimeout(() => setExpanded(window.matchMedia('(max-width: 768px)').matches), 500);
	});

	const setExpanded = (expand: boolean) => {
		const links = Array.from(socialBadgeContainer.children).map((v) => v as HTMLLinkElement);
		for (const link of links) link.style.maxWidth = expand ? '100%' : '';
	};
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
				class="mt-5 flex flex-col flex-wrap md:flex-row"
				bind:this={socialBadgeContainer}
				transition:fly={{
					y: 15,
					duration: MAIN_ANIMATION_DURATION,
					easing: quadInOut,
					delay: 500
				}}
			>
				<a
					href={null}
					class="inline-flex h-20 w-auto max-w-20 items-center overflow-hidden rounded-full bg-[#5865F2] transition-all duration-700 ease-in-out-quad hover:max-w-full"
				>
					<span class="ml-4 flex h-16 min-w-12 max-w-12 items-center"
						><img class="" src="/social/discord.svg" alt="discord icon" /></span
					>
					<span class="ml-4 mr-4 text-4xl font-bold text-light">@nedoxff</span>
				</a>
				<a
					href="https://github.com/nedoxff"
					class="inline-flex h-20 w-auto max-w-20 items-center overflow-hidden rounded-full bg-[#171516] transition-[max-width] duration-700 ease-in-out-quad hover:max-w-full dark:bg-[#E8EAE9]"
				>
					<span class="ml-4 flex h-16 min-w-12 max-w-12 items-center dark:invert"
						><img class="invert" src="/social/github.svg" alt="github icon" /></span
					>
					<span class="ml-4 mr-4 text-4xl font-bold text-light dark:text-dark">nedoxff</span>
				</a>
			</div>
			<p
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 750 }}
				class="mt-5 text-xl font-light text-dark dark:text-light md:text-3xl"
			>
				i'm not usually slow to respond, but please don't expect me to answer immediately.
			</p>
		</div>
	</div>
{/if}
