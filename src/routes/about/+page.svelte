<script lang="ts">
	import { fly } from 'svelte/transition';
	import HomeButton from '../../ui/HomeButton.svelte';
	import WavyLine from '../../ui/WavyLine.svelte';
	import { MAIN_ANIMATION_DURATION, customRedirect, show } from '$lib';
	import { onMount } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import ThemeSwitcher from '../../ui/ThemeSwitcher.svelte';
	import UnderlinedLink from '../../ui/UnderlinedLink.svelte';

	onMount(() => {
		show.set(true);
	});

	let shiftedTime: string = '';
	let currentTime: string = '';
	const shiftedFormatter = new Intl.DateTimeFormat([], {
		timeZone: 'Europe/Moscow',
		hour: 'numeric',
		minute: 'numeric',
		hourCycle: 'h23'
	});
	const currentFormatter = new Intl.DateTimeFormat([], {
		hour: 'numeric',
		minute: 'numeric',
		hourCycle: 'h23'
	});

	const updateTime = () => {
		shiftedTime = shiftedFormatter.format(new Date());
		currentTime = currentFormatter.format(new Date());
	};

	setInterval(() => updateTime(), 1000 * 60);
	updateTime();
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
				there's not much to say! i live in eastern europe (utc+3), speak 2 languages and am
				finishing high school this year.<br />
				if you want, you can <UnderlinedLink text="dm me" link="/contact" />. i don't bite
				<span class="text-xl"><i>(usually)</i></span>!<br />
				it's currently <span class="text-5xl font-medium">{shiftedTime}</span> for me and
				<span class="text-5xl font-medium">{currentTime}</span> for you.
			</p>
		</div>
	</div>
{/if}
