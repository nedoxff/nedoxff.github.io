<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import UnderlinedLink from '../../../../ui/UnderlinedLink.svelte';

	const CATAVC_VERSION: string = '1.1';

	let showBrowserDialog = writable(false);
	let showInitialDialog = writable(false);
	let showChangelogDialog = writable(false);

	onMount(() => {
		const shouldShowChangelog = window.localStorage.getItem('catavcVersion') !== CATAVC_VERSION;
		if (shouldShowChangelog) {
			showChangelogDialog.set(true);
			const versionUnsubscriber = showChangelogDialog.subscribe((v) => {
				if (v === false) {
					window.localStorage.setItem('catavcVersion', CATAVC_VERSION);
					versionUnsubscriber();

					if (window.localStorage.getItem('catavcAlertsShown') == null) {
						const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

						if (!isFirefox) {
							showBrowserDialog.set(true);
							const browserUnsubscriber = showBrowserDialog.subscribe((v) => {
								if (v === false) {
									showInitialDialog.set(true);
									browserUnsubscriber();
								}
							});
						} else showInitialDialog.set(true);

						window.localStorage.setItem('catavcAlertsShown', 'true');
					}
				}
			});
		}
	});
</script>

<div>
	<AlertDialog.Root open={$showChangelogDialog} onOpenChange={(v) => showChangelogDialog.set(v)}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>changelog (v{CATAVC_VERSION})</AlertDialog.Title>
				<AlertDialog.Description>
					this is a small hotfix that fixes things in the backend, partially to comply with
					meow.camera API changes, and partially because i forgot to remove some code before
					publishing the initial version of the project.<br />
					- cameras are now pinged every 10 seconds<br />
					- light mode has been removed since it's currently broken<br />
					- changing the camera position should now update the URL<br />
					- <span class="font-mono">catHouseId</span> has been changed to
					<span class="font-mono">id</span>, so the top/random lists should work fine
					<br />
					<b
						>note: cameras may still be heavily buffered. i am still working on a solution, but it's
						hurting my brain a bit so it might be delayed. also, meow.camera has also been working
						on similar solutions to make the website more accessible, so this project may get
						archived soon.</b
					>
					<br />
					<br />
					thank you for using catavc! this is my first project that got any kind of attention, and i'm
					very glad to have entered this cute cat community.<br />
					- nedo
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Action>OK</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
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
