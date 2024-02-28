<script lang="ts">
	import { fly } from 'svelte/transition';
	import HomeButton from '../../ui/HomeButton.svelte';
	import WavyLine from '../../ui/WavyLine.svelte';
	import { MAIN_ANIMATION_DURATION, customRedirect, enableMasonry, show } from '$lib';
	import { onMount } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import ThemeSwitcher from '../../ui/ThemeSwitcher.svelte';
	import ExpandableCategory from '../../ui/ExpandableCategory.svelte';
	import UnderlinedLink from '../../ui/UnderlinedLink.svelte';
	import { Masonry } from '@fristys/masonry';
	import ViewableLink from '../../ui/ViewableLink.svelte';

	onMount(() => {
		show.set(true);
	});

	const categoryMasonryProvider = (node: HTMLElement) => {
		return new Masonry(node, {
			gutter: 0.5,
			gutterUnit: 'rem',
			columnBreakpoints: { 1536: 3, 1024: 2, 768: 1 },
			columns: 3,
			useContainerWidth: true,
			trackItemSizeChanges: true
		});
	};
</script>

{#if $show}
	<div class="flex h-[100vh] flex-col md:flex-row">
		<div class="pr-5"><WavyLine /></div>
		<div class="mt-10 flex min-h-max w-full flex-col items-stretch p-5 md:ml-10 md:mt-5">
			<div
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut }}
				class="flex flex-row align-baseline"
			>
				<HomeButton font="mono" />
				<ThemeSwitcher />
			</div>
			<p
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 250 }}
				class="font-inter mt-5 text-2xl font-light text-dark dark:text-light md:text-4xl"
			>
				programming is the field i'm most proficient in. i've been coding since 3rd grade,
				basically.<br />
				i mainly make backends and design GUIs, but you can find more information about my projects below:
			</p>
			<div
				class="mt-5"
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 500 }}
				use:enableMasonry={categoryMasonryProvider}
			>
				<ExpandableCategory name="general" alwaysOpened={true}
					><h1 class="text-2xl text-dark dark:text-light">
						my main language is C#. i'm most comfortable with it, and it's my first "real" language
						i learned after <UnderlinedLink text="Scratch" link="https://scratch.mit.edu" />.<br />
						i'm very chaotic when it comes to project ideas, which is why my github might look like a
						mess to some.
					</h1></ExpandableCategory
				>
				<ExpandableCategory name="backend" alwaysOpened={true}
					><h1 class="text-2xl text-dark dark:text-light">
						i've developed backends professionally in ASP.NET, and personally in Node.js and
						sometimes Python.
					</h1></ExpandableCategory
				>
				<ExpandableCategory name="frontend" alwaysOpened={true}
					><h1 class="text-2xl text-dark dark:text-light">
						i use React professionally (please help me) and Svelte for personal projects. before
						Svelte i used pure JS (often with jQuery), <ViewableLink
							text="which is how the previous version of this website was made."
							src="general/old-website.png"
						/>
					</h1></ExpandableCategory
				>
				<ExpandableCategory name="mobile apps" alwaysOpened={true}
					><h1 class="text-2xl text-dark dark:text-light">
						i made personal projects with Xamarin and a professional chat app with Flutter. Flutter
						is better.
					</h1></ExpandableCategory
				>
				<ExpandableCategory name="desktop apps" alwaysOpened={true}
					>my first desktop projects were made with WinForms and rarely WPF. nowadays i use either
					AvaloniaUI/MAUI for C# and Flutter for other stuff.</ExpandableCategory
				>
				<ExpandableCategory name="ui design" alwaysOpened={true}
					><h1 class="text-2xl text-dark dark:text-light">
						i started experimenting with ui design only recently, and i somewhat like the minimalist
						look that some websites follow. this website and all GUI apps are my attempts at dipping
						my toe into UI design.
					</h1></ExpandableCategory
				>
				<ExpandableCategory name="portfolio" alwaysOpened={true}
					><h1 class="text-2xl text-dark dark:text-light">not yet!</h1></ExpandableCategory
				>
			</div>
		</div>
	</div>
{/if}
