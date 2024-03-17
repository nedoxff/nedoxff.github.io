<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import UnderlinedLink from '../../../../ui/UnderlinedLink.svelte';

	const CATAVC_VERSION: string = '.last';

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
				<AlertDialog.Description class="max-h-[70vh] overflow-y-scroll">
					<UnderlinedLink link="https://meow.camera/viewer" text="meow.camera" /> got updated!!<br
					/>
					they added support for browsers without HEVC support (and even without WASM support, which
					is essential for catavc!), so this project is essentially useless as of now. i'll be archiving
					the code <UnderlinedLink link="https://github.com/nedoxff/catavc" text="on github" />, but
					otherwise this project probably won't be updated nor supported in the future, sorry!<br />
					if, for some reason, you still want to use catavc, you can, but i may remove it from the nedoxff.github.io
					domain in a month or so.<br /><br />
					thank you so much for using catavc! this was an incredibly useful experience and i was more
					than happy to interact with this silly cat community!<br />
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
