<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import UnderlinedLink from '../../../../ui/UnderlinedLink.svelte';

	export let message: string;
</script>

<div class="flex flex-col items-center gap-1">
	<img src="/icons/warning.svg" alt="warning" class="w-10" />
	<h1 class="text-center text-3xl">an error has occurred.</h1>
	<p class="text-md text-center font-mono">({message})</p>
	<p class="text-center text-2xl">
		this may happen if you're in incognito mode, or if a script failed to load properly.<br />
		please try reloading the page.<br />
		<b
			>this should only happen once. if the issue persists, please <UnderlinedLink
				link="https://nedoxff.github.io/contact"
				text="contact me."
			/></b
		>
	</p>
	<Button on:click={() => window.location.reload()}>reload</Button>
</div>
