<script lang="ts">
	import Dialogs from './components/Dialogs.svelte';
	import LoadingIndicator from '../../../ui/LoadingIndicator.svelte';
	import UnderlinedLink from '../../../ui/UnderlinedLink.svelte';

	import { fly } from 'svelte/transition';
	import { cameraPosition, enableAudio, currentHouseId, updateURL } from './types';
	import { onMount } from 'svelte';
	import { preloadImage } from '$lib';
	import InformationBox from './components/InformationBox.svelte';
	import { loadFfmpeg } from '$lib/videoHelper';
	import VideoBox from './components/VideoBox.svelte';
	import ErrorBox from './components/ErrorBox.svelte';
	import OptionsBox from './components/OptionsBox.svelte';
	import CatHousesBox from './components/CatHousesBox.svelte';

	let hlsLoaded: boolean = false;

	onMount(() => {
		const query = new URLSearchParams(window.location.search);
		if (query.has('id')) currentHouseId.set(query.get('id')!);
		if (query.has('cameraPosition'))
			cameraPosition.set(Number.parseInt(query.get('cameraPosition')!));
		if (query.has('audioEnabled')) enableAudio.set(query.get('audioEnabled')! == 'true');

		currentHouseId.subscribe((_) => updateURL());
	});

	const load = async () => {
		await loadFfmpeg();
		await preloadImage('/catavc/select.png');
		await preloadImage('/catavc/switching.png');
		await preloadImage('/icons/take_photo.svg');
		await preloadImage('/icons/warning.svg');
		await preloadImage('/icons/star.svg');
		await preloadImage('/icons/star_outline.svg');

		if (typeof SharedArrayBuffer === 'undefined' || !window.crossOriginIsolated) {
			throw new Error('SharedArrayBuffer is undefined. CORS enforcement failed.');
		}
	};
</script>

<svelte:head>
	<script src="/coi-serviceworker.min.js">
	</script>
	<script
		on:load={() => {
			hlsLoaded = true;
		}}
		src="/js/hls.light.min.js"
	></script></svelte:head
>

{#if hlsLoaded}
	{#await load()}
		<div
			class="absolute left-0 top-0 flex h-[100vh] w-[100vw] flex-col items-center justify-center p-4"
			transition:fly={{ y: 15 }}
		>
			<LoadingIndicator />
			<h1 class="text-center text-2xl">loading resources (this may take a few minutes)</h1>
		</div>
	{:then}
		<Dialogs />

		<div
			class="absolute left-0 top-0 flex h-[100vh] w-[98vw] flex-col p-4"
			transition:fly={{ y: 15, delay: 500 }}
		>
			<div>
				<h1 class="text-4xl font-bold">catavc</h1>
				<p class="text-2xl">
					an AVC alternative to <UnderlinedLink link="https://meow.camera" text="meow.camera" />
				</p>
			</div>
			<div class="mt-2 flex w-full flex-col lg:flex-row">
				<div class="lg:w-[75vw]"><VideoBox /></div>
				<div class="mt-2 flex h-[90vh] w-full flex-col lg:mt-0 lg:w-[25vw]">
					<InformationBox />
					<OptionsBox />
					<CatHousesBox />
				</div>
			</div>
		</div>
	{:catch}
		<div
			class="absolute left-0 top-0 flex h-[100vh] w-[100vw] flex-col items-center justify-center p-4"
			transition:fly={{ y: 15, delay: 500 }}
		>
			<ErrorBox />
		</div>
	{/await}
{/if}
