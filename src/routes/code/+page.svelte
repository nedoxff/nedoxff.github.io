<script lang="ts">
	import { fly } from 'svelte/transition';
	import HomeButton from '../../ui/HomeButton.svelte';
	import WavyLine from '../../ui/WavyLine.svelte';
	import { MAIN_ANIMATION_DURATION, show } from '$lib';
	import { onMount } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import ThemeSwitcher from '../../ui/ThemeSwitcher.svelte';
	import UnderlinedLink from '../../ui/UnderlinedLink.svelte';
	import ViewableLink from '../../ui/ViewableLink.svelte';
	import ProjectCard from '../../ui/ProjectCard.svelte';

	onMount(() => {
		show.set(true);
	});
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
				class="mt-5 flex w-full flex-col gap-5"
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 500 }}
			>
				<div>
					<h1 class="text-5xl"><u>general</u></h1>
					<p class="mt-1 text-2xl">
						my main language is C#. i'm most comfortable with it, and it's my first "real" language
						i learned after <UnderlinedLink text="Scratch" link="https://scratch.mit.edu" />.<br />
						i'm very chaotic when it comes to project ideas, which is why my github might look like a
						mess to some.
					</p>
				</div>

				<div>
					<h1 class="text-5xl"><u>backend</u></h1>
					<p class="mt-1 text-2xl">
						i've developed backends professionally in ASP.NET, and personally in Node.js and
						sometimes Python.
					</p>
				</div>

				<div>
					<h1 class="text-5xl"><u>frontend</u></h1>
					<p class="mt-1 text-2xl">
						i use React professionally (please help me) and Svelte for personal projects. before
						Svelte i used pure JS (often with jQuery), <ViewableLink
							text="which is how the previous version of this website was made."
							src="general/old-website.png"
						/>
					</p>
				</div>

				<div>
					<h1 class="text-5xl"><u>mobile apps</u></h1>
					<p class="mt-1 text-2xl">
						i made personal projects with Xamarin and a professional chat app with Flutter. Flutter
						is better.
					</p>
				</div>

				<div>
					<h1 class="text-5xl"><u>desktop apps</u></h1>
					<p class="mt-1 text-2xl">
						my first desktop projects were made with WinForms and sometimes WPF. nowadays i use
						either AvaloniaUI/MAUI for C# and Flutter when i'm tired of C#.
					</p>
				</div>

				<div>
					<h1 class="text-5xl"><u>ui design</u></h1>
					<p class="mt-1 text-2xl">
						i started experimenting with UI design only recently, and i somewhat like the minimalist
						look that some websites follow. this website and all of the GUI apps are my attempts at
						dipping my toes into UI design.
					</p>
					<div class="mt-3 flex flex-row flex-wrap items-start gap-3">
						<ProjectCard repo="nedoxff.github.io" />
					</div>
				</div>

				<div>
					<h1 class="text-5xl"><u>game development</u></h1>
					<p class="mt-1 text-2xl">
						i've had multiple attempts at making games, but all of them have fallen short because i
						couldn't form a proper team to work on a game. nevertheless, i've contributed to at
						least 2 games while being in the <UnderlinedLink
							text="Titled Jam Team"
							link="https://github.com/titled-jam-team"
						/>.
					</p>
					<div class="mt-3 flex flex-row flex-wrap items-start gap-3">
						<ProjectCard repo="newyeartest" />
						<ProjectCard repo="british_quiz" />
						<ProjectCard repo="UnknownResponse" />
						<ProjectCard repo="MotionPP" />
					</div>
				</div>

				<div>
					<h1 class="text-5xl"><u>bots</u></h1>
					<p class="mt-1 text-2xl">
						i made 10+ discord bots for widely different purposes (games, moderation, general utils)
						and several telegram bots purely for learning purposes. i'm pretty good at making them!
					</p>
					<div class="mt-3 flex flex-row flex-wrap items-start gap-3">
						<ProjectCard repo="Nedordle" />
						<ProjectCard repo="Diswords" />
						<ProjectCard repo="RandomGameBot" />
					</div>
				</div>

				<div>
					<h1 class="text-5xl"><u>language development</u></h1>
					<p class="mt-1 text-2xl">
						i like creating syntaxes for languages and often make compilers for them.<br />
						one of the languages, ScratchScript, i've rewritten 5 times.
					</p>
					<div class="mt-3 flex flex-row flex-wrap items-start gap-3">
						<ProjectCard repo="WAL" />
						<ProjectCard repo="ScratchScript" />
					</div>
				</div>

				<div>
					<h1 class="text-5xl"><u>portfolio</u></h1>
					<p class="mt-1 text-2xl">not yet!</p>
				</div>
			</div>
		</div>
	</div>
{/if}
