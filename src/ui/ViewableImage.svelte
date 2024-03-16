<script lang="ts">
	import { showingOverlayedDialog } from '$lib';
	import * as Dialog from '$lib/components/ui/imageDialog';

	export let src: string;

	const onOpenChange = (open: boolean) => showingOverlayedDialog.set(open);
</script>

<div class="">
	<Dialog.Root {onOpenChange}>
		<Dialog.Trigger><img class="rounded-xl" {src} alt="" /></Dialog.Trigger>
		<Dialog.Content class="h-[unset] max-h-[90vh] w-[90vw] max-w-full rounded-xl lg:w-[unset]">
			<img {src} class="max-h-[90vh] rounded-xl" alt="" />
		</Dialog.Content>
	</Dialog.Root>
</div>
