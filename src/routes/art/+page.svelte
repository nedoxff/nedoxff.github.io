<script lang="ts">
	import { fly } from 'svelte/transition';
	import HomeButton from '../../ui/HomeButton.svelte';
	import WavyLine from '../../ui/WavyLine.svelte';
	import { MAIN_ANIMATION_DURATION, customRedirect, show } from '$lib';
	import { onMount } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import ThemeSwitcher from '../../ui/ThemeSwitcher.svelte';
	import ExpandableCategory from '../../ui/ExpandableCategory.svelte';
	import UnderlinedLink from '../../ui/UnderlinedLink.svelte';

	onMount(() => {
		show.set(true);
	});
</script>

{#if $show}
	<div class="flex h-[100vh] flex-col md:flex-row">
		<div class="pr-5"><WavyLine /></div>
		<div class="mt-10 flex min-h-max flex-col items-stretch p-5 md:ml-10 md:mt-5">
			<div
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut }}
				class="flex flex-row align-baseline"
			>
				<HomeButton font="bitter" />
				<ThemeSwitcher />
			</div>
			<p
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 250 }}
				class="mt-5 text-2xl font-light text-dark dark:text-light md:text-4xl"
			>
				i started drawing at a relatively late age, so my skills are very basic and i don't do any
				professional creative work.<br />
				nevertheless, you can find some examples of my work below:
			</p>
			<div
				class="mt-5 flex flex-col items-baseline gap-2 xl:flex-row"
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 500 }}
			>
				<ExpandableCategory name="digital art">
					<h1 class="text-2xl text-dark dark:text-light">
						most of the work i do is done digitally. i use <UnderlinedLink
							text="Clip Studio Paint"
							link="https://www.clipstudio.net/en/"
						/> on PC and <UnderlinedLink
							text="ibisPaint X"
							link="https://ibispaint.com/?lang=en-US"
						/> on mobile.
					</h1>
					<button
						class="mt-1 flex cursor-pointer items-center justify-center rounded-full border-2 border-dark transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-light dark:hover:bg-light"
					>
						<h2
							class="px-5 py-3 text-2xl text-dark hover:text-light dark:text-light dark:hover:text-dark"
						>
							view work
						</h2>
					</button>
				</ExpandableCategory>
				<ExpandableCategory name="traditional art">
					<h1 class="text-2xl text-dark dark:text-light">
						i don't do much of traditional art since i generally prefer to draw on an electronic
						device. still, such devices are sometimes inaccessible. i mainly draw with a mechanical
						pencil and that's it.
					</h1>
					<button
						class="mt-1 flex cursor-pointer items-center justify-center rounded-full border-2 border-dark transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-light dark:hover:bg-light"
					>
						<h2
							class="px-5 py-3 text-2xl text-dark hover:text-light dark:text-light dark:hover:text-dark"
						>
							view work
						</h2>
					</button>
				</ExpandableCategory>
				<ExpandableCategory name="visual novels">
					<h1 class="text-2xl text-dark dark:text-light">
						this is a genre i've discovered recently and i enjoyed it quite a bunch. i've read about
						4 VNs and wrote 1 (it's not public and is mostly a local joke).
					</h1>
				</ExpandableCategory>
			</div>
		</div>
	</div>
{/if}
