<script lang="ts">
	import { showingOverlayedDialog } from '$lib';
	import * as Dialog from '$lib/components/ui/imageDialog';

	export let src: string;
	export let text: string;
	let open: boolean;

	const onOpenChange = (v: boolean) => {
		showingOverlayedDialog.set(v);
		open = v;
	};
</script>

<a href={'#'} on:click={() => onOpenChange(true)}><u class="text-start">{text}</u></a>
<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="h-max w-max">
		<img
			{src}
			class="h-[unset] max-h-full w-[90vw] max-w-full rounded-xl lg:h-[90vh] lg:w-[unset]"
			alt=""
		/>
	</Dialog.Content>
</Dialog.Root>
