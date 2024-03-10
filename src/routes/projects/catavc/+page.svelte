<script lang="ts">
	import LoadingIndicator from '../../../ui/LoadingIndicator.svelte';
	import UnderlinedLink from '../../../ui/UnderlinedLink.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { Slider } from '$lib/components/ui/slider';
	import { Checkbox } from '$lib/components/ui/checkbox';

	import { loadFfmpeg, setup, hls } from '$lib/videoHelper';
	import { fly } from 'svelte/transition';
	import type { CatHouse, CatHouseInfo } from './types';
	import { onMount } from 'svelte';
	import { preloadImage } from '$lib';

	let catHouses: CatHouse[];
	let currentHouseId: string | undefined = undefined;

	let videoQuality: number = 25;
	let enableAudio: boolean = true;
	let cameraPosition: number = 0;

	let localTime: string;
	let hlsLoaded: boolean = false;
	let statusImage: HTMLImageElement;
	let videoContainer: HTMLVideoElement;

	const getCatHouses = async () =>
		(catHouses = (await (
			await fetch('https://api.meow.camera/catHouses/top')
		).json()) as CatHouse[]);

	const getCatHouseInfo = async (id: string) =>
		(await (await fetch(`https://api.meow.camera/catHouse/${id}`)).json()) as CatHouseInfo;

	const onVideoQualityChange = (quality: number[]) => {
		videoQuality = quality[0];
		//@ts-ignore
		hls.transcoder.quality = quality[0];
	};
	const onAudioCheckedChange = (checked: boolean | 'indeterminate') => {
		if (checked == 'indeterminate') return;

		enableAudio = checked;
	};
	const setCameraPosition = (position: number) => {
		if (cameraPosition == position) return;

		cameraPosition = position;
		if (currentHouseId != undefined) {
			updatePlayback();
		}
	};
	const setCurrentCatHouse = (id: string) => {
		if (currentHouseId === id) return;

		currentHouseId = id;
		updatePlayback();
	};
	const updatePlayback = () => {
		window.history.replaceState(
			null,
			'',
			`/projects/catavc?id=${currentHouseId}&cameraPosition=${cameraPosition}&audioEnabled=${enableAudio}`
		);

		statusImage.style.opacity = '1';
		//@ts-ignore
		hls.loadSource(
			`https://streetcatpull.hellobike.com/live/${currentHouseId}_${cameraPosition}.m3u8`
		);
	};

	const prepare = (node: HTMLDivElement) => {
		if (window.localStorage.getItem('catavcAlertsShown') == null) {
			const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
			if (!isFirefox) {
				alert(
					"it seems like you're using a chromium-based browser. it probably supports HEVC playback, so you can use https://meow.camera instead of catavc, which is more stable and less laggy.\ni won't stop you though. if you believe this is a mistake or you want to continue anyway, please click OK.\nthis alert won't appear again."
				);
			}
			alert(
				'PLEASE READ:\ncatavc is a hobbyist project and is not guaranteed to run smoothly or well in general.\nall of the video conversion happens client-side, so PLEASE MONITOR YOUR CPU USAGE.\nffmpeg.wasm has also been shown to leak memory, so PLEASE USE THIS WITH CAUTION.\nthis alert will not appear again.'
			);
			window.localStorage.setItem('catavcAlertsShown', 'true');
		}

		const video = node.children[0] as HTMLVideoElement;
		videoContainer = video;
		const image = node.children[1] as HTMLImageElement;
		statusImage = image;

		//@ts-ignore
		hls.transcoder.enableAudio = enableAudio;
		setup(video);
		video.addEventListener('loadeddata', () => (image.style.opacity = '0'));

		if (currentHouseId !== undefined) {
			updatePlayback();
		}
	};

	const updateLocalTime = () => {
		localTime = new Date().toLocaleTimeString([], { timeZone: 'Asia/Shanghai' });
	};

	onMount(() => {
		const query = new URLSearchParams(window.location.search);
		if (query.has('id')) currentHouseId = query.get('id')!;
		if (query.has('cameraPosition')) cameraPosition = Number.parseInt(query.get('cameraPosition')!);
		if (query.has('audioEnabled')) enableAudio = query.get('audioEnabled')! == 'true';

		setInterval(() => updateLocalTime(), 1000);
	});

	const load = async () => {
		await loadFfmpeg();
		await preloadImage('/catavc/select.png');
		await preloadImage('/catavc/switching.png');
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
			<h1 class="text-center text-2xl">loading transhls & ffmpeg.wasm (this may take a while)</h1>
		</div>
	{:then}
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
				<div class="flex w-full flex-col lg:w-[70vw]">
					<div class="relative aspect-video h-full w-full" use:prepare>
						<!-- svelte-ignore a11y-media-has-caption -->
						<video class="absolute left-0 top-0 aspect-video w-full rounded-2xl" controls autoplay
						></video>
						<!-- svelte-ignore a11y-missing-attribute -->
						<img
							src={currentHouseId === undefined ? '/catavc/select.png' : '/catavc/switching.png'}
							class="pointer-events-none absolute left-0 top-0 aspect-video w-full rounded-2xl transition-all duration-300"
						/>
					</div>
				</div>
				<div class="mt-2 flex w-full flex-col lg:mt-0 lg:w-[25vw]">
					<div class="ml-2 flex-col gap-2 rounded-3xl bg-black/15 p-4">
						<h1 class="text-3xl font-light">information</h1>
						<p class="font-light"><i>local time: {localTime}</i></p>
						<div class="mt-2 flex flex-row gap-1">
							<Dialog.Root>
								<Dialog.Trigger
									><Button class="rounded-2xl text-lg">what is this?</Button></Dialog.Trigger
								>
								<Dialog.Content class="h-max w-max">
									<Dialog.Header>
										<Dialog.Title>what is catavc?</Dialog.Title>
										<Dialog.Description>
											catavc is a website that restreams cats from <a
												href="https://hellostreetcat.com"
												class="underline">the Chinese Hello Street Cat app</a
											>
											in AVC.<br />this project was made because the streamed video from the app is
											encoded via HEVC, which isn't supported in some browsers.<br />
											it uses a modified fork of hls.js called <b>transhls</b> (short for
											<i>transcoded</i> HLS) which transcodes the HEVC stream via
											<a href="https://ffmpegwasm.netlify.app" class="underline">ffmpeg.wasm</a>
											upon being loaded.
										</Dialog.Description>
									</Dialog.Header>
								</Dialog.Content>
							</Dialog.Root>
							<Dialog.Root>
								<Dialog.Trigger><Button class="rounded-2xl text-lg">credits</Button></Dialog.Trigger
								>
								<Dialog.Content class="h-max w-max">
									<Dialog.Header>
										<Dialog.Title>credits</Dialog.Title>
										<Dialog.Description>
											<b
												><a href="https://hellostreetcat.com" class="underline"
													>hellostreetcat.com</a
												></b
											>: the original cat feeder app!<br />
											<b><a href="https://meow.camera" class="underline">meow.camera</a></b>: API +
											main inspiration for the project<br />
											<b
												><a href="https://github.com/video-dev/hls.js" class="underline">hls.js</a
												></b
											>: a HLS library on which this project heavily relies<br />
											<b
												><a href="https://ffmpegwasm.netlify.app" class="underline">ffmpeg.wasm</a
												></b
											>: used for transcoding the HEVC stream
											<br /><br />
											my stuff:<br />
											<b
												><a href="https://github.com/nedoxff/nedoxff.github.io" class="underline"
													>code for this website</a
												></b
											><br />
											<b
												><a href="https://github.com/nedoxff/transhls.js" class="underline"
													>code for transhls.js</a
												></b
											><br />
											<b><a href="https://nedoxff.github.io" class="underline">nedo's website</a></b
											>
										</Dialog.Description>
									</Dialog.Header>
								</Dialog.Content>
							</Dialog.Root>
						</div>
						{#if currentHouseId !== undefined}
							{#await getCatHouseInfo(currentHouseId)}
								<div class="flex h-12 w-full items-center justify-center"><LoadingIndicator /></div>
							{:then info}
								<div class="mt-1">
									<h1 class="text-lg">id: {currentHouseId}</h1>
									<h1 class="text-lg">name: {info.name}</h1>
									<h1 class="text-lg">currently a cat present: {info.catPresent ? 'yes' : 'no'}</h1>
									<h1 class="text-lg">cats feed count (today): {info.todayFeedCount}</h1>
									<h1 class="text-lg">cats showed up (today): {info.todayShowCount}</h1>
									<h1 class="text-lg">
										device-measured temperature: {info.deviceTemperatureCelsius}°C
									</h1>
								</div>
							{/await}
						{:else}
							<h1 class="text-lg font-medium">
								select a cat house to view additional information!
							</h1>
						{/if}
					</div>
					<div class="ml-2 mt-2 flex-col gap-3 rounded-3xl bg-black/15 p-4">
						<h1 class="text-3xl font-light">options</h1>
						<div class="mt-2 flex flex-row items-center gap-3">
							<h1 class="text-lg">video quality</h1>
							<Slider
								class="w-[70%]"
								value={[videoQuality]}
								onValueChange={onVideoQualityChange}
								max={50}
								min={1}
							/>
						</div>
						<div class="flex flex-row items-center gap-3">
							<h1 class="text-lg">enable audio</h1>
							<Popover.Root closeOnOutsideClick={false} closeOnEscape={false}>
								<Popover.Trigger
									><Checkbox
										checked={enableAudio}
										onCheckedChange={onAudioCheckedChange}
									/></Popover.Trigger
								>
								<Popover.Content
									><div class="flex w-full flex-col">
										<p>
											toggling audio requires reloading the page. are you sure you want to refresh?
										</p>
										<div class="flex flex-row justify-end gap-3">
											<Button
												on:click={() => {
													updatePlayback();
													window.location.reload();
												}}>yes</Button
											>
											<Popover.Close>
												<Button
													on:click={() => {
														enableAudio = !enableAudio;
													}}>no</Button
												>
											</Popover.Close>
										</div>
									</div></Popover.Content
								>
							</Popover.Root>
						</div>
						<div class="flex flex-col justify-start">
							<h1 class="text-lg">camera position</h1>
							<div class="mt-1 flex flex-row gap-3">
								<Button
									class="rounded-2xl bg-black/20 text-lg text-white hover:text-dark {cameraPosition ==
									0
										? 'ring ring-white'
										: ''}"
									on:click={() => setCameraPosition(0)}>front</Button
								>
								<Button
									class="rounded-2xl bg-black/20 text-lg text-white hover:text-dark {cameraPosition ==
									1
										? 'ring ring-white'
										: ''}"
									on:click={() => setCameraPosition(1)}>top</Button
								>
								<Button
									class="rounded-2xl bg-black/20 text-lg text-white hover:text-dark {cameraPosition ==
									2
										? 'ring ring-white'
										: ''}"
									on:click={() => setCameraPosition(2)}>back</Button
								>
							</div>
						</div>
					</div>
					<div class="ml-2 mt-2 h-[50vh] flex-grow rounded-3xl bg-black/15 p-4 xl:h-[30vh]">
						<h1 class="text-3xl font-light">cat houses</h1>
						{#await getCatHouses()}
							<div class="flex h-12 w-full items-center justify-center"><LoadingIndicator /></div>
						{:then}
							<div class="mt-2 flex max-h-[90%] flex-col gap-2 overflow-y-scroll">
								{#each catHouses as house}
									<button
										class="flex flex-col rounded-xl bg-black/20 p-2 text-left {currentHouseId ==
										house.catHouseId
											? 'border-2 border-white'
											: ''}"
										on:click={() => setCurrentCatHouse(house.catHouseId)}
									>
										<h1 class="text-xl">
											{house.name}<br />{house.englishName !== null ? `(${house.englishName})` : ''}
										</h1>
										<p class="text-lg text-white/65">ID: {house.catHouseId}</p>
									</button>{/each}
							</div>
						{/await}
					</div>
				</div>
			</div>
		</div>
	{/await}
{/if}
