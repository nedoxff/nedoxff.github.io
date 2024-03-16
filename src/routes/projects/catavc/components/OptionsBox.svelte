<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { Slider } from '$lib/components/ui/slider';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { hevcMode, hls } from '../videoHelper';
	import { enableAudio, updateURL, videoQuality } from '../types';

	const onVideoQualityChange = (quality: number[]) => {
		videoQuality.set(quality[0]);
		hls.transcoder.quality = quality[0];
	};

	const onAudioCheckedChange = (checked: boolean | 'indeterminate') => {
		if (checked == 'indeterminate') return;
		enableAudio.set(checked);
	};
</script>

<div class="flex-0 ml-2 mt-2 flex-col gap-3 rounded-3xl bg-black/15 p-4">
	<h1 class="text-3xl font-light">options</h1>
	<div class="flex flex-row items-center gap-3">
		<h1 class="text-lg">video quality</h1>
		<Slider
			disabled={hevcMode}
			class="w-[70%]"
			value={[$videoQuality]}
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
					disabled={hevcMode}
					checked={$enableAudio}
					onCheckedChange={onAudioCheckedChange}
				/></Popover.Trigger
			>
			<Popover.Content
				><div class="flex w-full flex-col">
					<p>toggling audio requires reloading the page. are you sure you want to refresh?</p>
					<div class="flex flex-row justify-end gap-3">
						<Button
							on:click={() => {
								updateURL();
								window.location.reload();
							}}>yes</Button
						>
						<Popover.Close>
							<Button
								on:click={() => {
									enableAudio.update((u) => !u);
								}}>no</Button
							>
						</Popover.Close>
					</div>
				</div></Popover.Content
			>
		</Popover.Root>
	</div>
	{#if hevcMode}
		<div class="mt-1 rounded-xl bg-black/20 p-3">
			<p class="text-md">
				playback options are disabled because your browser doesn't support HLS. if no video appears,
				it means that your browser doesn't have native support for playing such streams either,
				sorry!
			</p>
		</div>
	{/if}
</div>
