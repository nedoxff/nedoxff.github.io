<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import UnderlinedLink from '../../../../ui/UnderlinedLink.svelte';

	let showBrowserDialog = writable(false);
	let showInitialDialog = writable(false);

	onMount(() => {
		if (window.localStorage.getItem('catavcAlertsShown') == null) {
			const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

			if (!isFirefox) {
				showBrowserDialog.set(true);
				const unsubscriber = showBrowserDialog.subscribe((v) => {
					if (v == false) {
						showInitialDialog.set(true);
						unsubscriber();
					}
				});
			} else showInitialDialog.set(true);

			window.localStorage.setItem('catavcAlertsShown', 'true');
		}
	});
</script>

<div>
	<AlertDialog.Root open={$showBrowserDialog} onOpenChange={(v) => showBrowserDialog.set(v)}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>warning!</AlertDialog.Title>
				<AlertDialog.Description>
					it seems like you're using a chromium-based browser. it probably supports HEVC playback,
					so you can use <UnderlinedLink link="https://meow.camera" text="meow.camera" /> instead of
					catavc, which is more stable and less laggy.<br />if you believe this is a mistake or you
					want to continue anyway, please click OK.<br /><b>this alert won't appear again.</b>
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Action>OK</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
	<AlertDialog.Root open={$showInitialDialog}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>PLEASE READ</AlertDialog.Title>
				<AlertDialog.Description>
					catavc is a hobbyist project and is not guaranteed to run smoothly. the video may lag or
					stutter.<br /><u><b>PLEASE MONITOR YOUR CPU USAGE</b></u>, as all of the video conversion
					happens client-side.<br />
					<u><b>PLEASE USE THIS WITH CAUTION</b></u>, as ffmpeg.wasm has been shown to leak memory.
					<br /><b>this alert won't appear again.</b>
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Action>OK</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>
