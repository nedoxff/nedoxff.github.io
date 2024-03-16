<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { setup, hls, hevcMode } from '../videoHelper';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { cameraPosition, currentHouseId, enableAudio, updateURL } from '../types';

	let statusImage: HTMLImageElement;
	let videoContainer: HTMLVideoElement;

	let loaded: boolean = false;
	let buffering: boolean = true;

	const prepare = (node: HTMLDivElement) => {
		const video = node.children[0] as HTMLVideoElement;
		videoContainer = video;
		const image = node.children[1] as HTMLImageElement;
		statusImage = image;

		if (!hevcMode) {
			//@ts-ignore
			hls.transcoder.enableAudio = get(enableAudio);
			setup(video);
		}

		video.addEventListener('loadeddata', () => {
			image.style.opacity = '0';
			loaded = true;
		});

		video.addEventListener('waiting', () => {
			buffering = true;
		});
		video.addEventListener('playing', () => {
			buffering = false;
		});

		if (currentHouseId !== undefined) {
			updatePlayback();
		}
	};

	export const updatePlayback = () => {
		if (get(currentHouseId) === undefined) return;

		const link = `https://streetcatpull.hellobike.com/live/${get(currentHouseId)}_${get(cameraPosition)}.m3u8`;

		if (!hevcMode) {
			loaded = false;
			statusImage.style.opacity = '1';
			hls.loadSource(link);
		} else {
			videoContainer.src = link;
		}
	};

	let screenshotCanvas: HTMLCanvasElement;
	let screenshowCanvasContext: CanvasRenderingContext2D;

	const takeScreenshot = () => {
		screenshowCanvasContext.drawImage(
			videoContainer,
			0,
			0,
			screenshotCanvas.width,
			screenshotCanvas.height
		);
		const link = document.createElement('a');
		link.download = 'cat.png';
		link.href = screenshotCanvas.toDataURL('image/png');
		link.click();
	};

	onMount(() => {
		screenshotCanvas = document.createElement('canvas');
		screenshotCanvas.width = 1280;
		screenshotCanvas.height = 720;
		screenshowCanvasContext = screenshotCanvas.getContext('2d')!;

		cameraPosition.subscribe((_) => updatePlayback());
		cameraPosition.subscribe((_) => updateURL());
		currentHouseId.subscribe((_) => updatePlayback());
	});
</script>

<div class="flex aspect-video flex-col">
	<div class="relative aspect-video w-full" use:prepare>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			class="absolute left-0 top-0 aspect-video w-full rounded-2xl"
			crossorigin="anonymous"
			playsinline
			controls
		></video>
		<!-- svelte-ignore a11y-missing-attribute -->
		<img
			src={$currentHouseId === undefined ? '/catavc/select.png' : '/catavc/switching.png'}
			class="pointer-events-none absolute left-0 top-0 aspect-video w-full rounded-2xl transition-all duration-300"
		/>
	</div>
	<div class="mt-1 flex flex-col justify-start">
		<div class="ml-2 mt-1 flex flex-row gap-2">
			<Button
				class="rounded-2xl bg-black/20 text-lg text-white hover:text-dark {$cameraPosition == 0
					? 'ring ring-white'
					: ''}"
				on:click={() => cameraPosition.set(0)}>front</Button
			>
			<Button
				class="rounded-2xl bg-black/20 text-lg text-white hover:text-dark {$cameraPosition == 1
					? 'ring ring-white'
					: ''}"
				on:click={() => cameraPosition.set(1)}>top</Button
			>
			<Button
				class="rounded-2xl bg-black/20 text-lg text-white hover:text-dark {$cameraPosition == 2
					? 'ring ring-white'
					: ''}"
				on:click={() => cameraPosition.set(2)}>back</Button
			>
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<Button
				class="group rounded-2xl bg-black/20 text-lg text-white transition-all hover:text-dark"
				disabled={!loaded || buffering}
				on:click={() => takeScreenshot()}
			>
				<img
					src="/icons/take_photo.svg"
					alt="take photo icon"
					class="transition-all group-hover:invert"
				/></Button
			>
		</div>
	</div>
</div>

<style>
	video::-webkit-media-controls {
		visibility: hidden;
	}

	video::-webkit-media-controls-enclosure {
		visibility: visible;
	}
</style>
