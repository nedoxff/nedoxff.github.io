<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { currentHouseId, type CatHouseInfo } from '../types';
	import LoadingIndicator from '../../../../ui/LoadingIndicator.svelte';
	import { onMount } from 'svelte';

	let localTime: string;

	const updateLocalTime = () => {
		localTime = new Date().toLocaleTimeString([], { timeZone: 'Asia/Shanghai' });
	};

	const getCatHouseInfo = async (id: string) =>
		(await (await fetch(`https://api.meow.camera/catHouse/${id}`)).json()) as CatHouseInfo;

	onMount(() => {
		updateLocalTime();
		setInterval(() => updateLocalTime(), 1000);
	});
</script>

<div class="ml-2 flex-grow-0 flex-col gap-2 rounded-3xl bg-black/15 p-4">
	<h1 class="text-3xl font-light">information</h1>
	<p class="font-light"><i>local time: {localTime}</i></p>
	<div class="mt-2 flex flex-row gap-1">
		<Dialog.Root>
			<Dialog.Trigger><Button class="rounded-2xl text-lg">what is this?</Button></Dialog.Trigger>
			<Dialog.Content class="h-max w-max">
				<Dialog.Header>
					<Dialog.Title>what is catavc?</Dialog.Title>
					<Dialog.Description>
						catavc is a website that restreams cats from <a
							href="https://hellostreetcat.com"
							class="underline">the Chinese Hello Street Cat app</a
						>
						in AVC.<br />this project was made because the streamed video from the app is encoded
						via HEVC, which isn't supported in some browsers.<br />
						it uses a modified fork of hls.js called <b>transhls</b> (short for
						<i>transcoded</i> HLS) which transcodes the HEVC stream via
						<a href="https://ffmpegwasm.netlify.app" class="underline">ffmpeg.wasm</a>
						upon being loaded.
					</Dialog.Description>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
		<Dialog.Root>
			<Dialog.Trigger><Button class="rounded-2xl text-lg">credits</Button></Dialog.Trigger>
			<Dialog.Content class="h-max w-max">
				<Dialog.Header>
					<Dialog.Title>credits</Dialog.Title>
					<Dialog.Description>
						<b><a href="https://hellostreetcat.com" class="underline">hellostreetcat.com</a></b>:
						the original cat feeder app!<br />
						<b><a href="https://meow.camera" class="underline">meow.camera</a></b>: API + main
						inspiration for the project<br />
						<b><a href="https://github.com/video-dev/hls.js" class="underline">hls.js</a></b>: a HLS
						library on which this project heavily relies<br />
						<b><a href="https://ffmpegwasm.netlify.app" class="underline">ffmpeg.wasm</a></b>: used
						for transcoding the HEVC stream
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
						<b><a href="https://nedoxff.github.io" class="underline">nedo's website</a></b>
					</Dialog.Description>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
	</div>
	{#if $currentHouseId !== undefined}
		{#await getCatHouseInfo($currentHouseId)}
			<div class="flex h-12 w-full items-center justify-center"><LoadingIndicator /></div>
		{:then info}
			<div class="mt-1 [&>*]:text-lg">
				<h1>id: {$currentHouseId}</h1>
				<h1>name: {info.name}</h1>
				<h1>currently a cat present: {info.catPresent ? 'yes' : 'no'}</h1>
				<h1>cats feed count (today): {info.todayFeedCount}</h1>
				<h1>cats showed up (today): {info.todayShowCount}</h1>
				<h1>
					device-measured temperature: {info.deviceTemperatureCelsius}°C
				</h1>

				<h1>
					kibble: {info.stock.kibble == null ? 'no' : info.stock.kibble}, snacks: {info.stock
						.snack === null
						? 'no'
						: info.stock.snack}
				</h1>
			</div>
		{/await}
	{:else}
		<h1 class="text-lg font-medium">select a cat house to view additional information!</h1>
	{/if}
</div>
