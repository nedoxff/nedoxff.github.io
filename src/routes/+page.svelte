<script lang="ts">
	import { fly } from 'svelte/transition';
	import WavyLine from '../ui/WavyLine.svelte';
	import { MAIN_ANIMATION_DURATION, show } from '$lib';
	import { onMount } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import CategoryButton from '../ui/CategoryButton.svelte';
	import HomeButton from '../ui/HomeButton.svelte';
	import ThemeSwitcher from '../ui/ThemeSwitcher.svelte';
	import CustomLink from '../ui/UnderlinedLink.svelte';

	onMount(() => {
		show.set(true);
	});
</script>

{#if $show}
	<div class="flex flex-col md:flex-row">
		<div class="md:pr-5"><WavyLine /></div>
		<div class="mt-10 flex min-h-max flex-col items-stretch p-5 md:ml-10 md:mt-5">
			<div
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut }}
				class="flex flex-row align-baseline"
			>
				<HomeButton redirect={false} />
				<ThemeSwitcher />
			</div>
			<div
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 250 }}
				class="mt-1 flex flex-row flex-wrap"
			>
				<CategoryButton text="about" destination="/about"></CategoryButton>
				<CategoryButton text="art" destination="/art"></CategoryButton>
				<CategoryButton text="code" destination="/code"></CategoryButton>
				<CategoryButton text="contact" destination="/contact"></CategoryButton>
			</div>
			<p
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 500 }}
				class="mt-10 text-2xl font-light text-dark dark:text-light md:text-4xl"
			>
				hello! i'm nedo (or nedoxff if you like unpronounceable nicknames). i like to create new
				things, whether it's code-related or something artistic.<br />you can view more information
				about me and my stuff by clicking on the categories at the top of the page.<br /><br />
				the code for this website is available on <CustomLink
					link="https://github.com/nedoxff/nedoxff.github.io"
					text="github"
				/> and is made with <CustomLink link="https://kit.svelte.dev" text="sveltekit" /> and <CustomLink
					link="https://tailwindcss.com"
					text="tailwindcss"
				/>.
			</p>
		</div>
	</div>
{/if}
